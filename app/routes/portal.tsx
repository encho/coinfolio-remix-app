import { Link, Outlet } from "@remix-run/react";

function PortalHeader() {
  return (
    <div className="flex- relative bg-white">
      <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/portal">
            <span className="sr-only">Coinfolio Capital</span>
            <img
              className="h-[24px]"
              src="https://coinfolio.s3.eu-central-1.amazonaws.com/logos/coinfolio-capital-logo-cockpit.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
}

function PortalFooter() {
  return (
    <footer className="border-t-200 border-t border-gray-100 bg-gray-50 pt-12 pb-14 md:pt-16">
      <div className="container mx-auto px-4 text-center">
        <a
          className="mx-auto inline-block text-2xl leading-none text-gray-600"
          href="/portal"
        >
          <img
            className="h-[20px]"
            src="https://coinfolio.s3.eu-central-1.amazonaws.com/logos/coinfolio-capital-logo-cockpit.svg"
            alt=""
          />
        </a>
      </div>
      <div className="container mx-auto mt-2 px-4">
        <p className="text-center text-sm text-gray-400">
          All rights reserved &copy; Coinfolio Capital 2022
        </p>
      </div>
    </footer>
  );
}

export default function Dashboard() {
  // const user = useOptionalUser();
  return (
    <div>
      <PortalHeader />

      <div className="encho-bg">
        <div>
          <Link to="strategies" className="text-blue-500 underline">
            Strategies
          </Link>
        </div>
        <div>
          <Link to="cryptocurrencies" className="text-blue-500 underline">
            Cryptocurrencies
          </Link>
        </div>
      </div>

      <Outlet />
      <PortalFooter />
    </div>
  );
}
