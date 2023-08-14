import React, { useRef, useState, useEffect } from "react";
import { Html, useGLTF } from "@react-three/drei";
import HousingInterface from "../HouseInterface";
import useApp from "../stores/useApp";
import useCamera from "../stores/useCamera";
import { Select } from "@react-three/postprocessing";
import useInterface from "../stores/useInterface";
import { animated, useSpring } from "@react-spring/three";
import useGUI from "../stores/useGUI";
import useFlow from "../stores/useFlow";
import { useGesture } from "react-use-gesture";
import AtticTag from "./Tags/AtticTag";
import BasementTag from "./Tags/BasementTag";
import useActions from "../stores/useActions";
import Shed from "./Shed";
import ClickMeButton from "./Tags/ClickMeButton";




// House component that represents a 3D model with interactive elements
export default function House(props) {
  // Importing the model with the useGLTF library
  const { nodes, materials } = useGLTF("/housev5.glb");
  // State to track whether the mainInterface is visible, initially set to false
  const [interfaceVisible, setInterfaceVisible] = useState(false);
  const [ idVisible, setIdVisible] = useState(false)
  const hideNumber = useApp((state) => state.hideNumber)
  const hideAdu = useApp((state) => state.hideAdu)
  const resetClick = useInterface((state) => state.resetClick)
  const zoomIn = useCamera((state) => state.zoomClose)
  const resetCamera = useCamera((state) => state.resetCamera)
  const toggleInterface = useInterface((state) => state.toggleVisible)
  //outline effect 
  const atticRef = useRef()
  const [atticHovered, atticHover] = useState(null)
  const [hoverEffect, setHoverEffect] = useState(true)
  //useActions
  const unselectAllAdu = useActions((state) => state.unselectAll)
  


  

  // Default configurations when animating the house such as color and opacity
  const [spring, api] = useSpring(() => ({
    atticColor: 'white',
    houseColor:'white',
    basementColor: 'white',
    trail: 950,
    atticOpacity: 1,
    houseOpacity: 1,
    basementOpacity: 1,
    config: {mass: 1, tension: 210, friction: 20, precision: 0.0001},
  }))

  // Gesture handling for when the house is hovered over, animate color when hovered over.
  // Only animate when hoverEffect is set to true meaning only animate when the the main Interface is not visible
  const bind = useGesture({
    onHover({ hovering }) {
      if (hoverEffect) {
        api.start({atticColor: hovering ? '#ae561f' : '#d96b27'})
        api.start({houseColor: hovering ? '#ae561f' : '#d96b27'})
        api.start({basementColor: hovering ? '#ae561f' : '#d96b27'})
      }
    }
  })
  
  

  // Handle clicking on the house,
  const handleHouseClick = () => {
    console.log("clicked")
    setInterfaceVisible(!interfaceVisible) // Toggle the visibility
    // TODO: if interface is not visible hide adu ID
  };

  // useEffect for managing subscriptions and cleanup
  useEffect(() =>
    {
        // When Interface is turned off reset house opacity and enable house to be hoverable 
        const unsubscribeHighlight = useInterface.subscribe(
          (state) => [state.selection, state.visible],
          ([selection , visible]) => {
            setHoverEffect(!visible)
            if (!visible){
              api.start({houseOpacity: 1, basementOpacity: 1, atticOpacity: 1})
              api.start({houseColor: '#d96b27', basementColor: '#d96b27', atticColor: '#d96b27'})
            }
            // this is an old feature, TODO: delete and test
            if (selection === 1){
              atticHover(true)
            } else {
              atticHover(false)
            }
            
          }
        )
        // Animate house color when Intro pop up modal is closed
        const unsubscribeColor = useGUI.subscribe(
          (state) => state.guiIntroPhase,
          (guiIntroPhase) => {
            if (guiIntroPhase === 'off'){
              api.start({atticColor: '#d96b27', houseColor: '#d96b27', basementColor: '#d96b27' })
              atticHover(true)
            }
          }
        )

        // TODO: Delete 
        const unsubscribeDefaultColor = useFlow.subscribe(
          (state) => state.phase,
          (phase) => {
            if (phase === 'interaction4'){
              api.start({color: 'white'})
              atticHover(false)
              
            }
          }
        )
        // Subscribing to changes in the useActions Store
        const unsubscribeOpacity = useActions.subscribe(
          (state) => [state.basement, state.attic, state.detatched, state.attatched],
          ([basement, attic, detatched, attatched]) => {
            // If basement is set to true, lower the opacity of all other elements of the house except the basement
            if (basement == true) {
              api.start({atticOpacity: .2, houseOpacity: .2, basementOpacity: 1})
              api.start({houseColor: 'white', atticColor: 'white', basementColor: '#d96b27'})
            }
            // If Attic is set to true, lower the opacity of all other elements of the house except the attic
            if (attic == true) {
              api.start({houseOpacity: .2, basementOpacity: .2, atticOpacity: 1})
              api.start({houseColor: 'white', basementColor: 'white', atticColor: '#d96b27'})
            }
            // Lower all elements of the house
            if (detatched == true) {
              api.start({houseOpacity: .2, basementOpacity: .2, atticOpacity: .2})
              api.start({houseColor: 'white', basementColor: 'white', atticColor: 'white'})
            }
            // Lower all elements of the house
            if (attatched == true) {
              api.start({houseOpacity: .2, basementOpacity: .2, atticOpacity: .2})
              api.start({houseColor: 'white', basementColor: 'white', atticColor: 'white'})
            }
            // If nothing is selected increase the opacity of all the elements
            else if (!basement && !attic && !detatched && !attatched) {
              api.start({houseOpacity: 1, basementOpacity: 1, atticOpacity: 1})
              api.start({houseColor: '#d96b27', basementColor: '#d96b27', atticColor: '#d96b27'})
            }
          }
        )
        
        // cleaning subscriptions
        return () => {
            unsubscribeOpacity()
            unsubscribeHighlight()
            unsubscribeColor()
            unsubscribeDefaultColor()
        }
   }, [])

  // Component for the imported model. Generated using https://gltf.pmnd.rs/ each object in the 3D scene gets its own component
  return (
  <group {...props} dispose={null} position={[12, -0.3, 3.5]} scale={0.4} >
    <Select enabled={atticHovered}>
      <animated.mesh
        // Spread the properties from the Spring object and bind function to the component
        {...spring}
        {...bind()}
        castShadow
        receiveShadow
        // When house is clicked changes various states and changes states in some of the stores
        onClick={(event) => {event.stopPropagation(), handleHouseClick(), hideNumber(), hideAdu(), resetClick(), zoomIn(), toggleInterface()}}
        geometry={nodes.main.geometry}
        material={materials.mainMat}
        material-color={spring.houseColor}
        material-transparent={true}
        material-opacity={spring.houseOpacity}
        position={[0.042, -23.125, 0]}
        scale={0.305}
        
      />
      <animated.mesh
        {...spring}
        {...bind()}
        castShadow
        receiveShadow
        // When Attic is clicked changes various states and changes states in some of the stores
        onClick={(event) => {event.stopPropagation(), handleHouseClick(), hideNumber(), hideAdu(), resetClick(), zoomIn(), toggleInterface(), unselectAllAdu()}}
        geometry={nodes.attic.geometry}
        material={materials.atticMat}
        material-color={spring.atticColor}
        material-transparent={true}
        material-opacity={spring.atticOpacity}
        position={[0.042, -23.125, 0]}
        scale={0.305}
        opacity={0.5}
        transparent={true}
        
      >
        {/* attatch Attic html tag to attic geometry*/}
        <AtticTag></AtticTag>
         {/* {!interfaceVisible && <ClickMeButton />} */}
      </animated.mesh>
      <animated.mesh
        {...spring}
        {...bind()}
        castShadow
        receiveShadow
        // When basement is clicked changes various states and changes states in some of the stores
        onClick={(event) => {event.stopPropagation(), handleHouseClick(), hideNumber(), hideAdu(), resetClick(), zoomIn(), toggleInterface()}}
        geometry={nodes.basement.geometry}
        material={materials.basementMat}
        material-color={spring.basementColor}
        material-transparent={true}
        material-opacity={spring.basementOpacity}
        position={[0.042, -23.125, 0]}
        scale={0.305}
  
      >
        {/* Attatch Basement html tags to basement geometry */}
        <BasementTag></BasementTag>
      </animated.mesh>

    </Select>
</group>
);

}

useGLTF.preload("/housev5.glb");
