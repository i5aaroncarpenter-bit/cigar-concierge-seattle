import { cn } from "@/lib/utils";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 24,
  label,
  invert = false,
  allowInput = false,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  label: string;
  invert?: boolean;
  allowInput?: boolean;
}) {
  return (
    <div className={cn("qty", invert && "qty-invert")}>
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      {allowInput ? (
        <input
          className="tabular-nums"
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) =>
            onChange(Math.max(min, Math.min(max, Number(e.target.value) || min)))
          }
          aria-label={`${label} quantity`}
        />
      ) : (
        <span className="tabular-nums">{value}</span>
      )}
      <button
        type="button"
        aria-label={`Increase ${label}`}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
