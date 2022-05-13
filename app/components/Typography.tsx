import { ReactNode } from "react";

export function Heading1({ children }: { children: ReactNode }) {
  return (
    <h1 className="my-0 font-heading text-3xl leading-8 tracking-wide text-neue-header dark:text-neuedark-header lg:text-4xl">
      {children}
    </h1>
  );
}

export function Heading2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-0 mb-4 font-heading text-2xl leading-8 tracking-wide text-neue-header dark:text-neuedark-header lg:text-2xl">
      {children}
    </h2>
  );
}
