import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";
interface IParams {
  conservationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    const { conservationId } = params;

    if (!currentUser?.id && !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find existing conservation

    const conservation = await prisma.conversation.findUnique({
      where: {
        id: conservationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conservation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // Find the last message

    const lastMessage = conservation.messages[conservation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(conservation);
    }

    const updateMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // Update all connections with new seen
    await pusherServer.trigger(currentUser.id, "conservation:update", {
      id: conservationId,
      messages: [updateMessage],
    });

    // If user has already seen the message, no need to go further
    if (lastMessage.senderId.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conservation);
    }

    // Update last message seen
    await pusherServer.trigger(
      conservationId!,
      "message:update",
      updateMessage
    );

    return NextResponse.json(updateMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse("Error", { status: 500 });
  }
}
