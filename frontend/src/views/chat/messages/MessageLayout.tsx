import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import MessageHeader from "./MessageHeader";
//import { DotsVerticalIcon } from "@radix-ui/react-icons";
import MessageContent from "./MessageContent";

//Message scenarios that I must take care of

//If multiple messages are sent by the same user after eachother in a timeframe then only a single avatar should be shown and messages should be grouped together.
//Next to the username the time of the message should be shown

//There must be a line shown that shows if a message happend today or yesterday or a week ago etc.
// ----january 25th 2021------

interface MessageLayoutProps {
  align: "left" | "right";
}

function MessageLayout({ align }: MessageLayoutProps): JSX.Element {
  const item = {
    id: "1",
    name: "Bob",
    designation: "Developer",
    image:
      "https://emojiisland.com/cdn/shop/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036",
  };

  //Not our users message
  if (align === "left") {
    return (
      <>
        <div className="my-8 flex max-w-[400px] items-start gap-2.5">
          <div className="flex shrink-0">
            <AnimatedTooltip item={item} />
          </div>
          <div className="ml-3 flex flex-col gap-1">
            <MessageHeader
              username="Bob"
              timestamp="Today at 9:18PM"
              align={align}
            />

            <MessageContent
              content={[
                " That's awesome. I think our users will really appreciate the improvements. That's awesome. I think our users will really appreciatethe improvements. ",
                "hello second msg",
                "hellon third message which is alot longer than the other messages",
              ]}
              align={align}
            />
          </div>
        </div>
      </>
    );
  }

  //Align right
  return (
    <div className="my-8 ml-auto flex max-w-[400px] flex-row-reverse items-start  gap-2.5">
      <div className="flex shrink-0">
        <AnimatedTooltip item={item} />
      </div>
      <div className=" flex flex-col gap-1">
        <MessageHeader
          username="Bob"
          timestamp="Today at 9:18PM"
          align={align}
        />

        <MessageContent
          content={[
            " That's awesome. I think our users will really appreciate the improvements. That's awesome. I think our users will really appreciatethe improvements. ",
          ]}
          align={align}
        />
      </div>
    </div>
  );
}

export default MessageLayout;
