"use client";

import useConservation from "@/hooks/useConservation";
import useRoute from "@/hooks/useRoutes";
import React from "react";
import MobileItem from "./MobileItem";

const MobileSidebar = () => {
  const routes = useRoute();
  const { isOpen } = useConservation();
  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed flex justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          label={item.label}
          active={item.active}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default MobileSidebar;
