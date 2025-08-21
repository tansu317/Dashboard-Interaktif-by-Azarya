import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => (
  <div className={`bg-white border rounded-xl shadow ${className || ""}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }: CardProps) => (
  <div className={`${className || ""}`}>{children}</div>
);
