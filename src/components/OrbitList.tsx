"use client";
import { useEffect, useState } from "react";

const OrbitList = ({
  orbits,
  query,
}: {
  orbits: Array<Record<string, string | boolean>>;
  query: string;
}) => {
  const [data, setData] = useState(orbits);
  const keys = Object.keys(orbits[0] || {});

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

  const sortData = (field: string) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setData(sortedData);
  };

  return (
    <>
      {" "}
      <div className="overflow-x-auto w-full max-h-[400px] flex flex-col gap-8 max-w-[690px] rounded-lg border border-gray-300 ">
        <table className="w-full text-sm text-left text-black ">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              {keys.map((key) => (
                <th key={key} className="border-b">
                  <button
                    className="focus:bg-blue-400 focus:text-white px-4 py-2 hover:bg-blue-200 w-full"
                    onClick={() => sortData(key)}
                  >
                    {key}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          {data.length > 0 ? (
            <tbody>
              {data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    rowIndex % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  {Object.keys(item).map((key, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={
                        String(item[key]) === "space debris"
                          ? "bg-amber-300 px-4 py-2 border-b text-center"
                          : "px-4 py-2 border-b text-center"
                      }
                    >
                      {String(item[key])}
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
      <table className="bg-gray-100 text-gray-700 uppercase">
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
    </>
  );
};

export default OrbitList;
