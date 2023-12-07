import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import bgspa1 from "../assets/img/bgSpa1.svg";
import bgspa2 from "../assets/img/bgSpa2.svg";
import bgspa3 from "../assets/img/bgSpa3.svg";
interface SpaItemProps {}

const SpaItem: FC<SpaItemProps> = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      marginTop={8}
      alignItems="center"
    >
      <Box display="flex" gap={24} marginBottom={12}>
        <Box
          width={216}
          height={216}
          sx={{
            backgroundImage: `url("${bgspa1}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontWeight: 700, fontSize: 24, color: "white" }}>
            Pet Spa
          </Typography>
        </Box>
        <Box
          width={216}
          height={216}
          sx={{
            backgroundImage: `url("${bgspa2}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* <img src={bgspa2} /> */}
          <Typography sx={{ fontWeight: 700, fontSize: 24, color: "white" }}>
            Pet Spa
          </Typography>
        </Box>
        <Box
          width={216}
          height={216}
          sx={{
            backgroundImage: `url("${bgspa3}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* <img src={bgspa3} /> */}
          <Typography sx={{ fontWeight: 700, fontSize: 24, color: "white" }}>
            Pet Spa
          </Typography>
        </Box>
      </Box>

      <Box display="flex" gap={24}>
        <Box
          width={216}
          height={216}
          sx={{
            backgroundImage: `url("${bgspa2}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* <img src={bgspa2} /> */}
          <Typography sx={{ fontWeight: 700, fontSize: 24, color: "white" }}>
            Pet Spa
          </Typography>
        </Box>
        <Box
          width={216}
          height={216}
          sx={{
            backgroundImage: `url("${bgspa3}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* <img src={bgspa3} /> */}
          <Typography sx={{ fontWeight: 700, fontSize: 24, color: "white" }}>
            Pet Spa
          </Typography>
        </Box>
        <Box
          width={216}
          height={216}
          sx={{
            backgroundImage: `url("${bgspa1}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* <img src={bgspa1} /> */}
          <Typography sx={{ fontWeight: 700, fontSize: 24, color: "white" }}>
            Pet Spa
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SpaItem;
