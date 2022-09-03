import { useEffect, useRef, useState } from "react";
import { CATEGORIES_URL } from "../services/constants";
import { getJSONData } from "../services/init";
import { Category, FilterData } from "../types";
import CategoryItem from "../components/Categories/CategoryItem";
import Sort from "../components/Sort";
import { SortData } from "../types";
import Filter from "../components/Filter";

function Categories() {
  const [data, setData] = useState<{items: Category[]}>({items: []});
  const [filter, setFilter] = useState<{filter: FilterData['exec'] | undefined}>({filter: undefined});
  const stateRef:any = useRef();
  stateRef.current = {items: data.items, filter: filter.filter};

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJSONData(CATEGORIES_URL);
      const result:Category[] = res.data;
      if (result) {
        setData({items: result});
      }
    };
    fetchData();
  }, []);

  if(!data.items.length) return <></>

  const list = (items:Category[]) => {
    return items.map(item=> <CategoryItem key={item.id} item={item}></CategoryItem>)
  }

  const handleFilter = (exec:FilterData['exec']) => {
    setFilter({filter: exec});
  }

  const handleSort = (exec:SortData['exec']) => {
    const {items} = stateRef.current;
    setData({items: items.sort(exec)});
  }

  const filterList = () => {
    const {items, filter} = stateRef.current;
    if(filter) {
      return items.filter(filter);
    }
    return items;
  }

  return (<main className="pb-5">
    <div className="text-center p-4">
      <h2>Categorías</h2>
      <p className="lead">Verás aquí todas las categorías del sitio.</p>
    </div>
    <div className="container">
      <div className="row">
        <Sort count="productCount" handleSort={handleSort}></Sort>
      </div> 
      <div className="row">
        <Filter handleFilter={handleFilter} count="productCount"></Filter>
      </div>
      <div className="row">
        <div className="list-group" id="cat-list-container">
          { list(filterList()) }
        </div>
      </div>
    </div>
  </main>)
}

export default Categories;
