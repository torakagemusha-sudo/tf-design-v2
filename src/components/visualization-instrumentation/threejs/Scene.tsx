// @ts-nocheck — optional @react-three/* peer; types ship via ambient module stubs.
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import ReactorCore from './ReactorCore';

export default function Scene(props: React.ComponentProps<typeof ReactorCore>) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400, background: '#050608' }}>
      <Canvas camera={{ position: [6, 4, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <ReactorCore {...props} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
