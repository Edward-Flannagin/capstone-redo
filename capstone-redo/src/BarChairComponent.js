function BarChairComponent({ x, y }) {
  const fill = "#EDEFEE";     // same as tables
  const stroke = "#36413D";   // same as table border

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Seat */}
      <circle
        cx={0}
        cy={0}
        r={14}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
      />

      {/* Stem / central post */}
      <rect
        x={-2}
        y={14}          // starts just below the seat
        width={4}
        height={18}     // length of the post
        fill={stroke}
        rx={2}
      />

      {/* Footrest ring */}
      <circle
        cx={0}
        cy={32}         // positioned near bottom of post
        r={10}
        stroke={stroke}
        strokeWidth={2}
        fill="none"
      />
    </g>
  );
}

export default BarChairComponent;