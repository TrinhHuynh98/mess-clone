"use client";

import useOtherUser from "@/hooks/useOrtherUser";
import { Conversation, User } from "@prisma/client";
import React, { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";
import Avatar from "@/app/components/Avatar";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvartaGroup from "@/app/components/AvartaGroup";
import useActiveList from "@/hooks/useActiveList";

interface IHeader {
  conservation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<IHeader> = ({ conservation }) => {
  const otherUser = useOtherUser(conservation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conservation.isGroup) {
      return `${conservation.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [conservation, isActive]);

  return (
    <>
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        data={conservation}
      />
      <div
        className="
        bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        py-3 
        px-4
        lg:px-6 justify-between items-center shadow-sm 
    "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conservations"
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conservation?.isGroup ? (
            <AvartaGroup users={conservation.users} />
          ) : (
            <Avatar userInfo={otherUser} />
          )}

          <div className="flex flex-col">
            <div>{conservation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          onClick={() => setDrawerOpen(true)}
          size={32}
          className="
          rounded-full
          bg-sky-100
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
        />
      </div>
    </>
  );
};

export default Header;
