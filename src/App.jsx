import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { IoMdRefresh } from "react-icons/io";

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

  const [showFact, setShowFact] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

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
    position: "fixed",
    top: bgRenderInfo.offsetY + bgRenderInfo.height * EARTH_POSITION.topPercent,
    left:
      bgRenderInfo.offsetX + bgRenderInfo.width * EARTH_POSITION.leftPercent,
    width: bgRenderInfo.width * EARTH_POSITION.widthPercent,
    height: bgRenderInfo.height * EARTH_POSITION.heightPercent,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  };

  const funFacts = [
    "The Earth actually spins... would you look at that.",
    "Earth’s rotation is gradually slowing, by about 17 milliseconds per century.",
    "One day on Earth wasn't always 24 hours long!",
    "The Earth’s core is as hot as the surface of the Sun.",
  ];

  const handleFactClick = () => {
    if (!showFact) {
      setShowFact(true);
    } else {
      setFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length);
    }
  };

  return (
    <div className="relative w-screen min-h-screen overflow-auto">
      {/* Fixed background */}
      <div
        style={{
          backgroundImage: `url(${bgImageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -2,
        }}
      />

      {/* Hidden image used for dimension calculation */}
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

      {/* Earth image fixed in place */}
      <img src="/rotatingEarth.gif" alt="Rotating Earth" style={earthStyle} />

      {/* Header */}
      <Header />

      {/* Fun Fact Section */}
      <section className="relative z-20 min-h-screen flex flex-col justify-end items-center px-4 pb-24 space-y-10">
        <button
          onClick={handleFactClick}
          className="flex items-center font-bold text-2xl px-10 py-2 text-white bg-transparent border border-white rounded hover:scale-105 transition-transform">
          Did you know?
          <div className="pl-1 text-3xl">
            <IoMdRefresh />
          </div>
        </button>

        {showFact && (
          <p className="text-2xl text-white text-center max-w-3xl">
            {funFacts[factIndex]}
          </p>
        )}
      </section>

      {/* Luminara Section */}
      <section className="relative z-20 min-h-screen flex justify-center items-center px-4">
        <div className="bg-zinc-800/70 backdrop-blur-sm opacity-90 p-6 rounded">
          <p className="text-white text-2xl text-center">
            Luminara Celestis represents the shining sun and stars that light up
            our solar system, giving energy and life to the planets, including
            Earth. It's like the bright glow at the center of the cosmic dance,
            guiding everything in space.
          </p>
        </div>
      </section>
    </div>
  );
}
