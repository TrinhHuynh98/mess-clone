"use client";

import { FullConservationType } from "@/app/types";
import useConservation from "@/hooks/useConservation";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { MdOutlineGroupAdd } from "react-icons/md";

import React, { useEffect, useMemo, useState } from "react";
import ConservationItem from "./ConservationItem";
import clsx from "clsx";
import GroupChatModel from "./GroupChatModel";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface IConservationList {
  users: User[];
  title?: string;
  initialItems: FullConservationType[];
}
const ConservationList: React.FC<IConservationList> = ({
  initialItems,
  users,
  title,
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const session = useSession();
  const [openGroupModal, setOpenGroupModal] = useState(false);

  const { isOpen, conservationId } = useConservation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conservation: FullConservationType) => {
      setItems((current) => {
        if (find(current, { id: conservationId })) {
          return current;
        }
        return [conservation, ...current];
      });
    };

    const updateHandler = (conservation: FullConservationType) => {
      setItems((current) =>
        current.map((currentConservation) => {
          if (currentConservation.id === conservation.id) {
            return {
              ...currentConservation,
              messages: conservation.messages,
            };
          }
          return currentConservation;
        })
      );
    };

    const deleteHandler = (conservation: FullConservationType) => {
      setItems((current) => {
        return [...current.filter((item) => item.id !== conservation.id)];
      });
      if (conservationId === conservation.id) {
        router.push("/conservations");
      }
    };

    pusherClient.bind("conservation:new", newHandler);
    pusherClient.bind("conservation:update", updateHandler);
    pusherClient.bind("conservation:delete", deleteHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conservation:new", newHandler);
      pusherClient.unbind("conservation:update", updateHandler);
      pusherClient.unbind("conservation:delete", deleteHandler);
    };
  }, [pusherKey, conservationId, router]);

  return (
    <>
      <GroupChatModel
        isOpen={openGroupModal}
        onClose={() => setOpenGroupModal(false)}
        users={users}
      />
      <aside
        className={clsx(
          `
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
      `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setOpenGroupModal(true)}
              className="
                rounded-full 
                p-2 
                bg-sky-100 
                text-sky-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConservationItem
              key={item.id}
              data={item}
              selected={conservationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConservationList;
