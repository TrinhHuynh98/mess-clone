import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { message, image, conservationId } = body;

    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conservationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: { id: currentUser.id },
        },
      },
    });

    const updateConservation = await prisma.conversation.update({
      where: {
        id: conservationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conservationId, "message:new", newMessage);

    const lastMessage =
      updateConservation.messages[updateConservation.messages.length - 1];

    updateConservation.users.map((user) => {
      pusherServer.trigger(user.email!, "conservation:update", {
        id: conservationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
