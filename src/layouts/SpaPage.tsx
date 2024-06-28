import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo, type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { searchShop } from "../api";
import SearchItem from "../components/SearchItem";
import { ShopType } from "../type";

interface SpaPageProps {}

const SpaPage: FC<SpaPageProps> = () => {
  const {
    data: { shops },
  } = useQuery({
    queryKey: ["search"],
    initialData: { shops: [], count: 0 },
    queryFn: () => {
      return searchShop({
        key: "",
        skip: 0,
      });
    },
  });
  const shopsGroups = useMemo(() => {
    return shops.reduce((acc, cur) => {
      let obj = acc[cur.address.province];
      if (!obj) obj = [];
      obj.push(cur);
      acc[cur.address.province] = obj;
      return acc;
    }, {} as Record<string, ShopType[]>);
  }, [shops]);
  return (
    <Box px={11} py={3}>
      {Object.entries(shopsGroups).map(([province, shops]) => (
        <Box key={province} sx={{ pb: 5 }}>
          <Typography
            sx={{ textAlign: "center", fontSize: 40, fontWeight: "600", pb: 4 }}
          >
            {province}
          </Typography>
          <Swiper spaceBetween={30} slidesPerView={4}>
            {shops.map((shop) => (
              <SwiperSlide key={shop.id}>
                <SearchItem {...shop} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ))}
    </Box>
  );
};

export default SpaPage;
