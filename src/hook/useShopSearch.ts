import { useMutation } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import { searchShop } from "../api";

const useShopSearch = () => {
  const [search, setSearch] = useState("");
  const { mutate: findShop, data: shops } = useMutation({
    mutationFn: (search: string) => searchShop({ key: search }),
  });
  useLayoutEffect(() => {
    findShop(search);
  }, [findShop, search]);
  return { setSearch, shops, search };
};

export default useShopSearch;
