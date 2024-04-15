interface MessageContentProps {
  content: string[];
  align: "left" | "right";
}

function MessageContent({ content, align }: MessageContentProps): JSX.Element {
  return (
    <>
      {content.map((msg, index) => {
        const isSingle = content.length === 1;
        const isLast = index === content.length - 1;
        const roundedClass = isSingle || isLast ? "rounded-b-xl" : " ";

        if (align === "left") {
          return (
            <div
              key={index}
              className={`mr-auto min-w-20 rounded-r-xl  ${roundedClass} border-muted bg-muted p-4`}
            >
              <p className=" text-sm font-normal ">{msg}</p>
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`ml-auto min-w-20 rounded-l-xl ${roundedClass} border-muted bg-muted p-4`}
          >
            <p className=" text-sm font-normal ">{msg}</p>
          </div>
        );
      })}
    </>
  );
}

export default MessageContent;
