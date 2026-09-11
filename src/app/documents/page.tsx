import { Suspense } from "react";
import { DocumentTable } from "../(home)/Table";
import { Navbar } from "../(home)/navbar";

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-[#252525]">
      <Suspense fallback={<DocumentsSkeleton />}>
        <Navbar />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
          <DocumentTable />
        </div>
      </Suspense>
    </main>
  );
}

function DocumentsSkeleton() {
  return (
    <div className="min-h-screen bg-[#fafaf8] px-5 pt-8 sm:px-8 sm:pt-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-36 rounded bg-[#e9e9e4]" />
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-24 rounded-md bg-[#eeeeea]" />
          ))}
        </div>
      </div>
    </div>
  );
}
