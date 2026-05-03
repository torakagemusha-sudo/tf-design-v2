// @ts-nocheck — optional @react-three/* peer; types ship via ambient module stubs.
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';

function FuelRod({ position, temp, active }: { position: [number, number, number]; temp: number; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => {
    const t = Math.min(Math.max((temp - 300) / 500, 0), 1);
    return new THREE.Color().setHSL(0.6 - t * 0.6, 0.8, 0.4 + t * 0.3);
  }, [temp]);

  useFrame((_, delta) => {
    if (meshRef.current && active) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function ControlRod({ position, insertion }: { position: [number, number, number]; insertion: number }) {
  const height = 2 * (1 - insertion);
  const yOffset = -1 + height / 2;
  return (
    <mesh position={[position[0], yOffset, position[2]]}>
      <boxGeometry args={[0.2, height, 0.2]} />
      <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

function Vessel() {
  return (
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[3.5, 3.5, 2.2, 64, 1, true]} />
      <meshStandardMaterial color="#1a2332" metalness={0.6} roughness={0.4} side={THREE.DoubleSide} transparent opacity={0.3} />
    </mesh>
  );
}

export default function ReactorCore({
  fuelTemps = Array.from({ length: 64 }, () => 300 + Math.random() * 400),
  controlRodInsertion = 0.5,
  active = true,
}: {
  fuelTemps?: number[];
  controlRodInsertion?: number;
  active?: boolean;
}) {
  const rods = useMemo(() => {
    const positions: [number, number, number][] = [];
    const spacing = 0.5;
    const cols = 8;
    for (let i = 0; i < 64; i++) {
      const x = (i % cols - cols / 2 + 0.5) * spacing;
      const z = (Math.floor(i / cols) - cols / 2 + 0.5) * spacing;
      positions.push([x, 0, z]);
    }
    return positions;
  }, []);

  const controlRods = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        positions.push([(i - 1.5) * 1.0, 0, (j - 1.5) * 1.0]);
      }
    }
    return positions;
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffaa44" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4488ff" />
      <Vessel />
      {rods.map((pos, i) => (
        <FuelRod key={i} position={pos} temp={fuelTemps[i] ?? 300} active={active} />
      ))}
      {controlRods.map((pos, i) => (
        <ControlRod key={`ctrl-${i}`} position={pos} insertion={controlRodInsertion} />
      ))}
      <Grid
        position={[0, -1.5, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1e2d3d"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#2a3f55"
        fadeDistance={15}
        fadeStrength={1}
        infiniteGrid
      />
      <Text position={[0, 2.5, 0]} fontSize={0.4} color="#e8ebed" anchorX="center">
        Reactor Core Assembly
      </Text>
      <OrbitControls enablePan enableZoom enableRotate autoRotate={active} autoRotateSpeed={0.5} />
    </>
  );
}
