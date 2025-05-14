"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Select from "./select";

export function Search({
  currentPage,
  orbitTypes,
}: {
  currentPage: number;
  orbitTypes: Array<{
    label: string;
    value: string;
  }>;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage));

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleCategory = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <section className="flex flex-row gap-6">
      <input
        type="text"
        className="w-full h-fit max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        placeholder="search here"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Select
        options={orbitTypes}
        searchable
        multiple
        placeholder="select a type"
        onChange={(values) => {
          if (Array.isArray(values)) {
            handleCategory(
              values
                .map((v) => {
                  return v.replace(" ", "-");
                })
                .join(" ")
            );
          }
        }}
        defaultValue={searchParams.get("category")?.toString()}
      />
    </section>
  );
}
