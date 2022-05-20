import { Link } from "@remix-run/react";
import { XIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">{children}</div>;
}

export function Header({}: {}) {
  return (
    <div className="mb-8 flex w-full items-center justify-between border-b border-gray-200 py-4 px-8">
      <div>
        <Link to={`/portal`} prefetch="render" className="focus:outline-none">
          <span className="sr-only">Back</span>
          <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
        </Link>
      </div>
      <div>
        <div className="flex flex-shrink-0 items-center px-4">
          <span className="sr-only">Coinfolio Capital</span>
          <img
            className="h-[24px] w-auto"
            src="https://coinfolio.s3.eu-central-1.amazonaws.com/logos/coinfolio-capital-logo-cockpit.svg"
            alt="Coinfolio Capital"
          />
        </div>
      </div>
      <div>
        <Link to={`/portal`} prefetch="render" className="focus:outline-none">
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
