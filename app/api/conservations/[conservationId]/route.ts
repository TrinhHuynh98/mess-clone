import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conservationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conservationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deleteConservation = await prisma.conversation.deleteMany({
      where: {
        id: conservationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conservation:delete",
          existingConversation
        );
      }
    });

    return NextResponse.json(deleteConservation);
  } catch (error) {
    console.log(error, "ERROR_DETELE_CONSERVATION");
    return NextResponse.json(null);
  }
}
