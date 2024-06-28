import { Box } from "@mui/material";
import { HealthItem } from ".";
import { useQuery } from "@tanstack/react-query";
import shopApi from "../api/shop";

const HealthList = () => {
  const { data } = useQuery({
    queryKey: ["top-healths"],
    queryFn: () => shopApi.getTopShop(2),
    refetchOnWindowFocus: false,
    initialData: [],
  });
  return (
    <Box width="80%" display="flex" gap={4} paddingTop={4}>
      {data.map((shop) => (
        <HealthItem key={shop.id} {...shop} />
      ))}
    </Box>
  );
};

export default HealthList;
