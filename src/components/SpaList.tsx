import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import shopApi from "../api/shop";
// import bgspa1 from "../assets/img/bgSpa1.svg";
// import bgspa2 from "../assets/img/bgSpa2.svg";
// import bgspa3 from "../assets/img/bgSpa3.svg";
import HotelItem from "./HotelItem";

interface SpaItemProps {}
// const bgspas = [bgspa1, bgspa2, bgspa3];
// const getShape = (index: 0 | 1 | 2) => ({
//   backgroundImage: `url("${bgspas[index]}")`,
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center",
//   backgroundSize: "cover",
//   cursor: "pointer",
// });
const SpaList: FC<SpaItemProps> = () => {
  const { data } = useQuery({
    queryKey: ["top-spas"],
    queryFn: () => shopApi.getTopShop(1, 3),
    refetchOnWindowFocus: false,
    initialData: [],
  });
  return (
    <Box
      display="grid"
      gridTemplateColumns="auto auto auto"
      gap={5}
      marginBottom={12}
      px={20}
    >
      {data.map((shop) => (
        <HotelItem key={shop.id} {...shop} />
      ))}
    </Box>
  );
};

export default SpaList;
