// src/features/graph/hooks/useLegendToggle.tsx
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export interface LegendSeries {
  key: string;
  label: string;
  color: string;
}

export const useLegendToggle = (series: LegendSeries[]) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(
    series.map((s) => s.key)
  );
  const [colors, setColors] = useState<Record<string, string>>(
    Object.fromEntries(series.map((s) => [s.key, s.color]))
  );
  const [showPicker, setShowPicker] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setActiveKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleColorChange = (key: string, newColor: string) => {
    setColors((prev) => ({ ...prev, [key]: newColor }));
  };

  const renderLegend = () => (
    <ul className="flex flex-wrap gap-3 mt-2">
      {series.map((s) => {
        const active = activeKeys.includes(s.key);
        const currentColor = colors[s.key];
        return (
          <li key={s.key} className="flex flex-col gap-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={active}
                onChange={() => handleToggle(s.key)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
              />
              <span
                className={
                  active
                    ? "text-gray-800 text-sm font-medium"
                    : "text-gray-400 text-sm"
                }
              >
                {s.label}
              </span>
            </label>

            {/* 색상 피커 버튼 */}
            <div className="relative">
              <div
                className="w-6 h-6 rounded cursor-pointer border ring-1 ring-transparent hover:ring-blue-300 transition-all"
                style={{ backgroundColor: currentColor }}
                onClick={() =>
                  setShowPicker(showPicker === s.key ? null : s.key)
                }
              />

              {/* 색상 피커 팝업 */}
              {showPicker === s.key && (
                <div className="absolute bottom-full left-0 mb-2 z-10 bg-white border shadow-lg rounded-lg p-2">
                  <HexColorPicker
                    color={currentColor}
                    onChange={(color) => handleColorChange(s.key, color)}
                  />
                  <div className="mt-2 p-1 bg-gray-100 rounded flex gap-1">
                    <button
                      className="flex-1 px-2 py-1 text-xs rounded text-gray-700 hover:bg-gray-200"
                      onClick={() => {
                        handleColorChange(s.key, "#10b981");
                        setShowPicker(null);
                      }}
                    >
                      기본
                    </button>
                    <button
                      className="flex-1 px-2 py-1 text-xs rounded text-gray-700 hover:bg-gray-200"
                      onClick={() => setShowPicker(null)}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );

  return { activeKeys, colors, renderLegend };
};
