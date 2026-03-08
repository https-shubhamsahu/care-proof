"use client";

import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface DotGlobeHeroProps {
  rotationSpeed?: number;
  globeRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

const Globe: React.FC<{
  rotationSpeed: number;
  radius: number;
}> = ({ rotationSpeed, radius }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const sizesRef = useRef<Float32Array | null>(null);
  const baseSizesRef = useRef<Float32Array | null>(null);
  const baseColorsRef = useRef<Float32Array | null>(null);
  const hoveredRef = useRef<number>(-1);
  const glowPhaseRef = useRef(0);
  const { raycaster, pointer, camera } = useThree();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x += rotationSpeed * 0.3;
      groupRef.current.rotation.z += rotationSpeed * 0.1;
    }

    // Animate glow pulse on hovered dot
    if (sizesRef.current && baseSizesRef.current && pointsRef.current) {
      glowPhaseRef.current += delta * 6;
      const sizes = sizesRef.current;
      const baseSizes = baseSizesRef.current;
      let needsUpdate = false;

      for (let i = 0; i < sizes.length; i++) {
        const target = i === hoveredRef.current
          ? baseSizes[i] * (2.5 + Math.sin(glowPhaseRef.current) * 1.0)
          : baseSizes[i];
        if (Math.abs(sizes[i] - target) > 0.0001) {
          sizes[i] += (target - sizes[i]) * 0.15;
          needsUpdate = true;
        }
      }

      // Brighten hovered dot color
      if (baseColorsRef.current && pointsRef.current.geometry.attributes.color) {
        const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
        const base = baseColorsRef.current;
        for (let i = 0; i < colors.length / 3; i++) {
          const idx = i * 3;
          if (i === hoveredRef.current) {
            const glow = 1.0 + Math.sin(glowPhaseRef.current) * 0.3;
            colors[idx] = Math.min(1, base[idx] * glow + 0.3);
            colors[idx + 1] = Math.min(1, base[idx + 1] * glow + 0.3);
            colors[idx + 2] = Math.min(1, base[idx + 2] * glow + 0.3);
            needsUpdate = true;
          } else {
            if (colors[idx] !== base[idx]) {
              colors[idx] += (base[idx] - colors[idx]) * 0.1;
              colors[idx + 1] += (base[idx + 1] - colors[idx + 1]) * 0.1;
              colors[idx + 2] += (base[idx + 2] - colors[idx + 2]) * 0.1;
              needsUpdate = true;
            }
          }
        }
        if (needsUpdate) {
          (pointsRef.current.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
        }
      }

      if (needsUpdate) {
        (pointsRef.current.geometry.attributes.size as THREE.BufferAttribute).needsUpdate = true;
      }
    }
  });

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!pointsRef.current) return;
    const intersects = raycaster.intersectObject(pointsRef.current);
    hoveredRef.current = intersects.length > 0 && intersects[0].index !== undefined
      ? intersects[0].index
      : -1;
  }, [raycaster]);

  const onPointerLeave = useCallback(() => {
    hoveredRef.current = -1;
  }, []);

  const onGeometryUpdate = useCallback((geo: THREE.SphereGeometry) => {
    if (!geo || baseSizesRef.current) return;
    const count = geo.attributes.position.count;
    
    // Colors
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color("#E67E76");
    const careColor = new THREE.Color("#7FB069");
    const accentColor = new THREE.Color("#F5C563");

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let color: THREE.Color;
      if (rand < 0.25) color = careColor;
      else if (rand < 0.35) color = accentColor;
      else color = baseColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    baseColorsRef.current = new Float32Array(colors);
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Sizes
    const sizes = new Float32Array(count);
    const baseSizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const s = 0.015 + Math.random() * 0.005;
      sizes[i] = s;
      baseSizes[i] = s;
    }
    sizesRef.current = sizes;
    baseSizesRef.current = baseSizes;
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  }, []);

  return (
    <group ref={groupRef}>
      <points
        ref={pointsRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <sphereGeometry args={[radius, 48, 48]} ref={onGeometryUpdate as any} />
        <pointsMaterial size={0.015} vertexColors sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  );
};

const DotGlobeHero = React.forwardRef<HTMLDivElement, DotGlobeHeroProps>(
  ({ rotationSpeed = 0.003, globeRadius = 1, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative w-full min-h-[500px] overflow-hidden", className)}
        {...props}
      >
        {/* Content overlay */}
        <div className="relative z-10 flex items-center justify-center min-h-[500px]">
          {children}
        </div>

        {/* 3D Globe */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 3]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <Globe rotationSpeed={rotationSpeed} radius={globeRadius} />
            <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
          </Canvas>
        </div>
      </div>
    );
  }
);

DotGlobeHero.displayName = "DotGlobeHero";

export { DotGlobeHero, type DotGlobeHeroProps };
