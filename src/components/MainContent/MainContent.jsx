// src/components/MainContent/MainContent.jsx
import React from "react";
import "./MainContent.css";
import ThreeDModel from "../Model/3DModel"; // simple import

const MainContent = () => {
  return (
    <main className="main-content">
      <h2>University of Pretoria 3D Model</h2>
      <div className="model-container">
        <ThreeDModel/>
      </div>
    </main>
  );
};

export default MainContent;
