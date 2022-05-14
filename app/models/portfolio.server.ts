import type { User } from "@prisma/client";

const portfolios = [
  {
    userId: "cl305plna000699t19aqezycd",
    name: "G10 Momentum",
    slug: "g10-momentum",
  },
  {
    userId: "cl305plna000699t19aqezycd",
    name: "defi Rocks!",
    slug: "defi",
  },
];

export function getPortfolioInfoFromSlug({
  slug,
  userId,
}: {
  slug: string;
  userId: User["id"];
}): Promise<null | { name: string; slug: string }> {
  console.log(
    `Retrieving portfolio data for user: ${userId} and slug: ${slug}...`
  );
  const portfolioPromise: Promise<null | { name: string; slug: string }> =
    new Promise((resolve) => {
      setTimeout(() => {
        const portfolio = portfolios.find((it) => it.slug === slug);
        if (!portfolio) {
          resolve(null);
        } else {
          resolve(portfolio);
        }
      }, 300);
    });
  return portfolioPromise;
}
