"use client";

import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { useCallback, useEffect, useRef } from "react";

const RULER_WIDTH = 816;
const SUBDIVISIONS = 10;
const TOTAL_UNITS = 8.5;
const MIN_GAP = 100;

const ticks = Array.from(
  { length: Math.floor(TOTAL_UNITS * SUBDIVISIONS) + 1 },
  (_, index) => {
    const value = index / SUBDIVISIONS;
    const isInteger = Number.isInteger(value);
    const isHalf = !isInteger && Number.isInteger(value * 2);

    return {
      id: index,
      left: `${(value / TOTAL_UNITS) * 100}%`,
      isInteger,
      isHalf,
      label: isInteger ? `${value}` : null,
    };
  },
);

export const Ruler = () => {
  const rulerRef = useRef<HTMLDivElement | null>(null);
  const activeDragRef = useRef<"left" | "right" | null>(null);
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);
  const setLeftMargin = useMutation(({ storage }, margin: number) => {
    storage.set("leftMargin", margin);
  }, []);
  const setRightMargin = useMutation(({ storage }, margin: number) => {
    storage.set("rightMargin", margin);
  }, []);

  const getRelativeX = (clientX: number) => {
    const rulerElement = rulerRef.current;

    if (!rulerElement) {
      return 0;
    }

    const { left, width } = rulerElement.getBoundingClientRect();
    const x = clientX - left;

    return Math.max(0, Math.min(x, width));
  };

  const handlePointerMove = useCallback(
    (clientX: number) => {
      const nextX = getRelativeX(clientX);

      if (activeDragRef.current === "left") {
        const maxLeft = RULER_WIDTH - rightMargin - MIN_GAP;
        setLeftMargin(Math.max(0, Math.min(nextX, maxLeft)));
      }

      if (activeDragRef.current === "right") {
        const nextRight = RULER_WIDTH - nextX;
        const maxRight = RULER_WIDTH - leftMargin - MIN_GAP;
        setRightMargin(Math.max(0, Math.min(nextRight, maxRight)));
      }
    },
    [leftMargin, rightMargin, setLeftMargin, setRightMargin],
  );

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!activeDragRef.current) {
        return;
      }

      handlePointerMove(event.clientX);
    };

    const onPointerUp = () => {
      activeDragRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [handlePointerMove]);

  const MarginMarker = ({
    side,
    position,
  }: {
    side: "left" | "right";
    position: number;
  }) => {
    return (
      <button
        type="button"
        aria-label={`${side} margin marker`}
        onPointerDown={(event) => {
          event.preventDefault();
          activeDragRef.current = side;
          handlePointerMove(event.clientX);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        className="absolute top-0 z-10 -translate-x-1/2 cursor-ew-resize touch-none"
        style={{ left: `${position}px` }}
      >
        <div className="flex flex-col items-center gap-0.5 mt-4">
          <div
            className="h-0 w-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "8px solid rgb(37 99 235)",
            }}
          />
        </div>
      </button>
    );
  };

  return (
    <div className="relative w-full h-14 select-none">
      <div className="absolute inset-x-0 top-6 h-px bg-[#D2D1C9]" />

      <div
        ref={rulerRef}
        className="relative mx-auto h-full"
        style={{ width: `${RULER_WIDTH}px` }}
      >
        <MarginMarker side="left" position={leftMargin} />
        <MarginMarker side="right" position={RULER_WIDTH - rightMargin} />

        {ticks.map((tick) => (
          <div
            key={tick.id}
            className="absolute top-1 -translate-x-1/2"
            style={{ left: tick.left }}
          >
            {tick.label && (
              <span className="block text-[10px] leading-none text-[#777773] text-center">
                {tick.label}
              </span>
            )}

            <div
              className="mx-auto w-px bg-[#8A8A83]"
              style={{
                width: tick.isInteger ? "2px" : "1px",
                height: tick.isInteger ? "12px" : tick.isHalf ? "10px" : "6px",
                marginTop: tick.label ? "4px" : "15px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
