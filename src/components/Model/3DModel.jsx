import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ThreeDModel = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      10000
    );
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
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

      // Center the model
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf.scene.position.sub(center);

      // Scale model to fit nicely in the block
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 100 / maxDim; // Adjust this to change how much space model fills
      gltf.scene.scale.setScalar(scale);

      // Adjust camera to fit model
      const distance = maxDim * scale * 1.2; // 1.2 adds a little padding
      camera.position.set(distance, distance, distance);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      controls.target.set(0, 0, 0);
      controls.update();
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  // Rotate model on button press
  const rotateModel = (direction) => {
    if (!modelRef.current) return;
    const step = 0.1; // radians

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
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
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
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0, 255, 0, 0.2)",
        }}
      >
        <button onClick={() => rotateModel("up")} style={{ position: "absolute", top: "5px" }}>↑</button>
        <button onClick={() => rotateModel("down")} style={{ position: "absolute", bottom: "5px" }}>↓</button>
        <button onClick={() => rotateModel("left")} style={{ position: "absolute", left: "5px" }}>←</button>
        <button onClick={() => rotateModel("right")} style={{ position: "absolute", right: "5px" }}>→</button>
      </div>
    </div>
  );
};

export default ThreeDModel;



// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// const ThreeDModel = () => {
//   const mountRef = useRef(null);
//   // const modelRef = useRef(null); // store the loaded model


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

//     camera.position.set(0, 50, 100);

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
//     currentMount.appendChild(renderer.domElement);

//     // Lights
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(50, 50, 50);
//     scene.add(directionalLight);

//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;        // smooth rotation
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
//         modelRef.current = gltf.scene; //store reference

//         // Center and scale model
//         const box = new THREE.Box3().setFromObject(gltf.scene);
//         const center = box.getCenter(new THREE.Vector3());
//         gltf.scene.position.sub(center);

//         const size = box.getSize(new THREE.Vector3()).length();
//         const scale = 100 / size; // scale model to fit view ADJUST SCALE
//         gltf.scene.scale.setScalar(scale);


//         // see whole model ----NEW
//         const maxDim = Math.max(size.x, size.y, size.z);
//         const fov = camera.fov * (Math.PI / 180);
//         const distance = maxDim / (2 * Math.tan(fov / 2));

//         // Adjust camera
//         camera.position.set(center.x + 100, center.y + 100, center.z + 100);
//         camera.lookAt(center);
//         controls.target.copy(center);
//         controls.update();

//         // Move camera to see entire model--- NEW
//         camera.position.set(distance, distance, distance);
//         camera.lookAt(new THREE.Vector3(0, 0, 0));

//       }
//     );

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Update controls to rotate around center ----NEW
//     controls.target.set(0, 0, 0);
//     controls.update();

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

//   const rotateModel = (direction) => {
//   if (!modelRef.current) return;
//   const step = 0.1; // radians

//   switch (direction) {
//     case "left":
//       modelRef.current.rotation.y += step;
//       break;
//     case "right":
//       modelRef.current.rotation.y -= step;
//       break;
//     case "up":
//       modelRef.current.rotation.x += step;
//       break;
//     case "down":
//       modelRef.current.rotation.x -= step;
//       break;
//   }
// };

//   //NEW
//   return (
//   <div style={{ width: "100%", height: "100%", position: "relative" }}>
//     <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    
//     {/* Arrow buttons overlay */}
//     <div
//     style={{
//       position: "absolute",
//       top: "20px",
//       right: "20px",
//       width: "100px",
//       height: "100px",
//       borderRadius: "50%",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "rgba(0, 255, 0, 0.2)", // light green semi-transparent background
//   }}
// >
//     <button onClick={() => rotateModel("up")} style={{ position: "absolute", top: "5px" }}>↑</button>
//     <button onClick={() => rotateModel("down")} style={{ position: "absolute", bottom: "5px" }}>↓</button>
//     <button onClick={() => rotateModel("left")} style={{ position: "absolute", left: "5px" }}>←</button>
//     <button onClick={() => rotateModel("right")} style={{ position: "absolute", right: "5px" }}>→</button>
// </div>

    
//   </div>
// );

  
// };

// export default ThreeDModel;
