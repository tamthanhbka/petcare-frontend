import { NavigateNext, Search } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  InputBase,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchShop } from "../api";
import SearchItem from "../components/SearchItem";
import useShopSearch from "../hook/useShopSearch";

interface SearchResultProps {}

const SearchResult: FC<SearchResultProps> = () => {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const { setSearch, shops, search } = useShopSearch();
  const { data: searchResult } = useQuery({
    queryKey: ["search", searchParam.toString()],
    initialData: { shops: [], count: 0 },
    queryFn: () => {
      const key = searchParam.get("q");
      const sort = searchParam.get("sort");
      const page = parseInt(searchParam.get("page") || "1");
      return searchShop({
        key: key ?? "",
        sort: sort ?? undefined,
        skip: (page - 1) * 8,
      });
    },
  });
  return (
    <Box mt="15px">
      <Box display={"flex"} flexDirection={"column"} alignItems="center">
        <Box paddingRight={6} paddingLeft={6} display={"flex"} width={"100%"}>
          {/* Link */}
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ flex: 6, paddingTop: "10px" }}
          >
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href="/"
              //   onClick={handleClick}
            >
              Trang chủ
            </Link>
            <Typography key="3" color="text.primary">
              Kết quả tìm kiếm cho từ khóa "{searchParam.get("q")}"
            </Typography>
          </Breadcrumbs>
          <Box flex={6} display={"flex"} justifyContent={"flex-end"}>
            <Box
              width={"50%"}
              display="flex"
              sx={{ border: "3px solid #ED6436", borderRadius: 12 }}
              justifyContent="space-between"
              alignItems="center"
            >
              <InputBase
                onChange={(v) => setSearch(v.currentTarget.value)}
                sx={{ marginLeft: 2 }}
                placeholder="Nhập để tìm kiếm..."
              />
              <IconButton
                type="button"
                sx={{ p: "10px", color: "#ED6436" }}
                aria-label="search"
                onClick={() => navigate(`?q=${search}`)}
              >
                <Search
                  sx={{ color: "#9f9f9f", "&:hover": { color: "#ED6436" } }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {/* Danh sach shop */}
        <Box width={"80%"} paddingTop={2}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {searchResult.shops.map((shop) => (
              <Grid key={shop.id} item xs={2} sm={4} md={3}>
                <SearchItem {...shop} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* Phan trang */}
        <Pagination
          sx={{ paddingTop: "20px" }}
          count={Math.ceil(searchResult.count / 8)}
          onChange={(_, page) => {
            const s = new URLSearchParams(searchParam);
            s.set("page", page.toString());
            setSearchParam(s);
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchResult;
