import { usePathname } from "next/navigation";
import useConservation from "./useConservation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { signOut } from "next-auth/react";
import { useMemo } from "react";

const useRoute = () => {
  const pathname = usePathname();
  const { conservationId } = useConservation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conservations",
        icon: BsFillChatQuoteFill,
        active: pathname === "/conservations" || !!conservationId,
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
        icon: AiOutlinePoweroff,
        onClick: () => signOut(),
      },
    ],
    [pathname, conservationId]
  );
  return routes;
};

export default useRoute;
