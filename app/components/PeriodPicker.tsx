export default function PeriodPicker() {
  return (
    <span className="relative z-0 inline-flex h-6 rounded shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-350 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 D
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-350 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 W
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 M
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300  bg-gray-100 px-3 py-1 text-sm font-medium text-gray-350 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        1 Y
      </button>
    </span>
  );
}
