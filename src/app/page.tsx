"use client";
import DataInput from "@/components/dataInput/DataInput";
import SpinnerWheel from "@/components/spinner/SpinnerWheel";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<string[]>(["Dog", "Cat", "Raccoon"]);

  const handleDataUpdate = (newData: string[]) => {
    setData(newData);
  };

  return (
    <>

    <main className="lg:flex md:p-4 p-2 bg-[#F4F4F5] flex-col md:flex-row gap-4">
      {/* Left Section (Optional Sidebar) */}
      <aside className="hidden xl:block bg-blue-400 w-full md:w-full xl:w-1/4 p-4 h-[85vh] rounded-lg">
        <span className="text-white text-center font-bold text-lg ">
          Welcome to RandomDecision !
        </span>
        <p className="text-white pt-2  mx-auto max-w-3xl text-md leading-relaxed text-start ">
          Spin the RandomDecision to make fun, fair decisions! Customize your
          options and let the wheel choose for you — perfect for games, tasks,
          and giveaways.
        </p>
      </aside>

      {/* Spinner Section */}
      <section className="w-full md:w-full p-4 flex justify-center items-center xl:w-1/2">
        <SpinnerWheel data={data} />
      </section>

      {/* Data Input Section */}
      <section className="w-full md:w-full p-4 rounded-md xl:w-1/4">
        <DataInput onDataUpdate={handleDataUpdate} />
      </section>
    </main>
    </>
  );
}
