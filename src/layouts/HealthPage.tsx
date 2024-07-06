import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo, type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getShopsByParent } from "../api";
import SearchItem from "../components/SearchItem";
import { ShopType } from "../type";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Pets } from "@mui/icons-material";

interface HealthPageProps {}

const HealthPage: FC<HealthPageProps> = () => {
  const { data: shops } = useQuery<ShopType[]>({
    queryKey: ["getByParent"],
    initialData: [],
    queryFn: () => {
      return getShopsByParent(2);
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
    <Box>
      {Object.entries(shopsGroups).map(([province, shops], index) => (
        <Box
          pt={"1rem"}
          px={11}
          py={3}
          key={province}
          sx={{ pb: 5, bgcolor: index % 2 == 0 ? "#edf2ea" : "#f7f2eb" }}
        >
          <Box textAlign="center" mb={"0.5rem"}>
            <Pets sx={{ color: "#82C55B", fontSize: 20, mr: "0.5rem" }}></Pets>
            <Pets sx={{ color: "#82C55B", fontSize: 25, mr: "0.5rem" }}></Pets>
            <Pets sx={{ color: "#82C55B", fontSize: 20 }}></Pets>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: "600",
              pb: 4,
              color: "#53b41a",
            }}
          >
            {province}
          </Typography>
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            modules={[Pagination]}
            pagination={true}
          >
            {shops.map((shop) => (
              <SwiperSlide key={shop.id} style={{ paddingBottom: "3rem" }}>
                <SearchItem {...shop} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ))}
    </Box>
  );
};

export default HealthPage;
