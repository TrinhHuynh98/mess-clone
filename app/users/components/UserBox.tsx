"use client";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/modals/LoadingModal";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
interface IUserBox {
  user: User;
}
const UserBox: React.FC<IUserBox> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conservations", { userId: user.id })
      .then((data) => {
        router.push(`/conservations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);
  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
        w-full
        relative
        flex
        items-center
        space-x-3
        bg-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        "
      >
        <Avatar userInfo={user} />
        <div className="min-w-0 flex-1">
          <span className="absolute inset-0" aria-hidden="true"></span>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
