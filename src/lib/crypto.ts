import crypto from "crypto";

// 32-byte secret derived from ENCRYPTION_SECRET env or a stable fallback
const SECRET = process.env.ENCRYPTION_SECRET || "antigravity-secure-key-32-chars-long!";
const ALGORITHM = "aes-256-gcm";

function getCipherKey(): Buffer {
  return crypto.createHash("sha256").update(SECRET).digest();
}

export interface EncryptedData {
  encryptedKey: string;
  iv: string;
  authTag: string;
  keyHint: string;
}

export function encryptApiKey(plainKey: string): EncryptedData {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, getCipherKey(), iv);
  let encrypted = cipher.update(plainKey, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  // Hint showing only first 4 and last 4 characters
  const trimmed = plainKey.trim();
  const keyHint =
    trimmed.length > 8
      ? `${trimmed.substring(0, 4)}••••${trimmed.substring(trimmed.length - 4)}`
      : "••••••••";

  return {
    encryptedKey: encrypted,
    iv: iv.toString("hex"),
    authTag,
    keyHint,
  };
}

export function decryptApiKey(encryptedData: {
  encryptedKey: string;
  iv: string;
  authTag: string;
}): string {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getCipherKey(),
    Buffer.from(encryptedData.iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));
  let decrypted = decipher.update(encryptedData.encryptedKey, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
