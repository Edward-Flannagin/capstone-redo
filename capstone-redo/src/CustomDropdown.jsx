import { useState, useRef, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CustomDropdown.css";

function CustomDropdown({ id, value, onChange, options = [], label, className = "", onBlur, ...props }) {
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
      {label && (
        <label className="label" id={id ? `${id}-label` : undefined}>
          {label}
        </label>
      )}

      <div className="dropdown" ref={ref}>
        <button
          id={id}
          type="button"
          className={`dropdown-toggle ${className}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={id ? `${id}-listbox` : undefined}
          aria-labelledby={id ? `${id}-label` : undefined}
          onClick={() => setOpen(prev => !prev)}
          onBlur={onBlur}
          {...props}
        >
          {selectedLabel}
          <i className={`bi bi-chevron-down chevron ${open ? "rotated" : ""}`}></i>
        </button>

        {open && (
          <ul className="dropdown-menu" role="listbox" id={id ? `${id}-listbox` : undefined} aria-labelledby={id ? `${id}-label` : undefined}>
            {options.map((opt) => (
              <li
                key={opt.value}
                className="dropdown-item"
                role="option"
                aria-selected={opt.value === value}
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