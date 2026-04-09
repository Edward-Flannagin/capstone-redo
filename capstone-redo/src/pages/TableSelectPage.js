
import { useState, useMemo, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import TableComponent from "../TableComponent";
import { computeBounds } from "../utils/ComputedBounds.js";
import { generateChairs } from "../utils/ChairLayout.js";
import { CHAIR_WIDTH, CHAIR_SPACING, TABLE_PADDING, SEAT_DISTANCE, ROOM_WIDTH, ROOM_HEIGHT } from "../utils/layoutConstants.js";

export default function TableSelectPage({
    reservation,
    setReservation,
    onNext,
    onBack,
    isSaving,
    showTitle = true,
    TopComponent = null,
}) {
    // CONSTANTS
    const chairsPerSide = 4;

    const autoWidth =
        chairsPerSide * CHAIR_WIDTH +
        (chairsPerSide - 1) * CHAIR_SPACING +
        TABLE_PADDING * 2;

    const locationOffsets = {
        patio: 40, first: 80, "second-floor": 0,
    }
    // ROUTER HOOKS

    // STATE
    const partySize = reservation.guests;
    const [selectedTable, setSelectedTable] = useState(null);   // now stores OBJECT
    const [selectedLocation, setSelectedLocation] = useState("patio");
    const [isVisible, setIsVisible] = useState(true);

    // REFS
    const mapGroupRef = useRef(null);

    // HELPER FUNCTIONS
    function getTableCapacity(table) {
        if (table.type === "bar") return { min: 0, max: 0 };

        if (table.type === "circle") {
            const cap = table.radius > 70 ? 6 : 4;
            return cap === 4 ? { min: 3, max: 4 } : { min: 4, max: 6 };
        }

        if (table.type === "square") {
            const cap = (table.seatsPerSide || 1) * 4;
            if (cap === 2) return { min: 2, max: 2 };
            if (cap === 4) return { min: 3, max: 4 };
            return { min: cap - 1, max: cap };
        }

        if (table.type === "rect") {
            const cap = (table.chairsPerSide || 1) * 2;
            return cap === 10 ? { min: 8, max: 10 } : { min: cap - 2, max: cap };
        }

        return { min: 0, max: 0 };
    }

    function normalizeFloor(tables) {
        const b = computeBounds(tables, 80);

        const floorCenterX = b.minX + b.width / 2;
        const floorCenterY = b.minY + b.height / 2;

        const shiftX = ROOM_WIDTH / 2 - floorCenterX;
        const shiftY = ROOM_HEIGHT / 2 - floorCenterY;

        return tables.map(t => ({
            ...t,
            x: t.x + shiftX,
            y: t.y + shiftY,
        }));
    }

    // RAW TABLE DATA
    const patioTablesRaw = [
        { id: 1, type: "circle", x: 150, y: 200, radius: 60, location: "patio" },
        { id: 2, type: "circle", x: 150, y: 450, radius: 60, location: "patio" },
        { id: 3, type: "circle", x: 750, y: 200, radius: 60, location: "patio" },
        { id: 4, type: "circle", x: 750, y: 450, radius: 60, location: "patio" },
        { id: 5, type: "circle", x: 450, y: 300, radius: 90, location: "patio" },
    ];

    const firstFloorTablesRaw = [
        { id: 1, type: "square", x: 130, y: 200, width: 100, height: 100, seatsPerSide: 1, location: "first" },
        { id: 2, type: "rect", x: 450, y: 200, width: 360, height: 100, chairsPerSide: 5, location: "first" },
        { id: 3, type: "square", x: 780, y: 200, width: 100, height: 100, seatsPerSide: 1, location: "first" },
        { id: 4, type: "rect", x: 150, y: 450, width: 260, height: 100, chairsPerSide: 3, location: "first" },
        { id: 5, type: "square", x: 450, y: 450, width: 100, height: 100, seatsPerSide: 0.5, location: "first" },
        { id: 6, type: "rect", x: 750, y: 450, width: 260, height: 100, chairsPerSide: 3, location: "first" },

        ...Array.from({ length: 8 }).map((_, i) => {
            const barHeight = 100;
            const barCenterY = 700;
            const offsetY = SEAT_DISTANCE + CHAIR_WIDTH / 2;

            return {
                id: 200 + i,
                type: "circle",
                x: 120 + i * 90,
                y: barCenterY - barHeight / 2 - offsetY,
                radius: 26.5,
                location: "first",
                isBarSeat: true,
            };
        }),

        { id: 99, type: "bar", x: 455, y: 700, width: 900, height: 100, location: "first" },
    ];

    const secondFloorTablesRaw = [
        { id: 1, type: "rect", x: 200, y: 200, width: autoWidth, height: 100, chairsPerSide, location: "second-floor" },
        { id: 2, type: "rect", x: 500, y: 200, width: 200, height: 100, chairsPerSide: 2, location: "second-floor" },
        { id: 3, type: "square", x: 740, y: 200, width: 100, height: 100, seatsPerSide: 1, location: "second-floor" },
        { id: 4, type: "rect", x: 170, y: 450, width: 260, height: 100, chairsPerSide: 3, location: "second-floor" },
        { id: 5, type: "rect", x: 480, y: 450, width: 260, height: 100, chairsPerSide: 3, location: "second-floor" },
        { id: 6, type: "circle", x: 750, y: 430, radius: 60, location: "second-floor" },
    ];

    // NORMALIZED TABLE DATA
    const patioTables = normalizeFloor(patioTablesRaw);
    const firstFloorTables = normalizeFloor(firstFloorTablesRaw);
    const secondFloorTables = normalizeFloor(secondFloorTablesRaw);

    // VISIBLE TABLES
    const visibleTables =
        selectedLocation === "patio"
            ? patioTables
            : selectedLocation === "first"
                ? firstFloorTables
                : secondFloorTables;

    // BOUNDS OF TABLES
    const bounds = useMemo(() => computeBounds(visibleTables, 100), [visibleTables]);

    // SCALE TO FIT VIEWBOX
    const scaleX = ROOM_WIDTH / bounds.width;
    const scaleY = ROOM_HEIGHT / bounds.height;
    const scale = Math.min(scaleX, scaleY);

    // SCALED CONTENT SIZE
    const scaledWidth = bounds.width * scale;
    const scaledHeight = bounds.height * scale;

    // DERRIVED VALUES
    const locationLabelMap = {
        patio: "Patio",
        first: "First Floor",
        "second-floor": "Second Floor",
    };

    const locationOffset = locationOffsets[selectedLocation] ?? 0;
    const visualOffset = locationOffset / scale; // divide by scale so offset is in screen pixels


    // EFFECTS
    const handleTableSelect = (tableId) => {
        const tableObj = visibleTables.find((t, idx) => {
            const displayNumber = idx + 1;
            const fullId = `${selectedLocation}-${displayNumber}`;
            return fullId === tableId;
        });

        if (!tableObj) return;

        const idx = visibleTables.indexOf(tableObj);
        const displayNumber = idx + 1;

        setSelectedTable({
            ...tableObj,
            fullId: tableId,
            tableNumber: displayNumber
        });
    };

    const handleContinue = (event) => {
        event.preventDefault();

        if (!selectedTable) {
            toast.error("Please select a table");
            return;
        }

        // Advance to the next wizard step with the selected table
        onNext({
            table: selectedTable
        });
    };

    useEffect(() => {
        setIsVisible(false);
        const timeout = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timeout);
    }, [selectedLocation]);


    // ------------------------------------------------
    // THE RETURN FUNCTION
    // ------------------------------------------------
    return (
        <div className="table-select-page">
            {/* HEADER */}
            <div className="table-select-headers">
                <div className="menu-page-header" style={{ marginBottom: 8 }}>
                    <h1 className="table-select-h1">Select Your Table</h1>
                    {showTitle && (
                        <>
                            <h2 className="booking-h2">Input your desired date, time, & party-size</h2>
                            {TopComponent && <TopComponent />}
                        </>
                    )}
                </div>

                <div className="selection-options">
                    {["patio", "first", "second-floor"].map((loc) => (
                        <button
                            key={loc}
                            onClick={() => {
                                setSelectedLocation(loc);
                                setSelectedTable(null);
                            }}
                            className={`category-button ${selectedLocation === loc ? 'active' : ''}`}
                            aria-pressed={selectedLocation === loc}
                        >
                            {locationLabelMap[loc]}
                        </button>
                    ))}
                    <div className="showing-loc-text">
                        Now showing: {locationLabelMap[selectedLocation]}
                    </div>
                </div>
            </div>

            {/* MAIN AREA */}
            <div
                className="table-select-page-fullscreen"
                style={{
                    minHeight: "calc(100vh - 120px)",
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    margin: 0,
                }}
            >
                <div
                    className="table-select-container"
                    style={{
                        flex: 1,
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <svg
                        className="restaurant-map-fullscreen"
                        viewBox={`0 0 ${ROOM_WIDTH} ${ROOM_HEIGHT}`}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g
                            ref={mapGroupRef}
                            transform={`
                                scale(${scale})
                                translate(${-bounds.minX * scale}, ${-bounds.minY * scale})
                            `}
                            className={`floor-transition ${isVisible ? "floor-visible" : "floor-hidden"}`}
                        >
                            <g className="map-wrapper" transform={`translate(0, ${visualOffset})`}>
                                {/* ROOM OUTLINE */}
                                <rect
                                    x={bounds.minX}
                                    y={bounds.minY}
                                    width={bounds.width}
                                    height={bounds.height}
                                    fill="#EDEFEE"
                                    stroke="#C8C4BE"
                                    strokeWidth={10 / scale}
                                    rx={20 / scale}
                                />

                                {visibleTables.map((table, idx) => {
                                    const capacity = getTableCapacity(table);
                                    const tooSmall = partySize && capacity && partySize > capacity.max;
                                    const chairs = table.type === "bar" ? [] : generateChairs(table);
                                    const displayNumber = idx + 1;
                                    const fullId = `${selectedLocation}-${displayNumber}`;

                                    return (
                                        <g key={fullId}>
                                            {!table.isBarSeat && table.type !== "bar" && (
                                                <ellipse
                                                    cx={table.x}
                                                    cy={table.y + 10}
                                                    rx={table.width ? table.width * 0.55 : table.radius * 1.1}
                                                    ry={table.height ? table.height * 0.25 : table.radius * 0.4}
                                                    fill="rgba(0,0,0,0.12)"
                                                    style={{ filter: "blur(4px)" }}
                                                />
                                            )}

                                            {table.type === "bar" && (
                                                <rect
                                                    x={table.x - table.width / 2}
                                                    y={table.y - table.height / 2 + 6}
                                                    width={table.width}
                                                    height={table.height}
                                                    fill="rgba(0,0,0,0.15)"
                                                    rx={12}
                                                    style={{ filter: "blur(6px)" }}
                                                />
                                            )}

                                            <TableComponent
                                                {...table}
                                                id={fullId}
                                                displayNumber={displayNumber}
                                                chairs={chairs}
                                                selected={selectedTable?.fullId === fullId}
                                                onSelect={(id) => {
                                                    if (!tooSmall) handleTableSelect(id);
                                                }}
                                                disabled={tooSmall}
                                            />
                                        </g>
                                    );
                                })}
                            </g>
                        </g>
                    </svg>
                </div>

                {/* ACTION BUTTON */}
                <div className="btn-container">
                    <div className="form-actions" style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 16 }}>
                        <div className="location-txt">
                            Location: {locationLabelMap[selectedLocation]}
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                            {/* Back button (replaces Skip) */}
                            <button type="button" className="category-button same-width-btn" onClick={() => onBack?.()}>
                                Back
                            </button>

                            {/* Original Continue / Begin my Reservation button */}
                            <button type="button" className="category-button same-width-btn" onClick={handleContinue} disabled={!selectedTable || isSaving}>
                                Continue with Table {selectedTable ? selectedTable.id : " "}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


