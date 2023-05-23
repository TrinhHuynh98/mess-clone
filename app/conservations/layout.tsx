import React from "react";
import getConservation from "../actions/getConservation";
import getListUser from "../actions/getListUser";
import Sidebar from "../components/sidebar/Sidebar";
import ConservationList from "./components/ConservationList";

const ConsersationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conservations = await getConservation();
  const users = await getListUser();
  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConservationList
          users={users!}
          title="Messages"
          initialItems={conservations}
        />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConsersationLayout;
