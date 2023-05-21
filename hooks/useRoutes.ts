import { usePathname } from "next/navigation";
import useConservation from "./useConservation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import { useMemo } from "react";

const useRoute = () => {
  const pathname = usePathname();
  const { conversionId } = useConservation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conservations",
        icon: HiChat,
        active: pathname === "/conservations" || !!conversionId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "LogOut",
        href: "/#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversionId]
  );
  return routes;
};

export default useRoute;
