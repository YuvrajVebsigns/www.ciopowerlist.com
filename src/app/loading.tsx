export default function Loading() {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex min-h-screen items-center justify-center bg-[#f9f3f3] dark:bg-[#f9f3f3]">
      <div className="flex flex-col items-center gap-4">
        {/* Simple Tailwind Spinner */}
        {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-500"></div> */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[rgb(237,230,230)] border-t-[#8e0101] dark:border-[#4a2424] dark:border-t-[#b33333]"></div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
