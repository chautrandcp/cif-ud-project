import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { OrbitControls as BaseOrbitControls} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useCamera from "../stores/useCamera";
import { gsap } from "gsap";
import { useControls } from "leva";

// Create a new context for OrbitControls, allows me to pass data through the component tree
// and allowing sharing of the state of Orbit Controls with other components
export const OrbitControlsContext = createContext(undefined);
OrbitControlsContext.displayName = "OrbitControlsContext";

export const OrbitControls = ({ children }) => {
  // State to track whether Orbit Controls is enabled or disabled
  const [isEnabled, setIsEnabled] = useState(true);

  // ref to access OrbitControls component
  const ref = useRef();

  // Callback used to ensure that the refrences are not recreated on every render
  const handleEnableCamera = useCallback(() => {
    ref.current.saveState(); // save the current state of the controls
    ref.current.reset(); // reset the controls state
    setIsEnabled(true); // enable the controls
  }, []);

  // callback that is used to disable orbit conbtrols
  const handleDisableCamera = useCallback(() => {
    setIsEnabled(false);
  }, []);

  // Create a context object to be provided to descendant components
  const context = {
    isEnabled, // Whether Orbit Controls is enabled or not
    enableCamera: handleEnableCamera, // function to enable controls
    disableCamera: handleDisableCamera // function to disable controls
  };

  const {xControl, yControl, zControl} = useControls({
    xControl: {value: 0, min: -100, max: 100 },
    yControl: {value: 0, min: -100, max: 100 },
    zControl: {value: 0, min: -200, max: 200 }
})

  useEffect(() => {
    const unsubscribeZoom = useCamera.subscribe(
      (state) => state.zoom,
            (zoom) => {
                if (zoom == "Medium Density"){
                    gsap.to(ref.current.target, {
                        duration: 2,
                        x: 52,
                        y: -48,
                        z: 116,
                        onUpdate: () => {
                          ref.current.update()
                        }
                    })
                }
                if (zoom == "Medium Density - BOV"){
                  gsap.to(ref.current.target, {
                      duration: 2,
                      x: 0,
                      y: -100,
                      z: 0,
                      onUpdate: () => {
                        ref.current.update()
                      }
                  })
              }
              if (zoom == "Map"){
                gsap.to(ref.current.target, {
                    duration: 2,
                    x: -54,
                    y: -12,
                    z: -152,
                    onUpdate: () => {
                      ref.current.update()
                    }
                })
              }
              if (zoom == "Adu"){
                gsap.to(ref.current.target, {
                    duration: 2,
                    x: -12,
                    y: -28,
                    z: -144,
                    onUpdate: () => {
                      ref.current.update()
                    }
                })
            }
            if (zoom == "Adu - BOV"){
              gsap.to(ref.current.target, {
                  duration: 2,
                  x: -12,
                  y: -48,
                  z: -144,
                  onUpdate: () => {
                    ref.current.update()
                  }
              })
            }


            if (zoom == "Combo"){
              gsap.to(ref.current.target, {
                  duration: 2,
                  x: -180,
                  y: -90,
                  z: 0,
                  onUpdate: () => {
                    ref.current.update()
                  }
              })
            }  
                
          }
    )
    return () => {
      unsubscribeZoom()
    }
  }, [])


  return (
    <>
      {/* provide the orbit controls context to its children components */}
      <OrbitControlsContext.Provider value={context}>
        {children}
      </OrbitControlsContext.Provider>
      {/* Adjusting attributes of orbit controls*/}
      <BaseOrbitControls 
      ref={ref} 
      enabled={isEnabled} 
      enableRotate={true} 
      enablePan={true}
      enableZoom={true}
      dampingFactor={0.25}
      rotateSpeed={0.5}
      panSpeed={0.5}
      // maxZoom={40}
      // minZoom={20}
      autoRotate={false}
      makeDefault
      // TODO: Animate Target!
      target={[-54, -12, -152]}
      // target={[xControl, yControl, zControl]}
      />
    </>
  );
};

// Custom hook to access Orbit Controls context
export const useOrbitControls = () => {
  // Get the OrbitControls context
  const context = useContext(OrbitControlsContext);
  // If context is undefined throw an error
  if (!context) {
    throw "OrbitControls context is undefined. Please make sure to call useOrbitControls as a child of <OrbitControls>.";
  }
  return context;
};