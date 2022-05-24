/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

type TTab = { name: string; href: string; current: boolean };

const tabs: Array<TTab> = [
  { name: "Overview", href: "#", current: true },
  { name: "Performance", href: "#", current: false },
  { name: "Asset Allocation", href: "#", current: false },
  { name: "Transactions", href: "#", current: false },
  //   { name: "Portfolio Analysis", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={(tabs.find((tab) => tab.current) as TTab).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          {/* <div> */}
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? // ? "border-blue-500 text-blue-500"
                      "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-350 hover:border-gray-550 hover:text-gray-550",
                  "whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium uppercase"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
