export default function DocumentLoading() {
  return (
    <div className="min-h-screen bg-[#f8fafd]">
      <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-3">
        <div className="size-9 animate-pulse rounded-md bg-gray-200" />
        <div className="space-y-2">
          <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-72 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
      <div className="flex justify-center px-4 py-8">
        <div className="h-[1054px] w-[816px] animate-pulse rounded border border-gray-200 bg-white" />
      </div>
    </div>
  );
}
