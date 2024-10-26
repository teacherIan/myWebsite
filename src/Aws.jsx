import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function Aws() {
  const aws = useGLTF('./aws.glb');
  return (
    <RigidBody
      restitution={10}
      rotation={[Math.PI / 2, 0, Math.PI * 1.2]}
      type="fixed"
      scale={16}
      position={[-37, -5.2, -35]}
      colliders="cuboid"
    >
      <primitive object={aws.scene} scale={0.25} />
    </RigidBody>
  );
}
