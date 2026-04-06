import "../src/CustomNumberInput.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function CustomNumberInput({
  value,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  onBlur,
  className = ""
}) {
  const update = (delta) => {
    const newValue = Math.min(max, Math.max(min, (value ?? 0) + delta));
    onChange(newValue);
  };

  return (
    <div className={`custom-number ${className}`}>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const num = parseFloat(e.target.value);
          if (!isNaN(num)) onChange(Math.min(max, Math.max(min, num)));
          else onChange(""); // allow clearing the field if desired
        }}
        onBlur={onBlur}
        aria-label="Number input"
      />

      <div className="divider" aria-hidden="true" />

      <div className="buttons" role="group" aria-label="Increment decrement">
        <button
          type="button"
          onClick={() => update(step)}
          aria-label="Increase value"
        >
          <i className="bi bi-chevron-up" />
        </button>
        <button
          type="button"
          onClick={() => update(-step)}
          aria-label="Decrease value"
        >
          <i className="bi bi-chevron-down" />
        </button>
      </div>
    </div>
  );
}