import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = "",
  headerRight,
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-sm
        p-5
        ${className}
      `}
    >
      {(title || headerRight) && (
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          {headerRight}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;