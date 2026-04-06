import { useState, useEffect, useCallback, useMemo } from "react";

export function useFilledField(value, { treatZeroAsMeaningful = false } = {}) {
    const [touched, setTouched] = useState(false);


    const markTouched = useCallback(() => {
        setTouched(true);
    }, [])

    const isMeaningful = useMemo(() => {
        if (value === null || value === undefined) return false;
        if (value === "" || value === "default" || value === "--:--") return false;
        if (!treatZeroAsMeaningful && typeof value === "number" && value === 0) return false;
        return true;
    }, [value, treatZeroAsMeaningful])

    //   if the value becomes non-meaningful, clear touched so that the field won't show filled
    useEffect(() => {
        if (!isMeaningful && touched) {
            setTouched(false);
        }
    }, [isMeaningful, touched])
    const className = useMemo(() => (touched && isMeaningful ? "filled" : ""), [touched, isMeaningful]);

    return {
        className,
        onBlur: markTouched,
        onChange: markTouched,
        filled: touched && isMeaningful
    };

}