import { useQuery } from "@tanstack/react-query";
import shopApi from "../api/shop";
import { Box } from "@mui/material";
import HotelItem from "./HotelItem";

const HotelList = () => {
  const { data } = useQuery({
    queryKey: ["top-hotels"],
    queryFn: () => shopApi.getTopShop(3, 3),
    refetchOnWindowFocus: false,
    initialData: [],
  });
  return (
    <Box
      display="grid"
      gridTemplateColumns="auto auto auto"
      gap={10}
      marginBottom={12}
      px={25}
    >
      {data.map((shop) => (
        <HotelItem key={shop.id} {...shop} />
      ))}
    </Box>
  );
};

export default HotelList;
