"use client";

import { User } from "@prisma/client";
import React from "react";
import UserBox from "./UserBox";
interface IUserList {
  users: User[];
}
const UserList: React.FC<IUserList> = ({ users }) => {
  return (
    <aside
      className="
    fixed
    inset-y-0
    pb-20
    lg:pb-0
    lg:left-20
    lg:w-80
    lg:block
    overflow-y-auto
    border-r
    border-gray-200
    block w-ful left-0
    "
    >
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-700 py-4">
            Friends
          </div>
        </div>
        {users.map((item) => (
          <UserBox user={item} key={item.id} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
