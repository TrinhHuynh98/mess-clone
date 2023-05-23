"use client";

import { pusherClient } from "@/app/libs/pusher";
import { FullMessageType } from "@/app/types";
import useConservation from "@/hooks/useConservation";
import axios from "axios";
import { find } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface IContent {
  initialMessage: FullMessageType[];
}

const Content: React.FC<IContent> = ({ initialMessage }) => {
  const [messages, setMessages] = useState(initialMessage);

  const { conservationId } = useConservation();

  useEffect(() => {
    axios.post(`/api/conservations/${conservationId}/seen`);
  }, [conservationId]);

  const bottomrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pusherClient.subscribe(conservationId);
    bottomrRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conservations/${conservationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomrRef?.current?.scrollIntoView();
    };

    const updateHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMsg) => {
          if (currentMsg.id === newMessage.id) {
            return newMessage;
          }
          return currentMsg;
        })
      );
    };

    pusherClient.bind("message:new", messageHandler);
    pusherClient.bind("message:update", updateHandler);

    return () => {
      pusherClient.unsubscribe(conservationId);
      pusherClient.unbind("message:new", messageHandler);
      pusherClient.unbind("message:update", updateHandler);
    };
  }, [conservationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomrRef} />
    </div>
  );
};

export default Content;
