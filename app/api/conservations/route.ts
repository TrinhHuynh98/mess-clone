import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { use } from "react";
import { pusherClient, pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConservation = await prisma?.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((item: { value: string }) => ({
                id: item.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConservation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conservation:new", newConservation);
        }
      });

      return NextResponse.json(newConservation);
    }

    const existingConservation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConservation = existingConservation[0];

    if (singleConservation) {
      return NextResponse.json(singleConservation);
    }

    const newConservation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConservation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conservation:new", newConservation);
      }
    });

    return NextResponse.json(newConservation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
