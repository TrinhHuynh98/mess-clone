"use client";

import useActiveList from "@/hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import avarta from "../../public/images/avarta.jpg";

interface IAvartar {
  userInfo: User;
}

const Avatar: React.FC<IAvartar> = ({ userInfo }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(userInfo?.email!) !== -1;

  return (
    <div className="relative">
      <div
        className="
        relative
        inline-block
        rounded-full
        overflow-hidden
        -9
        w-9
        md:h-11
        md:w-11
        "
      >
        <Image
          fill
          src={userInfo?.image || "/images/avarta.jpg"}
          alt="Avarta"
        />
      </div>
      {isActive ? (
        <span
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
        />
      ) : null}
    </div>
  );
};

export default Avatar;
