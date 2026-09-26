import React, { useState } from 'react';
import { BoundingBox } from '../types';

interface BoundingBoxOverlayProps {
  boxes: BoundingBox[];
  isVisible: boolean;
}

export const BoundingBoxOverlay: React.FC<BoundingBoxOverlayProps> = ({
  boxes,
  isVisible
}) => {
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);

  if (!isVisible || !boxes || boxes.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-20">
      {boxes.map((box) => {
        const isRed = box.boxColor === 'red';
        const isAmber = box.boxColor === 'amber';
        const isGreen = box.boxColor === 'green';

        const borderColor = isRed
          ? 'border-[#B91C1C]'
          : isAmber
          ? 'border-[#D97706]'
          : 'border-[#15803D]';

        const bgColor = isRed
          ? 'bg-[#B91C1C]/15'
          : isAmber
          ? 'bg-[#D97706]/15'
          : 'bg-[#15803D]/15';

        const tagBg = isRed
          ? 'bg-[#B91C1C] text-white'
          : isAmber
          ? 'bg-[#D97706] text-white'
          : 'bg-[#15803D] text-white';

        const isActive = activeBoxId === box.id;

        return (
          <div
            key={box.id}
            style={{
              left: `${box.xPercent}%`,
              top: `${box.yPercent}%`,
              width: `${box.widthPercent}%`,
              height: `${box.heightPercent}%`
            }}
            className={`absolute border-2 ${borderColor} ${bgColor} rounded-md transition-all duration-300 pointer-events-auto cursor-pointer shadow-sm hover:scale-[1.02] ${
              isActive ? 'ring-2 ring-white ring-offset-1 z-30' : 'z-10'
            }`}
            onClick={() => setActiveBoxId(isActive ? null : box.id)}
            title={box.detail || box.label}
          >
            {/* Box Header Tag */}
            <div
              className={`absolute -top-3 left-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight uppercase shadow-xs whitespace-nowrap ${tagBg}`}
            >
              {box.label}
            </div>

            {/* Expanded tooltip details when clicked */}
            {isActive && box.detail && (
              <div className="absolute -bottom-8 left-0 right-0 mx-auto w-max max-w-[200px] bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded shadow-lg backdrop-blur-xs text-center z-40">
                {box.detail}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

