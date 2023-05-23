import prisma from "@/app/libs/prismadb";

const getMessage = async (conservationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conservationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    return [];
  }
};

export default getMessage;
