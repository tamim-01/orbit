import { OrbitItem } from "@/components/OrbitList";
import orbits from "../mock/orbits.json"
export  function getSummaries( currentPage: number , perPage : number) {
    const totalItems = [];
    for (let i = 0; i < orbits.length; i++){
        totalItems.push(i)
  }
  const pages = totalItems.reduce((pagesArray : Array<Array<number>>, item, index) => { 
    const chunkIndex = Math.floor(index/perPage)
    if(!pagesArray[chunkIndex]) {
      pagesArray[chunkIndex] = [] 
    }
    pagesArray[chunkIndex].push(item)
    return pagesArray
  }, [])
    const res : OrbitItem[] = [];
    pages[currentPage - 1].forEach((i) => { res.push(orbits[i]) });
    return {res , length : pages.length};
};