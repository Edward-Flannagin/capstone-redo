import { CHAIR_WIDTH, CHAIR_HEIGHT } from "./layoutConstants";


export function computeBounds(tables = [], padding = 40) {
  if (!Array.isArray(tables) || tables.length === 0) {
    return { minX: 0, minY: 0, width: 200, height: 200 };
  }

  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  tables.forEach(t => {
    const { x, y, type, radius, width, height, chairs } = t;

    if (type === "circle") {
      minX = Math.min(minX, x - radius);
      maxX = Math.max(maxX, x + radius);
      minY = Math.min(minY, y - radius);
      maxY = Math.max(maxY, y + radius);
    }

    if (type === "rect" || type === "square") {
      const w = width;
      const h = height;

      minX = Math.min(minX, x - w / 2);
      maxX = Math.max(maxX, x + w / 2);
      minY = Math.min(minY, y - h / 2);
      maxY = Math.max(maxY, y + h / 2);
    }

    // --- FIXED CHAIR BOUNDS ---
    if (Array.isArray(chairs)) {
      chairs.forEach(c => {
        const cx = x + c.x;
        const cy = y + c.y;

        const halfW = CHAIR_WIDTH / 2;
        const halfH = CHAIR_HEIGHT / 2;

        minX = Math.min(minX, cx - halfW);
        maxX = Math.max(maxX, cx + halfW);
        minY = Math.min(minY, cy - halfH);
        maxY = Math.max(maxY, cy + halfH);
      });
    }
  });

  return {
    minX: minX - padding,
    minY: minY - padding,
    width: (maxX - minX) + padding * 2,
    height: (maxY - minY) + padding * 2
  };
}