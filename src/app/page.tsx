import OrbitList from "@/components/OrbitList";
import { PaginationComponent } from "@/components/Pagination";
import { Search } from "@/components/Search";
import { getSummaries } from "@/data/loader";
interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const search = await searchParams;
  const query = search?.query ?? "";
  const perPage = 8;
  const currentPage = Number(search?.page) || 1;
  const { res, length } = getSummaries(currentPage, perPage);

  return (
    <main className="flex  flex-col items-center  gap-6 p-24">
      <Search currentPage={currentPage} />
      <OrbitList orbits={res} query={query} />
      <PaginationComponent pageCount={length} />
    </main>
  );
}
