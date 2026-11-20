import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function resolveDatabaseUrl(): string {
  // If user provided a remote database (Postgres, Cockroach, Turso, etc.)
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }

  // Detect serverless hosting environment (Vercel / AWS Lambda)
  const isServerless =
    Boolean(process.env.VERCEL) ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
    (typeof process.cwd === "function" && process.cwd().startsWith("/var/task"));

  if (isServerless) {
    const tmpDbPath = "/tmp/dev.db";

    // On Vercel, /var/task is read-only. We copy the bundled dev.db to /tmp so SQLite is writable.
    if (!fs.existsSync(tmpDbPath)) {
      const candidatePaths = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
        "/var/task/prisma/dev.db",
        "/var/task/dev.db",
        path.resolve("./prisma/dev.db"),
      ];

      for (const candidate of candidatePaths) {
        if (fs.existsSync(candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            console.log(`[Prisma] Initialized SQLite at ${tmpDbPath} from ${candidate}`);
            break;
          } catch (err) {
            console.error(`[Prisma] Failed to copy SQLite file from ${candidate}:`, err);
          }
        }
      }
    }

    const fileUrl = `file:${tmpDbPath}`;
    process.env.DATABASE_URL = fileUrl;
    return fileUrl;
  }

  // Local development or Next.js build time
  const defaultLocalDb = path.join(process.cwd(), "prisma", "dev.db");
  const fileUrl = `file:${defaultLocalDb}`;
  process.env.DATABASE_URL = fileUrl;
  return fileUrl;
}

const resolvedUrl = resolveDatabaseUrl();

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
