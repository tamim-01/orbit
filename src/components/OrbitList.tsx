"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OrbitItem {
  id: number;
  name: string;
  type: string;
  operational: boolean;
  orbitType: string;
  launchDate: string;
}

interface OrbitListProps {
  orbits: OrbitItem[];
  query: string;
}

const OrbitList = ({ orbits, query }: OrbitListProps) => {
  const [data, setData] = useState(orbits);
  type SortDirection = "none" | "asc" | "desc";
  const [sortConfig, setSortConfig] = useState<
    Record<keyof OrbitItem, { direction: SortDirection }>
  >({
    id: { direction: "none" },
    launchDate: { direction: "none" },
    name: { direction: "none" },
    operational: { direction: "none" },
    orbitType: { direction: "none" },
    type: { direction: "none" },
  });

  const keys =
    orbits.length > 0 ? (Object.keys(orbits[0]) as (keyof OrbitItem)[]) : [];

  const countTypes = (data: typeof orbits) => {
    const result: Record<string, number> = {};

    data.forEach((item) => {
      const type = item.type;
      if (typeof type === "string") {
        result[type] = (result[type] || 0) + 1;
      }
    });

    return result;
  };

  const countTypesData = countTypes(data);
  const orbitTypes = Object.keys(countTypes(orbits));

  useEffect(() => {
    if (!query) {
      setData(orbits);
      return;
    }

    const workingData = orbits.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    setData(workingData);
  }, [orbits, query]);

  const handleSort = (field: keyof OrbitItem) => {
    setSortConfig((prev) => {
      const current = prev[field].direction;
      let next: SortDirection;

      if (current === "none") next = "asc";
      else if (current === "asc") next = "desc";
      else next = "none";

      const newConfig: Record<keyof OrbitItem, { direction: SortDirection }> = {
        id: { direction: "none" },
        launchDate: { direction: "none" },
        name: { direction: "none" },
        operational: { direction: "none" },
        orbitType: { direction: "none" },
        type: { direction: "none" },
      };

      newConfig[field].direction = next;
      return newConfig;
    });

    setData(() => {
      if (sortConfig[field].direction === "desc") {
        return [...orbits];
      }

      const sorted = [...data].sort((a, b) => {
        const valA = a[field];
        const valB = b[field];

        if (valA < valB) return sortConfig[field].direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig[field].direction === "asc" ? 1 : -1;
        return 0;
      });

      return sorted;
    });
  };

  return (
    <>
      <table className="bg-gray-100 text-gray-700 uppercase rounded-2xl">
        <thead>
          <tr className="border-b">
            {orbitTypes.map((type, index) => (
              <th key={index}>
                <div className="px-4 py-2 text-[12px]">{type}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {orbitTypes.map((type, index) => (
              <td key={index} className="text-center text-[12px] py-2 px-4">
                {countTypesData[type] || 0}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="overflow-x-auto w-full max-h-[400px] flex flex-col gap-8 max-w-[800px] rounded-lg border border-gray-300 ">
        <table className="w-full text-sm text-left text-black ">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              {keys.map((key) => (
                <th key={key} className="border-b border-r">
                  <button
                    className="focus:bg-blue-400 focus:text-white px-4 py-2 hover:bg-blue-200 w-full flex flex-row justify-between"
                    onClick={() => {
                      handleSort(key);
                    }}
                  >
                    {key}
                    <div className="px-1  rounded-lg  ml-1.5 content-center ">
                      {sortConfig[key].direction === "asc" ? (
                        <Image
                          src="/icon/arrow.svg"
                          alt="asc"
                          className="rotate-180"
                          width={10}
                          height={10}
                        />
                      ) : sortConfig[key].direction === "desc" ? (
                        <Image
                          src="/icon/arrow.svg"
                          alt="desc"
                          width={10}
                          height={10}
                        />
                      ) : (
                        <span className="w-[10px] h-[10px]" />
                      )}
                    </div>
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          {data.length > 0 ? (
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className={
                    item.id % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  {Object.keys(item).map((key, index) => (
                    <td
                      key={index}
                      className={
                        String(item[key as keyof OrbitItem]) === "space debris"
                          ? "bg-amber-300 px-4 py-2 border-b text-center"
                          : "px-4 py-2 border-b text-center"
                      }
                    >
                      {String(item[key as keyof OrbitItem])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={keys.length}
                  className="text-center py-4 text-gray-500"
                >
                  Data not found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default OrbitList;
