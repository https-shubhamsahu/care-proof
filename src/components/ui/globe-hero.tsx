"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import React, { useRef, useEffect, useState } from "react";
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
  const colorsRef = useRef<Float32Array | null>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x += rotationSpeed * 0.3;
      groupRef.current.rotation.z += rotationSpeed * 0.1;
    }
  });

  const onGeometryUpdate = (geo: THREE.SphereGeometry) => {
    if (!geo || colorsRef.current) return;
    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color("#E67E76");   // terracotta
    const careColor = new THREE.Color("#7FB069");    // sage green (caregivers)
    const accentColor = new THREE.Color("#F5C563");  // warm gold

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
    colorsRef.current = colors;
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  };

  return (
    <group ref={groupRef}>
      <points>
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
