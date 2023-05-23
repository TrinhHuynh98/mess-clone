"use client";

import clsx from "clsx";
import useConservation from "@/hooks/useConservation";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const { isOpen } = useConservation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};
export default Home;
