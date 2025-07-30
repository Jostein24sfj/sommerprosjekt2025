import React, { useState, useEffect, useRef } from "react";

const bgImageSrc = "/solsystemChatGPT.png";

// These are Earth’s original position and size relative to the **full** background image dimensions
// You can tweak these percentages for perfect alignment.
const EARTH_POSITION = {
  topPercent: 0.38, // 26% from top of full bg image
  leftPercent: 0.443, // 40.5% from left of full bg image
  widthPercent: 0.16, // 10% of bg image width
  heightPercent: 0.26, // 20% of bg image height
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

  // On mount: update viewport size and background render size
  useEffect(() => {
    function updateSize() {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // On viewport size or image natural size change: calculate how bg image fits the viewport (background-size: cover)
  useEffect(() => {
    if (!imgRef.current) return;

    const imgNaturalWidth = imgRef.current.naturalWidth;
    const imgNaturalHeight = imgRef.current.naturalHeight;

    const viewportRatio = viewportSize.width / viewportSize.height;
    const imageRatio = imgNaturalWidth / imgNaturalHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (viewportRatio > imageRatio) {
      // viewport is wider, image height fits viewport height, width crops
      renderHeight = viewportSize.height;
      renderWidth = imageRatio * renderHeight;
      offsetX = (viewportSize.width - renderWidth) / 2;
      offsetY = 0;
    } else {
      // viewport is taller, image width fits viewport width, height crops
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

  // Calculate Earth GIF position on screen based on bgRenderInfo and original percentages
  const earthStyle = {
    position: "absolute",
    top: bgRenderInfo.offsetY + bgRenderInfo.height * EARTH_POSITION.topPercent,
    left:
      bgRenderInfo.offsetX + bgRenderInfo.width * EARTH_POSITION.leftPercent,
    width: bgRenderInfo.width * EARTH_POSITION.widthPercent,
    height: bgRenderInfo.height * EARTH_POSITION.heightPercent,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)", // center on position
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
      {/* Hidden img to get natural size */}
      <img
        src={bgImageSrc}
        alt="bg"
        ref={imgRef}
        style={{ display: "none" }}
        onLoad={() => {
          // Trigger recalc on load
          setViewportSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }}
      />

      {/* Earth GIF positioned dynamically */}
      <img src="/rotatingEarth.gif" alt="Rotating Earth" style={earthStyle} />

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          zIndex: 20,
        }}>
        <p style={{ fontSize: "2.5rem", margin: 0 }}>Luminara Celestis</p>
        <p style={{ fontSize: "1.25rem", fontFamily: "cursive", margin: 0 }}>
          “The light of the heavens”
        </p>
      </div>
    </div>
  );
}
