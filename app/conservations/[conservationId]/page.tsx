import getConversationById from "@/app/actions/getConservationById";
import getMessage from "@/app/actions/getMesseges";
import EmptyState from "@/app/components/EmptyState";
import Content from "./components/Content";
import Form from "./components/Form";
import Header from "./components/Header";

interface IParams {
  conservationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conservation = await getConversationById(params.conservationId);
  const messages = await getMessage(params.conservationId);
  if (!conservation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conservation={conservation} />
        <Content initialMessage={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ChatId;
