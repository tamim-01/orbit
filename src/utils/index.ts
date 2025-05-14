import { OrbitItem } from "@/components/OrbitList";

export const countTypes = (data: OrbitItem[]) => {
  const result: Record<string, number> = {};

  data.forEach((item) => {
    const type = item.type;
    if (typeof type === "string") {
      result[type] = (result[type] || 0) + 1;
    }
  });

  return result;
};