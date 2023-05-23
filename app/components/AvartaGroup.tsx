"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import PlaceHolder from "../../public/images/avarta.jpg";

interface IAvartaGroup {
  users?: User[];
}
const AvartaGroup: React.FC<IAvartaGroup> = ({ users = [] }) => {
  const sliceUser = users?.slice(0, 3);

  const positionAvatar = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {sliceUser?.map((user, index) => (
        <div
          key={user.id}
          className={`
         absolute
         inline-block 
         rounded-full 
         overflow-hidden
         h-[21px]
         w-[21px]
         ${positionAvatar[index as keyof typeof positionAvatar]}
       `}
        >
          <Image alt="photo" fill src={user?.image || PlaceHolder} />
        </div>
      ))}
    </div>
  );
};

export default AvartaGroup;
