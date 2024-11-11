import { interactionGroups, RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Player({
  leftButtonState,
  rightButtonState,
  upButtonState,
  downButtonState,
  joystickX,
  joystickY,
}) {
  const bodyRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const location = window.innerWidth < 1000 ? [-20, 100, -120] : [17, 100, -68];

  useFrame((state, delta) => {
    console.log(joystickX);
    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 12000;
    const torqueStrength = 12000;

    if (forward || upButtonState) {
      impulse.z = impulseStrength;
      torque.x = torqueStrength;
    }

    if (rightward || rightButtonState) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (backward || downButtonState) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (leftward || leftButtonState) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (joystickX.current != 0) {
      if (joystickX.current < 0) {
        impulse.x -= impulseStrength * joystickX.current;
        torque.z += torqueStrength * joystickX.current;
      }

      if (joystickX.current > 0) {
        impulse.x += impulseStrength * -joystickX.current;
        torque.z -= torqueStrength * -joystickX.current;
      }
    }

    if (joystickY.current != 0) {
      if (joystickY.current < 0) {
        impulse.z -= impulseStrength * -joystickY.current;
        torque.x -= torqueStrength * -joystickY.current;
      }
      if (joystickY.current > 0) {
        impulse.z = impulseStrength * joystickY.current;
        torque.x = torqueStrength * joystickY.current;
      }
    }

    if (bodyRef.current) {
      bodyRef.current.applyImpulse(impulse);
      bodyRef.current.applyTorqueImpulse(torque);
    }
  });

  return (
    <RigidBody
      collisionGroups={interactionGroups([1], [1])}
      ref={bodyRef}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={location}
      scale={1}
    >
      <mesh>
        <sphereGeometry args={[10]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </RigidBody>
  );
}
