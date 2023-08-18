/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Zacxophone (https://sketchfab.com/Zacxophone)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/birds-3a9bb97be78944f9bffc23fb25c2154e
Title: Birds
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Imported Bird model
export default function Birds(props) {
  const group = useRef();
  const ref = useRef()
  const { nodes, materials, animations } = useGLTF("/birds.glb");
  const { actions, names } = useAnimations(animations, group);

  // Plays the animation imported from the gltf file
  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play()
  })



  // Animate birds x positions, resets position after a threshold
  useFrame((state, delta) =>{
    ref.current.position.x += delta*3
    if (ref.current.position.x >= 45) {
        ref.current.position.x = -70
    }
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group ref={ref} name="Sketchfab_model" rotation={[-Math.PI / 2, 0 , -Math.PI / 2]} scale={0.05} position={[-70 , 15,  -20]}>
          <group
            name="caa1de82125e43cab16cdc38a1378805fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Plane"
                  position={[0, -12, -9.1]}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={10}
                />
                <group
                  name="Armature"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={10}
                >
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <skinnedMesh
                      name="Object_10"
                      geometry={nodes.Object_10.geometry}
                      material={materials["Material.001"]}
                      skeleton={nodes.Object_10.skeleton}
                    />
                    <group
                      name="Object_8"
                      position={[0, -12, -9.1]}
                      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      scale={10}
                    />
                  </group>
                </group>
                <group
                  name="Plane001"
                  position={[28, -10.4, 20.4]}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={9.6}
                />
                <group
                  name="Armature001"
                  position={[27.9, 1, 29]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={9.6}
                >
                  <group name="Object_22">
                    <primitive object={nodes._rootJoint_1} />
                    <skinnedMesh
                      name="Object_25"
                      geometry={nodes.Object_25.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_25.skeleton}
                    />
                    <skinnedMesh
                      name="Object_26"
                      geometry={nodes.Object_26.geometry}
                      material={materials["Material.001"]}
                      skeleton={nodes.Object_26.skeleton}
                    />
                    <group
                      name="Object_24"
                      position={[28, -10.4, 20.4]}
                      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      scale={9.6}
                    />
                  </group>
                </group>
                <group
                  name="Plane002"
                  position={[-32.6, -13, 34.4]}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={10}
                />
                <group
                  name="Armature002"
                  position={[-32.6, -1, 43.4]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={10}
                >
                  <group name="Object_38">
                    <primitive object={nodes._rootJoint_2} />
                    <skinnedMesh
                      name="Object_41"
                      geometry={nodes.Object_41.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_41.skeleton}
                    />
                    <skinnedMesh
                      name="Object_42"
                      geometry={nodes.Object_42.geometry}
                      material={materials["Material.001"]}
                      skeleton={nodes.Object_42.skeleton}
                    />
                    <group
                      name="Object_40"
                      position={[-32.6, -13, 34.4]}
                      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      scale={10}
                    />
                  </group>
                </group>
                <group
                  name="Plane003"
                  position={[37.9, -14.2, 65.9]}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={10}
                />
                <group
                  name="Armature003"
                  position={[37.9, -2.2, 74.9]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={10}
                >
                  <group name="Object_54">
                    <primitive object={nodes._rootJoint_3} />
                    <skinnedMesh
                      name="Object_57"
                      geometry={nodes.Object_57.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_57.skeleton}
                    />
                    <skinnedMesh
                      name="Object_58"
                      geometry={nodes.Object_58.geometry}
                      material={materials["Material.001"]}
                      skeleton={nodes.Object_58.skeleton}
                    />
                    <group
                      name="Object_56"
                      position={[37.9, -14.2, 65.9]}
                      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      scale={10}
                    />
                  </group>
                </group>
                <group
                  name="Plane004"
                  position={[-39, -7.8, 87.4]}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={8.3}
                />
                <group
                  name="Armature004"
                  position={[-39, 2.2, 94.9]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={8.3}
                >
                  <group name="Object_70">
                    <primitive object={nodes._rootJoint_4} />
                    <skinnedMesh
                      name="Object_73"
                      geometry={nodes.Object_73.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_73.skeleton}
                    />
                    <skinnedMesh
                      name="Object_74"
                      geometry={nodes.Object_74.geometry}
                      material={materials["Material.001"]}
                      skeleton={nodes.Object_74.skeleton}
                    />
                    <group
                      name="Object_72"
                      position={[-39, -7.8, 87.4]}
                      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                      scale={8.3}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/birds.glb");



