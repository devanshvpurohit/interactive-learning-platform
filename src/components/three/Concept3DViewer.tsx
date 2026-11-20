"use client";

import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  RotateCcw,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Info,
} from "lucide-react";

interface VisualizationProps {
  title: string;
  conceptType: string;
  description?: string;
  configJson: string;
  labelsJson?: string;
}

// 1. Vector Space Scene
function VectorSpaceScene({ config, selectedLabel, setSelectedLabel }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Axis Grid */}
      <gridHelper args={[10, 10, "#334155", "#1e293b"]} position={[0, -2, 0]} />

      {/* Cluster Nodes */}
      {config.nodes?.map((node: any, idx: number) => {
        const cluster = config.clusters?.[node.cluster] || { color: "#38bdf8" };
        const isSelected = selectedLabel === node.word;

        return (
          <Float key={idx} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh
              position={node.pos}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLabel(node.word);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.35 : 0.22, 16, 16]} />
              <meshStandardMaterial
                color={cluster.color}
                emissive={cluster.color}
                emissiveIntensity={isSelected ? 0.8 : 0.3}
                roughness={0.2}
                metalness={0.8}
              />
              <Html distanceFactor={12}>
                <div
                  className={`pointer-events-none rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold transition-all ${
                    isSelected
                      ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/50 scale-125"
                      : "bg-slate-900/80 text-slate-300 border border-slate-700/60"
                  }`}
                >
                  {node.word}
                </div>
              </Html>
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// 2. HMM Trellis Scene
function HmmTrellisScene({ config, selectedLabel, setSelectedLabel }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const states = config.states || ["NN", "VB", "DT", "IN"];
  const timeSteps = config.timeSteps || 5;
  const optimalPath = config.optimalPath || [2, 0, 1, 3, 0];

  const pathPoints = useMemo(() => {
    return optimalPath.map((stateIdx: number, t: number) => {
      const x = (t - (timeSteps - 1) / 2) * 2;
      const y = (stateIdx - (states.length - 1) / 2) * 1.5;
      return new THREE.Vector3(x, y, 0);
    });
  }, [optimalPath, timeSteps, states.length]);

  return (
    <group ref={groupRef}>
      {/* Trellis nodes */}
      {Array.from({ length: timeSteps }).map((_, t) => {
        const x = (t - (timeSteps - 1) / 2) * 2;
        return (
          <group key={t} position={[x, 0, 0]}>
            {states.map((st: string, sIdx: number) => {
              const y = (sIdx - (states.length - 1) / 2) * 1.5;
              const isOptimal = optimalPath[t] === sIdx;

              return (
                <mesh
                  key={sIdx}
                  position={[0, y, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLabel(`Time t=${t + 1}: State ${st} ${isOptimal ? "(Optimal Viterbi Decoded)" : ""}`);
                  }}
                >
                  <sphereGeometry args={[isOptimal ? 0.28 : 0.16, 16, 16]} />
                  <meshStandardMaterial
                    color={isOptimal ? "#f59e0b" : "#475569"}
                    emissive={isOptimal ? "#f59e0b" : "#1e293b"}
                    emissiveIntensity={isOptimal ? 0.7 : 0.1}
                  />
                  <Html distanceFactor={14}>
                    <div className="pointer-events-none text-[9px] font-mono text-slate-400">
                      {st}
                    </div>
                  </Html>
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* Optimal Path Golden Line */}
      {pathPoints.length > 1 && (
        <Line points={pathPoints} color="#f59e0b" lineWidth={3} dashed={false} />
      )}
    </group>
  );
}

// 3. Defense-in-Depth Scene
function DefenseInDepthScene({ config, exploded, selectedLabel, setSelectedLabel }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const layers = config.layers || [];

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer: any, idx: number) => {
        const yOffset = exploded ? (idx - (layers.length - 1) / 2) * 1.4 : 0;
        const isSelected = selectedLabel === layer.name;

        return (
          <group key={idx} position={[0, yOffset, 0]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLabel(layer.name);
              }}
            >
              <cylinderGeometry args={[layer.radius, layer.radius, layer.thickness * (exploded ? 1.5 : 1), 32, 1, true]} />
              <meshStandardMaterial
                color={layer.color}
                emissive={layer.color}
                emissiveIntensity={isSelected ? 0.8 : 0.3}
                transparent
                opacity={0.7}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Glowing ring borders */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[layer.radius - 0.05, layer.radius + 0.05, 32]} />
              <meshBasicMaterial color={layer.color} side={THREE.DoubleSide} />
            </mesh>

            <Html position={[layer.radius + 0.3, 0, 0]} distanceFactor={12}>
              <div
                className={`pointer-events-none whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-semibold transition-all ${
                  isSelected ? "bg-white text-slate-950 font-bold shadow-lg" : "bg-slate-900/90 text-slate-200"
                }`}
              >
                {layer.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// 4. Attack Surface Scene
function AttackSurfaceScene({ config, selectedLabel, setSelectedLabel }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = config.nodes || [];
  const links = config.links || [];

  const nodeMap = useMemo(() => {
    const map: Record<string, any> = {};
    nodes.forEach((n: any) => {
      map[n.id] = n;
    });
    return map;
  }, [nodes]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Nodes */}
      {nodes.map((node: any) => {
        const isSelected = selectedLabel === node.label;
        return (
          <mesh
            key={node.id}
            position={node.pos}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLabel(node.label);
            }}
          >
            <sphereGeometry args={[node.size || 0.4, 20, 20]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={isSelected ? 0.9 : 0.4}
              metalness={0.7}
              roughness={0.2}
            />
            <Html distanceFactor={14}>
              <div
                className={`pointer-events-none whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-mono transition-all ${
                  isSelected ? "bg-red-500 text-white font-bold" : "bg-slate-900/90 text-slate-300"
                }`}
              >
                {node.label}
              </div>
            </Html>
          </mesh>
        );
      })}

      {/* Network Links */}
      {links.map((link: any, idx: number) => {
        const fromNode = nodeMap[link.from];
        const toNode = nodeMap[link.to];
        if (!fromNode || !toNode) return null;

        const points = [new THREE.Vector3(...fromNode.pos), new THREE.Vector3(...toNode.pos)];

        return (
          <Line
            key={idx}
            points={points}
            color={link.compromised ? "#ef4444" : "#3b82f6"}
            lineWidth={link.compromised ? 2.5 : 1.2}
            dashed={link.compromised}
          />
        );
      })}
    </group>
  );
}

// 5. CIA Triad Scene
function CiaTriadScene({ selectedLabel, setSelectedLabel }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  const vertices = [
    { label: "Confidentiality", pos: [0, 2, 0], color: "#38bdf8" },
    { label: "Integrity", pos: [-1.8, -1.2, 1.2], color: "#34d399" },
    { label: "Availability", pos: [1.8, -1.2, 1.2], color: "#f59e0b" },
    { label: "Non-Repudiation", pos: [0, -1.2, -1.8], color: "#a855f7" },
  ];

  return (
    <group>
      <mesh ref={meshRef}>
        <tetrahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial
          color="#1e293b"
          emissive="#0284c7"
          emissiveIntensity={0.2}
          wireframe={true}
        />
      </mesh>

      {vertices.map((v, idx) => (
        <group key={idx} position={v.pos as [number, number, number]}>
          <Sphere
            args={[0.3, 16, 16]}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLabel(v.label);
            }}
          >
            <meshStandardMaterial color={v.color} emissive={v.color} emissiveIntensity={0.8} />
          </Sphere>
          <Html distanceFactor={10}>
            <div
              className={`pointer-events-none rounded px-2 py-0.5 text-xs font-bold transition-all ${
                selectedLabel === v.label ? "bg-white text-slate-950 scale-125" : "bg-slate-900/90 text-slate-200"
              }`}
            >
              {v.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function Concept3DViewer({
  title,
  conceptType,
  description,
  configJson,
  labelsJson,
}: VisualizationProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = useMemo(() => {
    try {
      return JSON.parse(configJson);
    } catch {
      return {};
    }
  }, [configJson]);

  const labels: string[] = useMemo(() => {
    if (!labelsJson) return [];
    try {
      return JSON.parse(labelsJson);
    } catch {
      return [];
    }
  }, [labelsJson]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? "h-screen w-screen p-6" : "h-[600px] w-full"
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-5 py-3.5 backdrop-blur-md z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 border border-indigo-500/20">
              Interactive 3D Engine
            </span>
            <span className="flex items-center gap-1 text-xs text-sky-400">
              <Sparkles className="h-3 w-3" /> Three.js / R3F
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">{title}</h3>
          {description && (
            <p className="text-xs text-slate-400 max-w-2xl line-clamp-1">{description}</p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {conceptType === "defense_in_depth" && (
            <button
              onClick={() => setExploded(!exploded)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                exploded
                  ? "border-sky-500 bg-sky-500/20 text-sky-300 shadow-md shadow-sky-500/20"
                  : "border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              {exploded ? "Collapse View" : "Exploded Layers"}
            </button>
          )}

          <button
            onClick={() => setSelectedLabel(null)}
            className="rounded-xl border border-slate-700/70 bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Reset Selection"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="rounded-xl border border-slate-700/70 bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: config.camera?.position || [0, 0, 7], fov: config.camera?.fov || 55 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          <Suspense fallback={null}>
            {conceptType === "vector_space" && (
              <VectorSpaceScene
                config={config}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
              />
            )}
            {conceptType === "hmm_trellis" && (
              <HmmTrellisScene
                config={config}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
              />
            )}
            {conceptType === "defense_in_depth" && (
              <DefenseInDepthScene
                config={config}
                exploded={exploded}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
              />
            )}
            {conceptType === "attack_surface" && (
              <AttackSurfaceScene
                config={config}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
              />
            )}
            {conceptType === "cia_triad" && (
              <CiaTriadScene
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
              />
            )}
          </Suspense>

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>

        {/* Selected Label Card */}
        {selectedLabel && (
          <div className="absolute bottom-4 left-4 z-10 max-w-sm rounded-xl border border-sky-500/40 bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
              <Info className="h-4 w-4" /> Selected 3D Component
            </div>
            <h4 className="text-sm font-bold text-white mt-1">{selectedLabel}</h4>
            <p className="text-xs text-slate-300 mt-1">
              Interactive 3D geometry rendered with spatial depth, perspective lighting, and orbit control.
            </p>
          </div>
        )}

        {/* Floating Instruction Overlay */}
        <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-lg bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-400 border border-slate-800 backdrop-blur-sm">
          🖱️ Drag to rotate • Scroll to zoom • Click objects to inspect
        </div>
      </div>
    </div>
  );
}
