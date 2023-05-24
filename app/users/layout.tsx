import React from "react";
import getListUser from "../actions/getListUser";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getListUser();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
