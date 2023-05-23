import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConservationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
