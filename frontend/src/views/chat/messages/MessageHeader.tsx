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
        <div className="flex items-end space-x-2">
          <div className="text-lg font-semibold leading-none">{username}</div>
          <div className="text-xs font-normal leading-none text-muted-foreground">
            {timestamp}
          </div>
        </div>
      </>
    );
  }

  //Align right
  return (
    <>
      <div className="flex flex-row-reverse items-end  space-x-2 space-x-reverse">
        <span className=" text-lg font-semibold leading-none">{username}</span>
        <span className="text-xs font-normal leading-none text-muted-foreground">
          {timestamp}
        </span>
      </div>
    </>
  );
}

export default MessageHeader;
