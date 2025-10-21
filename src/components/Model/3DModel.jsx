// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// const ThreeDModel = () => {
//   const mountRef = useRef(null);
//   const modelRef = useRef(null); // Added back so buttons can target it

//   useEffect(() => {
//     const currentMount = mountRef.current;
//     if (!currentMount) return;

//     // Scene
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x87ceeb); // sky blue

//     // Camera
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       currentMount.clientWidth / currentMount.clientHeight,
//       0.1,
//       10000
//     );

//     //  Start camera slightly closer to model
//     camera.position.set(0, 80, 200);

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
//     currentMount.appendChild(renderer.domElement);

//     // Lights
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
//     directionalLight.position.set(50, 100, 100);
//     scene.add(directionalLight);

//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.1;
//     controls.rotateSpeed = 1.0;
//     controls.zoomSpeed = 1.2;
//     controls.panSpeed = 0.5;
//     controls.minDistance = 20;
//     controls.maxDistance = 500;

//     // Load GLTF model
//     const loader = new GLTFLoader();
//     loader.load(
//       "/Model/Model2.gltf", // <-- replace with your actual file path
//       (gltf) => {
//         scene.add(gltf.scene);
//         modelRef.current = gltf.scene; // store reference for rotation

//         // Center and scale model
//         const box = new THREE.Box3().setFromObject(gltf.scene);
//         const center = box.getCenter(new THREE.Vector3());
//         gltf.scene.position.sub(center);

//         const size = box.getSize(new THREE.Vector3()).length();
//         const scale = 700 / size;
//         gltf.scene.scale.setScalar(scale);

//         // Fit camera a bit further out so model fits block nicely
//         const distance = size * 0.9; 
//         camera.position.set(center.x + distance, center.y + distance, center.z + distance);
//         camera.lookAt(center);
//         controls.target.copy(center);
//         controls.update();
//       }
//     );

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       currentMount.removeChild(renderer.domElement);
//     };
//   }, []);

//   // Button functionality (rotation)
//   const rotateModel = (direction) => {
//     if (!modelRef.current) return;
//     const step = 0.1; // radians per click

//     switch (direction) {
//       case "left":
//         modelRef.current.rotation.y += step;
//         break;
//       case "right":
//         modelRef.current.rotation.y -= step;
//         break;
//       case "up":
//         modelRef.current.rotation.x += step;
//         break;
//       case "down":
//         modelRef.current.rotation.x -= step;
//         break;
//       default:
//         break;
//     }
//   };

//   // Same UI as before
//   return (
//     <div style={{ width: "100%", height: "100%", position: "relative" }}>
//       <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

//       {/* Arrow buttons overlay */}
//       <div
//         style={{
//           position: "absolute",
//           top: "20px",
//           right: "20px",
//           width: "100px",
//           height: "100px",
//           borderRadius: "50%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           background: "rgba(0, 255, 0, 0.2)",
//         }}
//       >
//         <button onClick={() => rotateModel("up")} style={{ position: "absolute", top: "5px" }}>↑</button>
//         <button onClick={() => rotateModel("down")} style={{ position: "absolute", bottom: "5px" }}>↓</button>
//         <button onClick={() => rotateModel("left")} style={{ position: "absolute", left: "5px" }}>←</button>
//         <button onClick={() => rotateModel("right")} style={{ position: "absolute", right: "5px" }}>→</button>
//       </div>
//     </div>
//   );
// };

// export default ThreeDModel;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ThreeDModel = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null); // store model for rotation

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // sky blue

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      10000
    );
    camera.position.set(0, 80, 200); // slightly closer to model

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(50, 100, 100);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.5;
    controls.minDistance = 20;
    controls.maxDistance = 500;

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load("/Model/Model2.gltf", (gltf) => {
      scene.add(gltf.scene);
      modelRef.current = gltf.scene;

      // Center and scale model
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf.scene.position.sub(center);

      const size = box.getSize(new THREE.Vector3()).length();
      const scale = 700 / size;
      gltf.scene.scale.setScalar(scale);

      // Fit camera
      const distance = size * 0.9;
      camera.position.set(center.x + distance, center.y + distance, center.z + distance);
      camera.lookAt(center);
      controls.target.copy(center);
      controls.update();
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  // Rotate model function
  const rotateModel = (direction) => {
    if (!modelRef.current) return;
    const step = 0.1;

    switch (direction) {
      case "left":
        modelRef.current.rotation.y += step;
        break;
      case "right":
        modelRef.current.rotation.y -= step;
        break;
      case "up":
        modelRef.current.rotation.x += step;
        break;
      case "down":
        modelRef.current.rotation.x -= step;
        break;
      default:
        break;
    }
  };

  // Shared button style
  const arrowStyles = {
    position: "absolute",
    background: "rgba(255, 255, 255, 0.9)",
    border: "1px solid #888",
    borderRadius: "8px",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    padding: "0",
    fontSize: "25px",
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Arrow buttons overlay */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "120px",
          height: "120px",
          borderRadius: "12px",
          background: "rgba(50, 50, 50, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        {/* Up */}
        <button onClick={() => rotateModel("up")} style={{ ...arrowStyles, top: "5px" }} title="Rotate Up">
          ↑
        </button>

        {/* Down */}
        <button onClick={() => rotateModel("down")} style={{ ...arrowStyles, bottom: "5px" }} title="Rotate Down">
          ↓
        </button>

        {/* Left (curved rotate arrow) */}
        <button onClick={() => rotateModel("left")} style={{ ...arrowStyles, left: "5px" }} title="Rotate Left">
          ↺
          
        </button>

        {/* Right (curved rotate arrow) */}
        <button onClick={() => rotateModel("right")} style={{ ...arrowStyles, right: "5px" }} title="Rotate Right">
          ↻
          
        </button>
      </div>
    </div>
  );
};

export default ThreeDModel;

