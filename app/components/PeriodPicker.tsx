export default function PeriodPicker() {
  return (
    <span className="relative z-0 inline-flex rounded shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 D
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 W
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 M
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 Y
      </button>
    </span>
  );
}
