"use client";
import { useRef, useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import Result from "../result/Result";

const colors = [
  "#FF6B6B",
  "#FFD93D",
  "#6BCB77",
  "#4D96FF",
  "#FF9CEE",
  "#845EC2",
  "#FFC75F",
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easeOutSine(x: number) {
  return Math.sin((x * Math.PI) / 2);
}

function getPercent(input: number, min: number, max: number) {
  return ((input - min) * 100) / (max - min) / 100;
}

export default function SpinnerWheel({ data }: { data: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentDeg = useRef(0);
  const maxRotation = useRef(0);
  const itemDegs = useRef<{ [key: string]: { startDeg: number; endDeg: number } }>({});
  const pause = useRef(false);

  const [winner, setWinner] = useState("NONE");
  const [spinning, setSpinning] = useState(false);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    const step = 360 / data.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // 🌀 Apply rotation
    ctx.translate(centerX, centerY);
    ctx.rotate(toRad(currentDeg.current)); // Use your animated degree
    ctx.translate(-centerX, -centerY);

    const wheelColors = Array.from(
      { length: data.length },
      (_, i) => colors[i % colors.length]
    );
    itemDegs.current = {};

    let startDeg = 0;

    for (let i = 0; i < data.length; i++, startDeg += step) {
      const endDeg = startDeg + step;
      const color = wheelColors[i];

      // 🎨 Draw arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
      ctx.fillStyle = color;
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // 🏷️ Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(toRad((startDeg + endDeg) / 2));
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.font = "bold 24px serif";
      ctx.fillText(data[i], radius * 0.7, 10); // Adjusted text position slightly
      ctx.restore();

      itemDegs.current[data[i]] = {
        startDeg,
        endDeg,
      };
    }

    ctx.restore(); // Restore unrotated context
  }

  function animate() {
    if (pause.current) return;

    const percent = getPercent(currentDeg.current, maxRotation.current, 0);
    let speed = easeOutSine(percent) * 20;

    if (speed < 0.01) {
      speed = 0;
      pause.current = true;
      setSpinning(false);

      // Determine winner
      const pointerDeg = (360 - (currentDeg.current % 360)) % 360;

      for (const key in itemDegs.current) {
        const { startDeg, endDeg } = itemDegs.current[key];
        const start = startDeg % 360;
        const end = endDeg % 360;

        if (
          (start < end && pointerDeg >= start && pointerDeg <= end) ||
          (start > end && (pointerDeg >= start || pointerDeg <= end))
        ) {
          setWinner(key);
          break;
        }
      }
    }

    currentDeg.current += speed;
    draw();
    requestAnimationFrame(animate);
  }

  function spin() {
    if (spinning) return;

    setWinner("NONE");
    currentDeg.current = 0;
    pause.current = false;
    draw(); // Makes sure itemDegs is filled
    setSpinning(true);

    const keys = Object.keys(itemDegs.current);
    if (keys.length === 0) {
      console.warn("No items to spin");
      setSpinning(false);
      return;
    }

    const randomIndex = randomRange(0, keys.length - 1);
    const targetItem = keys[randomIndex];

    const { startDeg, endDeg } = itemDegs.current[targetItem];
    const midDeg = (startDeg + endDeg) / 2;

    // Add optional small offset to avoid landing exactly in middle
    const offset = randomRange(-5, 5);
    maxRotation.current = 360 * 5 + (360 - midDeg + offset);

    requestAnimationFrame(animate);
  }

  useEffect(() => {
    draw();
  }, [data]);

  return (
    <>
      <section aria-live="polite" aria-labelledby="spinner-wheel">
        <div
          className="flex flex-col items-center justify-center gap-4 relative"
          aria-labelledby="spin-wheel"
        >
          <canvas
            onClick={spin}
            ref={canvasRef}
            role="spinbutton"
            aria-label="Spin the wheel"
            className="w-70 h-70 sm:w-90 sm:h-90 md:w-130 md:h-130 border-2 rounded-full flex justify-center items-center relative cursor-pointer"
          />
          <div
            onClick={spin}
            aria-label="Start spinning the wheel"
            className="absolute w-20 h-20 rounded-full border-1 border-white bg-white flex justify-center items-center cursor-pointer"
          >
            <LuRefreshCw className="text-4xl" />
          </div>

          <div
            id="trangle"
            className="border-y-[20px] border-r-[20px] border-y-transparent text-black absolute right-[0.1px]"
          ></div>
        </div>

        {winner !== "NONE" && (
          <div aria-live="assertive">
            <Result result={winner} />
          </div>
        )}
      </section>
    </>
  );
}
