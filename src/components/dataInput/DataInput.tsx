import { useState } from "react";
import { TbArrowsShuffle } from "react-icons/tb";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { MdDelete, MdAdd } from "react-icons/md";
import DataOutput from "./DataOutput";

export default function DataInput({
  onDataUpdate,
}: {
  onDataUpdate: (data: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<string[]>(["Dog", "Cat", "Raccoon"]);

  const update = (next: string[]) => {
    setData(next);
    onDataUpdate(next);
  };

  const handleAddData = () => {
    if (!inputValue.trim()) return;
    update([...data, inputValue.trim()]);
    setInputValue("");
  };

  const handleClear = () => update([]);
  const handleSort = () => update([...data].sort((a, b) => a.localeCompare(b)));
  const handleShuffle = () => {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    update(shuffled);
  };

  const handleItemChange = (index: number, value: string) => {
    const next = [...data];
    next[index] = value;
    update(next);
  };

  const handleItemDelete = (index: number) => {
    const next = data.filter((_, i) => i !== index);
    update(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddData();
    }
  };

  return (
    <main className="border-1 rounded-md border-gray-200 shadow-lg w-full" aria-labelledby="entries-title">
      <header className="p-3">
        <h1 id="entries-title" className="text-xl font-medium text-black">
          Entries
        </h1>
      </header>

      <section className="px-3 pb-3" aria-label="Entry Actions">
        <div className="flex space-x-3 mb-3">
          <button
            type="button"
            className="flex items-center justify-center space-x-1 w-full py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
            onClick={handleShuffle}
            aria-label="Shuffle Entries"
          >
            <TbArrowsShuffle className="text-xl" />
            <span>Shuffle</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center py-2 w-full bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
            onClick={handleSort}
            aria-label="Sort Entries"
          >
            <FaArrowUpShortWide className="text-xl" />
            <span>Sort</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center py-2 w-full bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
            onClick={handleClear}
            aria-label="Clear All Entries"
          >
            <MdDelete className="text-xl" />
            <span>Clear</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddData();
          }}
          className="bg-[#F4F4F5] flex items-center space-x-2 w-full"
          aria-label="Add Entry"
        >
          <label htmlFor="entry-input text-black" className="sr-only">
            Add Entry
          </label>
          <input
            id="entry-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-1 sm:p-2 border-2 border-gray-300 rounded-lg focus:outline-none cursor-pointer"
            placeholder="Enter options"
            aria-label="Entry input field"
          />
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-sm hover:bg-blue-600 transition-colors duration-300"
            aria-label="Add entry"
          >
            <MdAdd className="text-white text-xl sm:text-2xl" />
          </button>
        </form>

        <div className="pt-3">
          <DataOutput
            items={data}
            onItemChange={handleItemChange}
            onItemDelete={handleItemDelete}
          />
        </div>
      </section>
    </main>
  );
}
