import MessageHeader from "./MessageHeader";
//import { DotsVerticalIcon } from "@radix-ui/react-icons";
import MessageContent from "./MessageContent";
import { CompressedMessages } from "@/types/message";
import { User } from "@/types/user";
import timeFormatter from "./TimeFormatter";
import AnimatedTooltip from "@/components/ui/animated-tooltip";

//Message scenarios that I must take care of

//If multiple messages are sent by the same user after eachother in a timeframe then only a single avatar should be shown and messages should be grouped together.
//Next to the username the time of the message should be shown

//There must be a line shown that shows if a message happend today or yesterday or a week ago etc.
// ----january 25th 2021------

interface MessageLayoutProps {
  message: CompressedMessages;
  user: User;
  align: "left" | "right";
}

function MessageLayout({
  message,
  user,
  align,
}: MessageLayoutProps): JSX.Element {
  //If user ID is same as message ID then align = right
  //if user ID is not same as message ID then align = left

  const contents = message.message.map((message) => {
    console.log(message.content);

    return {
      kind: message.kind,
      content: message.content,
    };
  });

  //Not our users message
  if (align === "left") {
    return (
      <>
        <div className="my-8 flex  max-w-[400px] items-start gap-2.5">
          <div className="flex shrink-0">
            <AnimatedTooltip user={user} />
          </div>
          <div className="ml-3 flex flex-col gap-1">
            <MessageHeader
              username={user.username}
              timestamp={timeFormatter(message.message[0].createdAt)}
              align={align}
            />

            <MessageContent content={contents} align={align} />
          </div>
        </div>
      </>
    );
  }

  //Align right
  return (
    <div className="my-8 ml-auto flex  max-w-[400px] flex-row-reverse items-start  gap-2.5">
      <div className="flex shrink-0">
        <AnimatedTooltip user={user} />
      </div>
      <div className=" flex flex-col gap-1">
        <MessageHeader
          username={user.username}
          timestamp={timeFormatter(message.message[0].createdAt)}
          align={align}
        />

        <MessageContent content={contents} align={align} />
      </div>
    </div>
  );
}

export default MessageLayout;
