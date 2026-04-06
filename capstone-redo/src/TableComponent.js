import React from "react";
import ChairComponent from "./ChairComponent";
import BarChairComponent from "./BarChairComponent";

function TableComponent({
  id,
  type,
  x,
  y,
  width,
  height,
  radius,
  chairs,
  selected,
  disabled,
  onSelect,
  displayNumber,
  isBarSeat
}) {
  // ---------------- COLORS ----------------
  const baseFill = "#EDEFEE";
  const baseStroke = "#36413D";   // MATCHES BAR STOOL

  const selectedFill = "#495E57";
  const selectedStroke = "#EDEFEE";

  const disabledFill = "#d9d9d9";
  const disabledStroke = "#333333";

  const fillColor = disabled
    ? disabledFill
    : selected
      ? selectedFill
      : baseFill;

  const strokeColor = disabled
    ? disabledStroke
    : selected
      ? selectedStroke
      : baseStroke;

  // ---------------- CLICK HANDLING ----------------
  const handleClick = () => {
    if (type === "bar" || isBarSeat) return;
    if (!disabled) onSelect(id);
  };

  return (
    <g
      onClick={handleClick}
      transform={`translate(${x}, ${y})`}
      style={{
        cursor:
          type === "bar" || isBarSeat
            ? "default"
            : disabled
              ? "not-allowed"
              : "pointer",
        opacity: disabled && type !== "bar" ? 0.35 : 1,
        transition: "opacity 0.2s ease"
      }}
    >

      {/* -------------------------------------------------- */}
      {/* BAR STOOLS (rendered FIRST so they appear UNDER bar) */}
      {/* -------------------------------------------------- */}
      {isBarSeat && (
        <g style={{ pointerEvents: "none" }}>
          <BarChairComponent
            x={0}
            y={0}
          />
        </g>
      )}

      {/* ---------------- ROUND TABLE ---------------- */}
      {!isBarSeat && type === "circle" && (
        <g>
          <circle
            cx={0}
            cy={0}
            r={radius}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={2}
          />
        </g>
      )}

      {/* ---------------- RECTANGULAR TABLE ---------------- */}
      {!isBarSeat && type === "rect" && (
        <g>
          <rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={3}
            rx={12}
          />
        </g>
      )}

      {/* ---------------- SQUARE TABLE ---------------- */}
      {!isBarSeat && type === "square" && (
        <g>
          <rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={3}
            rx={12}
          />
        </g>
      )}

      {/* -------------------------------------------------- */}
      {/* BAR TOP (rendered AFTER stools so it overlaps them) */}
      {/* -------------------------------------------------- */}
      {type === "bar" && (
        <>
          <rect
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            fill={baseFill}
            stroke={strokeColor}
            strokeWidth={3}
            rx="12"
          />

          <text
            y={-10}
            style={{
              textAlign: "center",
              dominantBaseline: "middle",
              textAnchor: "middle",
              fill: disabled ? "#333333" : selected ? "#edefee" : "#485e57"
            }}
          >
            Bar (unreservable)
          </text>
          <text
            y={10}
            style={{
              textAlign: "center",
              dominantBaseline: "middle",
              textAnchor: "middle",
              fontSize: "8pt",
              fontWeight: "bold",
              fill: disabled ? "#333333" : selected ? "#edefee" : "#485e57"
            }}
          >
            Only ages 21 and up allowed at the bar.
          </text>
        </>
      )}

      {/* ---------------- CHAIRS ---------------- */}
      {!isBarSeat &&
        type !== "bar" &&
        Array.isArray(chairs) &&
        chairs.length > 0 &&
        chairs.map((c, i) => (
          <ChairComponent
            key={`${id}-chair-${i}`}
            x={c.x}
            y={c.y}
            rotation={c.rotation}
            selected={selected}
            disabled={disabled}
          />
        ))}

      {/* ---------------- LABELS ---------------- */}
      {!isBarSeat && type !== "bar" && (
        <>
          <text
            y={-10}
            style={{
              textAlign: "center",
              dominantBaseline: "middle",
              textAnchor: "middle",
              fill: disabled ? "#333333" : selected ? "#edefee" : "#485e57"
            }}
          >
            Table: {displayNumber}
          </text>

          <text
            y={10}
            style={{
              textAlign: "center",
              dominantBaseline: "middle",
              textAnchor: "middle",
              fontSize: "8pt",
              fontWeight: "bold",
              fill: disabled ? "#333333" : selected ? "#edefee" : "#485e57"
            }}
          >
            Number of seats: {Array.isArray(chairs) ? chairs.length : 0}
          </text>
        </>
      )}
    </g>
  );
}

export default TableComponent;