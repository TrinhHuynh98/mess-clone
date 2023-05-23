import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

const getConversationById = async (conservationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }
    const conservation = await prisma.conversation.findUnique({
      where: {
        id: conservationId,
      },
      include: {
        users: true,
      },
    });
    return conservation;
  } catch (error) {
    return null;
  }
};

export default getConversationById;
