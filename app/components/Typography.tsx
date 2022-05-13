import { ReactNode } from "react";

export function Heading1({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-heading my-0 text-3xl leading-8 tracking-wide text-neue-header dark:text-neuedark-header lg:text-4xl">
      {children}
    </h1>
  );
}
