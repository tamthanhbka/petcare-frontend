import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";

interface HomeLayout {}

const HomeLayout: FC<HomeLayout> = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
