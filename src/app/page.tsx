import OrbitList from "@/components/OrbitList";
import { PaginationComponent } from "@/components/Pagination";
import { Search } from "@/components/Search";
import { getSummaries } from "@/data/loader";
import { countTypes } from "@/utils";
interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
    category?: string;
  };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const search = await searchParams;
  const query = search?.query;
  const perPage = 8;
  const currentPage = Number(search?.page) || 1;
  const { res, length } = getSummaries(currentPage, perPage);
  const orbitTypes = Object.keys(countTypes(res)).map((t) => {
    return { label: t, value: t };
  });
  const categoryArray = search?.category
    ?.split(" ")
    .map((c) => c.replace("-", " ").toLocaleLowerCase());
  return (
    <main className="flex  flex-col items-center  gap-6 p-24 h-screen bg-gray-900">
      <Search currentPage={currentPage} orbitTypes={orbitTypes} />
      <OrbitList orbits={res} query={query} categoryArray={categoryArray} />
      <PaginationComponent pageCount={length} />
    </main>
  );
}
