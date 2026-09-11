"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchParam);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  const updateSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    const query = params.toString();
    router.replace(query ? `?${query}` : "?");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateSearch(search);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <Search
        aria-hidden="true"
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
      />
      <label className="sr-only" htmlFor="document-search">
        Search documents
      </label>
      <input
        id="document-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search documents"
        className="h-9 w-full rounded-lg border border-[#deded9] bg-[#fffefc] pl-9 pr-9 text-sm text-[#252525] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#8a8a85] focus:border-[#3971c6] focus:ring-2 focus:ring-[#3971c6]/15"
      />
      {search ? (
        <button
          type="button"
          onClick={() => {
            setSearch("");
            updateSearch("");
          }}
          className="absolute right-1.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-[#737373] transition-colors hover:bg-[#f1f1ed] hover:text-[#252525] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3971c6]"
          aria-label="Clear document search"
        >
          <X size={15} />
        </button>
      ) : null}
    </div>
  );
}
