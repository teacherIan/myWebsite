import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import bookShelfObj from './assets/bookShelf.glb';
import { RigidBody, interactionGroups } from '@react-three/rapier';
import * as THREE from 'three';

const material = new THREE.MeshStandardMaterial({
  color: 'lightblue',
  metalness: 0.0,
  roughness: 1,
});

const materialTwo = new THREE.MeshPhysicalMaterial({
  color: 'lightblue',
  metalness: 0.0,
  roughness: 1,
  clearcoat: 1,
  clearcoatRoughness: 0,
});

export default function BookShelf({ loc }) {
  const { nodes, materials } = useGLTF(bookShelfObj);
  return (
    <group dispose={null}>
      <RigidBody
        collisionGroups={interactionGroups([1], [1])}
        colliders="cuboid"
        type="dynamic"
        position={loc}
        rotation={[Math.PI / 2, 0, Math.PI / 3]}
        scale={10}
      >
        <group>
          <mesh geometry={nodes.Cube030.geometry} material={material} />
          <mesh
            geometry={nodes.Cube030_1.geometry}
            material={materials['PurpleDark.001']}
          />
          <mesh
            geometry={nodes.Cube030_2.geometry}
            material={materials['White.032']}
          />
          <mesh
            geometry={nodes.Cube030_3.geometry}
            material={materials['Metal.078']}
          />
          <mesh
            geometry={nodes.Cube030_4.geometry}
            material={materials['BlueDark.001']}
          />
          <mesh
            geometry={nodes.Cube030_5.geometry}
            material={materials['GreenDark.005']}
          />
          <mesh
            geometry={nodes.Cube030_6.geometry}
            material={materials['WoodDark.003']}
          />
          <mesh
            geometry={nodes.Cube030_7.geometry}
            material={materials['Black.029']}
          />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload(bookShelfObj);
