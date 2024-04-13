interface MessageHeaderProps {
  username: string;
  timestamp: string;
  align: "left" | "right";
}

function MessageHeader({
  username,
  timestamp,
  align,
}: MessageHeaderProps): JSX.Element {
  //We need to actually perform logic to the timestamp :)
  if (align === "left") {
    return (
      <>
        <div className="flex items-center space-x-2">
          <div className="text-lg font-semibold">{username}</div>
          <div className="text text-sm font-normal text-muted-foreground">
            {timestamp}
          </div>
        </div>
      </>
    );
  }

  //Align right
  return (
    <>
      <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
        <div className=" text-lg font-semibold">{username}</div>
        <div className="text text-sm font-normal text-muted-foreground">
          {timestamp}
        </div>
      </div>
    </>
  );
}

export default MessageHeader;
