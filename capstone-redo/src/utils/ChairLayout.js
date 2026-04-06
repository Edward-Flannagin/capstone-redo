import { CHAIR_WIDTH, CHAIR_HEIGHT, CHAIR_SPACING, SEAT_DISTANCE } from "./layoutConstants";

/**
 * Returns an array of chair descriptor objects:
 * { x, y, rotation }
 * x/y are relative to the table center (group-local coords).
 */
export function generateChairs(table) {
  const chairs = [];

  // BAR TABLE:
  if (table.type=== "bar") return [];

  // --------------------------------------------------
  // CIRCULAR TABLES
  // --------------------------------------------------
  if (table.type === "circle") {
    const { radius } = table;

    const circumference = 2 * Math.PI * radius;
    const chairFootprint = CHAIR_WIDTH + CHAIR_SPACING;
    const count = Math.floor(circumference / chairFootprint);
    const distance = radius + SEAT_DISTANCE + CHAIR_HEIGHT / 2;

    for (let i = 0; i < count; i++) {
      const angleDeg = (i / count) * 360;
      const angleRad = (angleDeg * Math.PI) / 180;

      const cx = distance * Math.cos(angleRad);
      const cy = distance * Math.sin(angleRad);

      chairs.push({
        x: cx,
        y: cy,
        rotation: angleDeg + 90
      });
    }

    return chairs;
  }

  // --------------------------------------------------
  // RECTANGULAR TABLES
  // --------------------------------------------------
  if (table.type === "rect") {
    const { width, height, chairsPerSide = 4 } = table;

    const spacingCenter = CHAIR_WIDTH + CHAIR_SPACING;
    const span = (chairsPerSide - 1) * spacingCenter;
    const firstCenterX = -span / 2;
    const offsetY = SEAT_DISTANCE + CHAIR_HEIGHT / 2;
    const halfHeight = height / 2;

    // top row
    for (let i = 0; i < chairsPerSide; i++) {
      const cx = firstCenterX + i * spacingCenter;
      const cy = -halfHeight - offsetY;
      chairs.push({ x: cx, y: cy, rotation: 0 });
    }

    // bottom row
    for (let i = 0; i < chairsPerSide; i++) {
      const cx = firstCenterX + i * spacingCenter;
      const cy = halfHeight + offsetY;
      chairs.push({ x: cx, y: cy, rotation: 180 });
    }

    return chairs;
  }

  // --------------------------------------------------
  // SQUARE TABLES
  // --------------------------------------------------
  if (table.type === "square") {
    const { width, height, seatsPerSide = 1 } = table;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const offsetX = SEAT_DISTANCE + CHAIR_WIDTH / 2;
    const offsetY = SEAT_DISTANCE + CHAIR_HEIGHT / 2;

    // 2-PERSON SQUARE TABLE
    if(seatsPerSide === 0.5) {
      chairs.push(
        {
          x: 0,
          y: -halfHeight - offsetY,
          rotation: 0
        },
        {
          x: 0,
          y: halfHeight + offsetY,
          rotation: 180
        }
      );
    }

  // 4-PERSON SQUARE TABLE (one on each side)
    if (seatsPerSide === 1) {
      chairs.push(
        { x: 0, y: -halfHeight - offsetY, rotation: 0 },      // top
        { x: halfWidth + offsetX, y: 0, rotation: 90 },        // right
        { x: 0, y: halfHeight + offsetY, rotation: 180 },      // bottom
        { x: -halfWidth - offsetX, y: 0, rotation: 270 }       // left
      );

    } else if (seatsPerSide === 2) {
      // 8-person square (two on each side) - optional for larger squares
      const spacing = width / 3;
      chairs.push(
        { x: -spacing / 2, y: -halfHeight - offsetY, rotation: 0 },
        { x: spacing / 2, y: -halfHeight - offsetY, rotation: 0 },
        { x: halfWidth + offsetX, y: -spacing / 2, rotation: 90 },
        { x: halfWidth + offsetX, y: spacing / 2, rotation: 90 },
        { x: spacing / 2, y: halfHeight + offsetY, rotation: 180 },
        { x: -spacing / 2, y: halfHeight + offsetY, rotation: 180 },
        { x: -halfWidth - offsetX, y: spacing / 2, rotation: 270 },
        { x: -halfWidth - offsetX, y: -spacing / 2, rotation: 270 }
      );
    }

    return chairs;
  }

  return chairs;
}