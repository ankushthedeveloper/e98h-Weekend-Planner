import { VIBES, type Vibe } from "../Types/type";

export const VibeSelector = ({
  selectedVibe,
  onSelect,
}: {
  selectedVibe?: Vibe;
  onSelect: (vibe: Vibe) => void;
}) => (
  <div className="flex justify-center items-center gap-1 rounded-full bg-gray-100 p-1">
    {(Object.keys(VIBES) as Vibe[]).map((vibe) => (
      <button
        key={vibe}
        onClick={() => onSelect(vibe)}
        className={`p-1 rounded-full transition-colors text-gray-500 ${
          selectedVibe === vibe
            ? "bg-blue-200 text-blue-700"
            : "hover:bg-gray-200"
        }`}
        aria-label={`Set vibe to ${VIBES[vibe].name}`}
      >
        {vibe}
      </button>
    ))}
  </div>
);
