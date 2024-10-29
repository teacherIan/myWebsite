import { Text } from '@react-three/drei';

export default function ContactText() {
  return (
    <Text
      rotation={[Math.PI / 2, Math.PI, -Math.PI / 10]}
      scale={5}
      position={[20, -9.25, -20]}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Contact
    </Text>
  );
}