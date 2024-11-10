import { useState, useEffect } from "react";

type Precision = "y" | "M" | "d" | "h" | "m" | "s";

function useLocalTime(timestamp: number | null, precision: Precision = "s") {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    if (timestamp) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const formatOptions: Intl.DateTimeFormatOptions = {
        timeZone,
        year: ["y", "M", "d", "h", "m", "s"].includes(precision) ? "numeric" : undefined,
        month: ["M", "d", "h", "m", "s"].includes(precision) ? "long" : undefined,
        day: ["d", "h", "m", "s"].includes(precision) ? "numeric" : undefined,
        hour: ["h", "m", "s"].includes(precision) ? "numeric" : undefined,
        minute: ["m", "s"].includes(precision) ? "numeric" : undefined,
        second: ["s"].includes(precision) ? "numeric" : undefined,
      };

      const date = new Date(timestamp);
      const formattedTime = date.toLocaleString("en-US", formatOptions);

      setLocalTime(formattedTime);
    }
  }, [timestamp, precision]);

  return localTime;
}

export default useLocalTime;
