function ChairComponent({ x,
  y,
  rotation = 0,
  selected = false,
  disabled = false,
  ...rest
}) {
  const seatWidth = 53;
  const seatHeight = 30;
  const backHeight = 11;
  const backOffset = 4;

  const legWidth = 4;
  const legHeight = 12;

  const armHeight = 6;
  const armWidth = 18;
  const armOffsetY = -4; // slightly above seat

  const seatY = -seatHeight / 2;
  const backY = seatY - backHeight - backOffset;

  const fillColor = selected ? "#495E57" : "#EDEFEE";
  const strokeColor = selected ? "#333333" : "#495E57";

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Seat */}
      <rect
        x={-seatWidth / 2}
        y={seatY}
        width={seatWidth}
        height={seatHeight}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
        rx="6"
      />

      {/* Seat bevel / detail */}
      <rect
        x={-seatWidth / 2 + 4}
        y={seatY + 4}
        width={seatWidth - 8}
        height={seatHeight - 8}
        fill={selected ? "#EDEFEE" : "#FFFFFF"}
        opacity="0.35"
        rx="4"
      />

      {/* Backrest */}
      <rect
        x={-seatWidth / 2}
        y={backY}
        width={seatWidth}
        height={backHeight}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
        rx="4"
      />

      {/* Backrest slats / detail */}
      <rect
        x={-seatWidth / 2 + 6}
        y={backY + 2}
        width={seatWidth - 12}
        height={backHeight - 4}
        fill={selected ? "#EDEFEE" : "#FFFFFF"}
        opacity="0.25"
        rx="2"
      />

      {/* Armrest supports */}
      <rect
        x={-seatWidth / 2}
        y={seatY + armOffsetY}
        width={4}
        height={seatHeight / 2}
        fill={strokeColor}
        rx={2}
      />
      <rect
        x={seatWidth / 2 - 4}
        y={seatY + armOffsetY}
        width={4}
        height={seatHeight / 2}
        fill={strokeColor}
        rx={2}
      />

      {/* Armrests */}
      <rect
        x={-seatWidth / 2 + 4}
        y={seatY + armOffsetY - armHeight}
        width={armWidth}
        height={armHeight}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
        rx="3"
      />
      <rect
        x={seatWidth / 2 - armWidth - 4}
        y={seatY + armOffsetY - armHeight}
        width={armWidth}
        height={armHeight}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
        rx="3"
      />
    </g>
  );
}

export default ChairComponent;