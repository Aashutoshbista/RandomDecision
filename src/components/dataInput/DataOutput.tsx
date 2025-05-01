import { MdDelete } from "react-icons/md";

interface DataOutputProps {
  items: string[];
  onItemChange: (index: number, value: string) => void;
  onItemDelete: (index: number) => void;
}

export default function DataOutput({
  items,
  onItemChange,
  onItemDelete,
}: DataOutputProps) {
  return (
    <div
      className="border-1 border-gray-400 rounded-xl h-[60vh] overflow-y-auto"
      aria-labelledby="data-output-title"
    >
      <h2 id="data-output-title" className="sr-only">
        List of Entries
      </h2>
      {items.length === 0 ? (
        <p className="px-2 py-1" role="alert">
          No items available
        </p>
      ) : (
        <ul role="list">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex px-2 py-2 items-center"
              role="listitem"
            >
              <label htmlFor={`item-input-${index}`} className="sr-only">
                Edit item
              </label>
              <input
                id={`item-input-${index}`}
                className="outline-none w-full cursor-pointer"
                value={item}
                onChange={(e) => onItemChange(index, e.target.value)}
                aria-label={`Edit item ${index + 1}`}
              />
              <button
                type="button"
                className="text-2xl text-red-500 cursor-pointer ml-2"
                onClick={() => onItemDelete(index)}
                aria-label={`Delete item ${index + 1}`}
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
