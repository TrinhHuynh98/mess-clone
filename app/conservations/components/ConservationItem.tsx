"use client";

import Avatar from "@/app/components/Avatar";
import { FullConservationType } from "@/app/types";
import useOtherUser from "@/hooks/useOrtherUser";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useCallback, useMemo, useState } from "react";
import AvartaGroup from "@/app/components/AvartaGroup";
interface IConservationItem {
  data: FullConservationType;
  selected?: boolean;
}
const ConservationItem: React.FC<IConservationItem> = ({ data, selected }) => {
  const session = useSession();
  const router = useRouter();
  const otherUser = useOtherUser(data);

  const handleClick = useCallback(() => {
    router.push(`/conservations/${data.id}`);
  }, [data.id, router]);

  const lasteMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lasteMessage) {
      return false;
    }
    const seenArray = lasteMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((item) => item.email === userEmail).length !== 0;
  }, [userEmail, lasteMessage]);

  const lastMessageText = useMemo(() => {
    if (lasteMessage?.image) {
      return "Sent an image";
    }
    if (lasteMessage?.body) {
      return lasteMessage?.body;
    }

    return "Started a conservation";
  }, [lasteMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
      w-full 
      relative 
      flex 
      items-center 
      space-x-3 
      p-3 
      hover:bg-neutral-100
      rounded-lg
      transition
      cursor-pointer
      `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvartaGroup users={data.users} />
      ) : (
        <Avatar userInfo={otherUser} />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true"></span>
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>

            {lasteMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lasteMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
              truncate 
              text-sm
              `,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConservationItem;
