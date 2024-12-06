import React, { useEffect, useState } from "react";
import styles from "./ViewerTest.module.scss";
import { main } from "../viewer/main";

const ViewerTest = () => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    // const fetchDataAndStart = async () => {
    //   // FastAPI에서 URL 가져오기
    //   const response = await fetch(
    //     "http://127.0.0.1:8000/get-file-url?file=default"
    //   );
    //   const data = await response.json();

    //   // const params = new URLSearchParams(window.location.search);
    //   // const url = new URL(
    //   //   // "nike.splat", bicycle.splat, garden.splat, plush.splat, stump.splat, treehill.splat, truck.splat
    //   //   // location.href,
    //   //   params.get("url") || "bicycle.splat",
    //   //   "https://huggingface.co/cakewalk/splat-data/resolve/main/"
    //   // );

    //   const url = new URL(
    //     data.url, // FastAPI에서 받아온 URL
    //     "https://huggingface.co/cakewalk/splat-data/resolve/main/" // 기본 베이스 URL
    //   );

    //   const req = await fetch(url, {
    //     mode: "cors", // no-cors, *cors, same-origin
    //     credentials: "omit", // include, *same-origin, omit
    //   });

    //   await main(req);
    // };
    const fetchDataAndStart = async () => {
      // FastAPI에서 파일 가져오기
      const req = await fetch("http://127.0.0.1:8000/get-file");

      if (!req.ok) {
        console.error("Failed to fetch the file.");
        return;
      }

      // main 함수에 Blob 전달
      await main(req);
    };

    fetchDataAndStart();
  }, []);

  return (
    <div className="viewer">
      <div id="info">
        <h3 className="nohf">WebGL 3D Gaussian Splat Viewer</h3>
        <p>
          <small className="nohf">
            By <a href="https://twitter.com/antimatter15">Kevin Kwok</a>. Code
            on
            <a href="https://github.com/antimatter15/splat">Github</a>.
          </small>
        </p>
        <details>
          <summary>Use mouse or arrow keys to navigate.</summary>
          <div id="instructions">
            <p>
              Use arrow keys to navigate, space to jump, and WASD to control
              camera angles. Drag and drop `.ply` files to convert or load
              `cameras.json` files to switch views.
            </p>
          </div>
        </details>
      </div>
      <div id="progress"></div>
      <div id="message"></div>
      <div className="scene" id="spinner">
        <div className="cube-wrapper">
          <div className="cube">
            <div className="cube-faces">
              <div className="cube-face bottom"></div>
              <div className="cube-face top"></div>
              <div className="cube-face left"></div>
              <div className="cube-face right"></div>
              <div className="cube-face back"></div>
              <div className="cube-face front"></div>
            </div>
          </div>
        </div>
      </div>
      <canvas id="canvas"></canvas>
      <div id="quality">
        <span id="fps"></span>
      </div>
      <div id="caminfo">
        <span id="camid"></span>
      </div>

      {/* Cameras 리스트를 렌더링 */}
      {cameras.length > 0 ? (
        <div className="cameras-list">
          <h4>Cameras:</h4>
          <ul>
            {cameras.map((camera, index) => (
              <li key={index}>
                Camera {index}: {JSON.stringify(camera)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading cameras...</p>
      )}
    </div>
  );
};

export default ViewerTest;
