"use client";
import { useState } from "react";

export default function CoinFlip() {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState(0);

  function handleFlip() {
    setSpinning(true);

    // Animate the coin flip
    let rotationValue = 0;
    const flipInterval = setInterval(() => {
      rotationValue += 10; // Update rotation by 10 degrees each step
      setRotation(rotationValue);
    }, 10);

    setTimeout(() => {
      clearInterval(flipInterval); // Stop the rotation animation after flip

      // Smooth transition to the final state
      const outcome = Math.random() > 0.5 ? "Heads" : "Tails";

      // Transition to final rotation smoothly
      setRotation(() => {
        const finalRotation = outcome === "Heads" ? 0 : 180;
        return finalRotation;
      });

      setSpinning(false);
      console.log(outcome);
    }, 2000); // Flip duration between 2-3 seconds
  }

  return (
    <>
      <div className=" ">
        <div className="flex justify-center items-center h-[60vh] ">
          <div
            className="w-60 h-60 sm:w-80 sm:h-80 border-2 border-white flex items-center justify-center rounded-full bg-[#4d96ff] backface-hidden absolute z-2 cursor-pointer"
            style={{
              transform: `rotatex(${rotation}deg)`,
              transition: spinning
                ? "transform 0.1s"
                : "transform 0.5s ease-out", // Smooth transition when stopping
            }}
            onClick={() => {
              if (!spinning) handleFlip();
            }}
          >
            <h2 className="text-3xl font-bold text-white">HEADS</h2>
          </div>
          <div
            className="w-60 h-60 sm:w-80 sm:h-80 border-2 border-white flex items-center justify-center rounded-full bg-amber-600 absolute cursor-pointer"
            style={{
              transform: `rotatex(${rotation}deg) rotatex(180deg)`,
              transition: spinning
                ? "transform 0.1s"
                : "transform 0.5s ease-out", // Smooth transition when stopping
            }}
            onClick={() => {
              if (!spinning) handleFlip();
            }}
          >
            <h2 className="text-3xl font-bold text-white">TAILS</h2>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className=" border-1 text-2xl font-bold text-white bg-[#4d96ff] px-8 py-4 rounded-xl cursor-pointer w-52"
            onClick={() => {
              if (!spinning) handleFlip();
            }}
          >
            FLIP IT
          </button>
        </div>
      </div>
      <div className="pt-4">
        <aside className=" xl:block bg-blue-500 w-full p-6 rounded-md shadow-md">
          <h2 className="text-white text-center font-extrabold text-xl md:text-2xl">
            Welcome to RandomDecision!
          </h2>
          <p className="text-white mt-4 text-base leading-relaxed text-left">
            The ultimate online coin flipping tool! Whether you're settling a
            friendly debate, making a quick decision, or just having fun, our
            virtual coin toss gives you an instant, unbiased result —{" "}
            <strong>Heads</strong> or <strong>Tails</strong> with a smooth
            flipping animation.
            <br />
            <br />
            Just click the coin and watch it spin! Behind the scenes, a random
            algorithm ensures fairness, giving you a true 50/50 chance every
            time. No coins in your pocket? No problem. Flip anytime, anywhere —
            right from your browser.
          </p>
        </aside>
      </div>
    </>
  );
}
