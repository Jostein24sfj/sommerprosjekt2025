import React, { useState, useEffect, useRef } from "react";
import Header from "./assets/Header";

const bgImageSrc = "/solsystemChatGPT.png";

const EARTH_POSITION = {
  topPercent: 0.38,
  leftPercent: 0.443,
  widthPercent: 0.16,
  heightPercent: 0.26,
};

export default function App() {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [bgRenderInfo, setBgRenderInfo] = useState({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const imgRef = useRef(null);

  useEffect(() => {
    function updateSize() {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!imgRef.current) return;

    const imgNaturalWidth = imgRef.current.naturalWidth;
    const imgNaturalHeight = imgRef.current.naturalHeight;

    const viewportRatio = viewportSize.width / viewportSize.height;
    const imageRatio = imgNaturalWidth / imgNaturalHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (viewportRatio > imageRatio) {
      renderHeight = viewportSize.height;
      renderWidth = imageRatio * renderHeight;
      offsetX = (viewportSize.width - renderWidth) / 2;
      offsetY = 0;
    } else {
      renderWidth = viewportSize.width;
      renderHeight = renderWidth / imageRatio;
      offsetX = 0;
      offsetY = (viewportSize.height - renderHeight) / 2;
    }

    setBgRenderInfo({
      width: renderWidth,
      height: renderHeight,
      offsetX,
      offsetY,
    });
  }, [viewportSize]);

  const earthStyle = {
    position: "absolute",
    top: bgRenderInfo.offsetY + bgRenderInfo.height * EARTH_POSITION.topPercent,
    left:
      bgRenderInfo.offsetX + bgRenderInfo.width * EARTH_POSITION.leftPercent,
    width: bgRenderInfo.width * EARTH_POSITION.widthPercent,
    height: bgRenderInfo.height * EARTH_POSITION.heightPercent,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundImage: `url(${bgImageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <img
        src={bgImageSrc}
        alt="bg"
        ref={imgRef}
        style={{ display: "none" }}
        onLoad={() => {
          setViewportSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }}
      />

      <img src="/rotatingEarth.gif" alt="Rotating Earth" style={earthStyle} />

      <div
        className="flex flex-col"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          zIndex: 20,
        }}>
        <Header />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="bg-zinc-800 opacity-90">
          <p className="flex">
            Represents the shining sun and stars that light up our solar system,
            giving energy and life to the planets, including Earth. It's like
            the bright glow at the center of the cosmic dance, guiding
            everything in space.
          </p>
        </div>
      </div>
    </div>
  );
}
