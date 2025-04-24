"use client";

import OrbitList from "@/components/OrbitList";
import orbits from "@/mock/orbits.json";
import { useState } from "react";
export default function Home() {
  const [query, setQuery] = useState("");
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  return (
    <main className="flex h-screen flex-col items-center r gap-6 p-24">
      <input
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="search here"
        onChange={onChangeHandler}
        type="text"
      />
      <OrbitList orbits={orbits} query={query} />
    </main>
  );
}
