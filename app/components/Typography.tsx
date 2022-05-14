import { ReactNode } from "react";

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 mb-12">
      <Heading1>{children}</Heading1>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mt-0 mb-2">
      <Heading2>{children}</Heading2>
    </div>
  );
}

export function Heading1({ children }: { children: ReactNode }) {
  return (
    <h1 className="my-0 font-heading text-3xl font-semibold leading-8 tracking-wide text-neue-header dark:text-neuedark-header lg:text-4xl">
      {children}
    </h1>
  );
}

export function Heading2({ children }: { children: ReactNode }) {
  return (
    <h2 className="my-0 font-heading text-xl font-semibold leading-8 tracking-wide text-neue-header dark:text-neuedark-header lg:text-xl">
      {children}
    </h2>
  );
}
