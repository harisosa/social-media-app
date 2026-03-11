"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { useDebounce } from "@/lib/useDebounce";
import { SearchUsersPanel } from "@/features/user/components";

type SearchBoxProps = {
  autoFocus?: boolean;
  mobile?: boolean;
  placeholder?: string;
};

export const SearchBox = ({
  autoFocus,
  mobile,
  placeholder = "Search",
}: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const shouldOpenSearchPanel = useMemo(
    () => debouncedQuery.trim().length > 0,
    [debouncedQuery],
  );

  return (
    <div className="relative">
      <label className="relative block w-full">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#717680]"
          size={18}
          strokeWidth={1.8}
        />

        <input
          autoFocus={autoFocus}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-10.5 w-full rounded-full border border-[#172033] bg-[#040B16] pl-12 pr-10 text-[14px] text-white outline-none placeholder:text-[#717680] focus:border-[#24314D]"
        />

        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 inline-flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#1F2430] text-[#98A2B3] transition hover:text-white"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        ) : null}
      </label>

      <SearchUsersPanel
        query={debouncedQuery}
        open={shouldOpenSearchPanel}
        mobile={mobile}
        className={!mobile ? "top-[calc(100%+10px)]" : undefined}
      />
    </div>
  );
};