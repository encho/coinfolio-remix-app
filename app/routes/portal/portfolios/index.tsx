import { Link } from "@remix-run/react";

export default function PortfoliosIndexPage() {
  return (
    <p>
      No Portfolio selected.
      <Link to="." className="text-blue-500 underline">
        go to dashboard
      </Link>
    </p>
  );
}
