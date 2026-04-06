import { useState, useRef, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CustomDropdown.css";

function CustomDropdown({ value, onChange, options = [], label, className = "", onBlur }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        if (onBlur) onBlur();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onBlur]);

  const selectedLabel = options.find(opt => opt.value === value)?.label || "";

  return (
    <div className="dropdown-wrapper">
      {label && <label className="label">{label}</label>}

      <div className="dropdown" ref={ref}>
        <button
          type="button"
          className={`dropdown-toggle ${className}`}
          onClick={() => setOpen(prev => !prev)}
          onBlur={onBlur}
        >
          {selectedLabel}
          <i className={`bi bi-chevron-down chevron ${open ? "rotated" : ""}`}></i>
        </button>

        {open && (
          <ul className="dropdown-menu">
            {options.map((opt) => (
              <li
                key={opt.value}
                className="dropdown-item"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  if (onBlur) onBlur();
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CustomDropdown;