interface MessageContents {
  kind: string;
  content: string;
}

interface MessageContentProps {
  content: MessageContents[];

  align: "left" | "right";
}

function MessageContent({ content, align }: MessageContentProps): JSX.Element {
  return (
    <>
      {content.map((msg, index) => {
        const isSingle = content.length === 1;
        const isLast = index === content.length - 1;
        const roundedClass = isSingle || isLast ? "rounded-b-xl" : " ";

        if (align === "left" && msg.kind === "MESSAGE") {
          return (
            <div
              key={index}
              className={`mr-auto min-w-10 rounded-r-xl  ${roundedClass} border-muted bg-muted p-4`}
            >
              <p className=" text-sm font-normal ">{msg.content}</p>
            </div>
          );
        }

        if (align === "left" && msg.kind === "GIF") {
          return (
            <img
              key={index}
              src={msg.content}
              alt="gif"
              className="rounded-xl"
            />
          );
        }

        if (msg.kind === "GIF" && align === "right") {
          return (
            <img
              key={index}
              src={msg.content}
              alt="gif"
              className="rounded-xl"
            />
          );
        }

        return (
          <div
            key={index}
            className={`ml-auto min-w-10 rounded-l-xl text-right ${roundedClass} border-muted bg-muted p-4`}
          >
            <p className=" text-sm font-normal ">{msg.content}</p>
          </div>
        );
      })}
    </>
  );
}

export default MessageContent;
