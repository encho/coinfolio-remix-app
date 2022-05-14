import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  const text = "text-neue-text dark:text-neuedark-text";
  const background = "bg-neue-card-background dark:bg-neuedark-card-background";
  const border =
    "border border-neue-card-border dark:border-neuedark-card-border";

  const cardClasses = `p-4 rounded shadow overflow-hidden ${text} ${background} ${border}`;

  return <div className={cardClasses}>{children}</div>;
}
