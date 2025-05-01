"use client";

import { useEffect, useState } from "react";

interface WheelData {
  data: string[];
}

export default function SpinnerWheel({ data }: WheelData) {
  const dataLength = data.length;
  const [wheelData, setWheelData] = useState<string[]>([]);

  useEffect(() => {
    setWheelData(data);
  }, [data]);
  const colors = [
    "#FF6B6B", // coral red — energetic
    "#FFD93D", // golden yellow — cheerful
    "#6BCB77", // mint green — fresh
    "#4D96FF", // vibrant blue — trust
    "#FF9CEE", // soft pink — playful
    "#845EC2", // purple — richness
    "#FFC75F", // warm orange — inviting
  ];

  // Function to generate gradient stops
  function gradientStops() {
    const angleStep = 360 / dataLength; // Calculate the angle step based on the number of items in the data array
    const stops = data
      .map((_, index) => {
        const startAngle = angleStep * index; // Start angle for the current section
        const endAngle = angleStep * (index + 1); // End angle for the current section
        const color = colors[index % colors.length]; // Loop through the colors array
        return `${color} ${startAngle}deg ${endAngle}deg`; // Format as "color startAngle endAngle"
      })
      .join(", "); // Join all stops with commas

    return `conic-gradient(${stops})`; // Return the full conic-gradient string
  }

  const gradient = gradientStops(); // Call the function to get the gradient

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div
          className="w-70 h-70 sm:w-90 sm:h-90 md:w-130 md:h-130 border-2 border-black rounded-full flex justify-center items-center relative"
          style={{
            background: gradient, // Apply the gradient directly to the background style
          }}
        >
          {wheelData.map((item, index) => {
            const angleStep = 360 / dataLength;
            const angle = angleStep * index;
            const radius = 100; // distance from center to text (adjust if needed)
            const radian = (angle - 90) * (Math.PI / 180); // subtract 90deg to align upward
            const x = radius * Math.cos(radian);
            const y = radius * Math.sin(radian);

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(${y}px, ${x}px) rotate(${angle}deg)`,
                  transformOrigin: "center",
                  fontSize: "24px",
                  color: "black",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </div>
            );
          })}

          <div className="absolute w-20 h-20 rounded-full border-1 border-white bg-white "></div>
        </div>
      </div>
    </>
  );
}








/////////////////////////////////////////////////////

//first lets get the data
//make color formate
//data ko lagi circle ma divide garnu paro area
// after that put data in circle with respected color and data name

"use client";

import { canvas } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
interface WheelData {
  data: string[];
}

export default function SpinnerWheel({ data }: WheelData) {
  const dataLength = data.length;
  const [items,setItems] = useState(data);

  const colors = [
    "#FF6B6B", // coral red — energetic
    "#FFD93D", // golden yellow — cheerful
    "#6BCB77", // mint green — fresh
    "#4D96FF", // vibrant blue — trust
    "#FF9CEE", // soft pink — playful
    "#845EC2", // purple — richness
    "#FFC75F", // warm orange — inviting
  ];
  const [currentDeg, setCurrentDeg] = useState(0);
  const [winner, setWinner] = useState<string>("NONE");
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); //getting canvas refrence
  const toRad = (deg: number) => deg * (Math.PI / 180);

  useEffect(() => {
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

    let currentDeg = 0;
    const step = 360 / dataLength;
//here we map colors to the wheel segments
    const wheelColors = colors.slice(0, dataLength);

    const itemDegs: { [key: string]: { startDeg: number; endDeg: number } } = {};

    function draw() {
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // Draw the outer circle
      ctx.lineTo(centerX, centerY);
      ctx.fill();
      let startDeg = currentDeg;
    for (let i = 0; i < dataLength; i++, startDeg += step) {
      const endDeg = startDeg + step;
      const color = wheelColors[i];

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
      ctx.fillStyle = color;
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(toRad((startDeg + endDeg) / 2));
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.font = 'bold 24px serif';
      ctx.fillText(data[i], 130, 10);
      ctx.restore();

      itemDegs[data[i]] = {
        startDeg,
        endDeg,
      };
    }
    }
    draw()
  }, [data]);


  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <canvas
          ref={canvasRef}
          className="w-70 h-70 sm:w-90 sm:h-90 md:w-130 md:h-130 border-2 border-black rounded-full flex justify-center items-center relative"
        ></canvas>

        <div
         
          className="absolute  w-20 h-20 rounded-full border-1 border-white bg-white "
        ></div>

        <div
          id="trangle"
          className="border-y-[20px] border-r-[40px] border-y-transparent border-r-black"
        ></div>
      </div>
    </>
  );
}







/////////////


"use client";


import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
interface WheelData {
  data: string[];
}

export default function SpinnerWheel({ data }: WheelData) {
  const [items, setItems] = useState<string[]>(data);

  const colors = [
    "#FF6B6B", // coral red — energetic
    "#FFD93D", // golden yellow — cheerful
    "#6BCB77", // mint green — fresh
    "#4D96FF", // vibrant blue — trust
    "#FF9CEE", // soft pink — playful
    "#845EC2", // purple — richnes
    "#FFC75F", // warm orange — inviting
  ];
  const [currentDeg, setCurrentDeg] = useState(0);
  const [winner, setWinner] = useState<string>("NONE");
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); //getting canvas refrence

  function toRad(deg: any) {
    return deg * (Math.PI / 180.0);
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext("2d");
    if (!c) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    let currentDeg = 0;
    let step = 360 / items.length;
    let itemsDeg = {};

    let colorIndex = 0;
    let wheelColors: any[] = [];

    for (let i = 0; i < items.length; i++) {
      wheelColors.push(colors[colorIndex]);
      colorIndex = (colorIndex + 1) % colors.length;
    }

    function createWheel() {
      let step = 360 / items.length;
      let colorIndex = 0;
      let wheelColors = [];

      for (let i = 0; i < items.length; i++) {
        wheelColors.push(colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
      }
      draw();
    }
    draw();
    function draw() {
      if (!c) {
        return;
      }
      c.beginPath();
      c.arc(centerX, centerY, radius, toRad(0), toRad(360));
      c.fillStyle = `rgb(${33},${33},${33})`;
      c.lineTo(centerX, centerY);
      c.fill();

      let startDeg = currentDeg;

      for (let i = 0; i < items.length; i++, startDeg += step) {
        let endDeg = startDeg + step;
        console.log(endDeg);

        let color = colors[i];
        console.log(color);

        c.beginPath();
        let rad = toRad(360 / step);
        c.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
        let colorStyle2 = color[i];
        c.fillStyle = colorStyle2;
        c.lineTo(centerX, centerY);
        c.fill();

        c.beginPath();
        rad = toRad(360 / step);
        c.arc(centerX, centerY, radius - 30, toRad(startDeg), toRad(endDeg));
        c.fillStyle = color[i];
        c.lineTo(centerX, centerY);
        c.fill();

        //draw text
        c.save();
        c.translate(centerX, centerY);
        c.rotate(toRad((startDeg + endDeg) / 2));
        c.textAlign = "center";
        c.fillStyle = "#000";

        c.font = "bold 24px serif";
        c.fillText(items[i], 130, 10);
        c.restore();

        itemsDeg[items[i]] = {
          startDeg: startDeg,
          endDeg: endDeg,
        };
        // check winner
        if (
          startDeg % 360 < 360 &&
          startDeg % 360 > 270 &&
          endDeg % 360 > 0 &&
          endDeg % 360 < 90
        ) {
          console.log("Winner");
        }
      }
    }
    draw();
  }, [data]);

  // Function to generate gradient stops

  return (
    <>
      <div className="w-full  flex justify-center items-center">
        <canvas
          ref={canvasRef}
          className="w-70 h-70 sm:w-90 sm:h-90 md:w-130 md:h-130 border-2 bg-white border-black rounded-full"
        ></canvas>

        <div
          id="central-circle"
          className="absolute w-20 h-20 rounded-full border-1 border-white bg-white "
        ></div>

        {/* <div
          id="trangle"
          className="border-y-[20px] border-r-[40px] border-y-transparent border-r-black"
        ></div>
        w-70 h-70 sm:w-90 sm:h-90 md:w-130 md:h-130 border-2 bg-black border-black rounded-full flex justify-center items-center relative
        */}
      </div>
    </>
  );
}



/////spining
"use client";
import { useRef, useEffect, useState } from "react";

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
  return (((input - min) * 100) / (max - min)) / 100;
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

    const wheelColors = Array.from({ length: data.length }, (_, i) => colors[i % colors.length]);
    itemDegs.current = {};

    let startDeg = currentDeg.current;

    for (let i = 0; i < data.length; i++, startDeg += step) {
      const endDeg = startDeg + step;
      const color = wheelColors[i];

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
      ctx.fillStyle = color;
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(toRad((startDeg + endDeg) / 2));
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.font = "bold 24px serif";
      ctx.fillText(data[i], 130, 10);
      ctx.restore();

      itemDegs.current[data[i]] = {
        startDeg,
        endDeg,
      };
    }
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
      const deg = currentDeg.current % 360;
      for (const key in itemDegs.current) {
        const { startDeg, endDeg } = itemDegs.current[key];
        const start = startDeg % 360;
        const end = endDeg % 360;

        if ((start < end && deg >= start && deg <= end) ||
            (start > end && (deg >= start || deg <= end))) {
          setWinner(key);
          break;
        }
      }

      return;
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
    draw();
    setSpinning(true);

    // Pick random item
    const keys = Object.keys(itemDegs.current);
    const randomIndex = randomRange(0, keys.length - 1);
    const targetItem = keys[randomIndex];

    const endDeg = itemDegs.current[targetItem]?.endDeg || 0;
    maxRotation.current = (360 * 5) - endDeg + 10;

    requestAnimationFrame(animate);
  }

  useEffect(() => {
    draw();
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <canvas ref={canvasRef} className="w-[300px] h-[300px] border rounded-full" />
      <button
        onClick={spin}
        disabled={spinning}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      <div className="mt-2 font-bold text-lg text-green-700">
        Winner: {winner}
      </div>
    </div>
  );
}


/// my code
"use client";

import { canvas } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
interface WheelData {
  data: string[];
}

export default function SpinnerWheel({ data }: WheelData) {
  const dataLength = data.length;
  const [items, setItems] = useState<string[]>([]);
  console.log(data);
  const colors = [
    "#FF6B6B", // coral red — energetic
    "#FFD93D", // golden yellow — cheerful
    "#6BCB77", // mint green — fresh
    "#4D96FF", // vibrant blue — trust
    "#FF9CEE", // soft pink — playful
    "#845EC2", // purple — richness
    "#FFC75F", // warm orange — inviting
  ];
  const [currentDeg, setCurrentDeg] = useState(0);
  const [winner, setWinner] = useState<string>("NONE");
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null); //getting canvas refrence
  const toRad = (deg: number) => deg * (Math.PI / 180);

  useEffect(() => {
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

    let currentDeg = 0;
    const step = 360 / dataLength;
    //here we map colors to the wheel segments
    const wheelColors = Array.from(
      { length: dataLength },
      (_, i) => colors[i % colors.length]
    );

    const itemDegs: { [key: string]: { startDeg: number; endDeg: number } } =
      {};

    function draw() {
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // Draw the outer circle
      ctx.lineTo(centerX, centerY);
      ctx.fill();
      let startDeg = currentDeg;
      for (let i = 0; i < dataLength; i++, startDeg += step) {
        const endDeg = startDeg + step;
        const color = wheelColors[i];

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
        ctx.fillStyle = color;
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(toRad((startDeg + endDeg) / 2));
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.font = "bold 24px serif";
        ctx.fillText(data[i], 130, 10);
        ctx.restore();

        itemDegs[data[i]] = {
          startDeg,
          endDeg,
        };
        //check winner
        if (
          startDeg % 360 < 360 &&
          startDeg % 360 > 270 &&
          endDeg % 360 > 0 &&
          endDeg % 360 < 90
        ) {
          console.log("winner", items[i]);
        }
      }
    }
    draw();
  }, [data]);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <canvas
          ref={canvasRef}
          className="w-70 h-70 sm:w-90 sm:h-90 md:w-130 md:h-130 border-2 border-black rounded-full flex justify-center items-center relative"
          onClick={spin}
        ></canvas>

        <div className="absolute  w-20 h-20 rounded-full border-1 border-white bg-white "></div>

        <div
          id="trangle"
          className="border-y-[20px] border-l-[20px]  border-y-transparent text-white absolute right-178 "
        ></div>
      </div>
    </>
  );
}










/////////finalized
"use client";
import { useRef, useEffect, useState } from "react";

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
  return (((input - min) * 100) / (max - min)) / 100;
}

export default function SpinnerWheel({ data }: { data: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentDeg = useRef(0);
  const maxRotation = useRef(0);
  const itemDegs = useRef<{ [key: string]: { startDeg: number; endDeg: number } }>({});
  console.log(itemDegs)
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
  
    const wheelColors = Array.from({ length: data.length }, (_, i) => colors[i % colors.length]);
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

  if ((start < end && pointerDeg >= start && pointerDeg <= end) ||
      (start > end && (pointerDeg >= start || pointerDeg <= end))) {
    setWinner(key);
    console.log(key)
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
  
    <div className="flex flex-col items-center justify-center gap-4 relative" onClick={spin} >
      <canvas ref={canvasRef}  className="w-70 h-70 sm:w-90 sm:h-90 md:w-130 md:h-130 border-2 border-black rounded-full flex justify-center items-center relative cursor-pointer" />
      <div className="absolute  w-20 h-20 rounded-full border-1 border-white bg-white ">
        
      </div>
     
      <div  id="trangle"
          className="border-y-[20px] border-r-[20px]  border-y-transparent text-black absolute right-[0.1px] "></div>
  
    </div>
    
  );
}

