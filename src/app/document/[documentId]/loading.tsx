export default function DocumentLoading() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <div className="flex items-center gap-3 border-b border-[#DCDAD1] bg-[#FAFAF7] px-5 py-3">
        <div className="size-9 animate-pulse rounded-md bg-[#E2E2DC]" />
        <div className="space-y-2">
          <div className="h-5 w-48 animate-pulse rounded bg-[#E2E2DC]" />
          <div className="h-7 w-72 animate-pulse rounded bg-[#ECECE7]" />
        </div>
      </div>
      <div className="flex justify-center px-4 py-8">
        <div className="h-[1054px] w-[816px] animate-pulse rounded border border-[#DCDAD1] bg-[#FFFEFC]" />
      </div>
    </div>
  );
}
