interface MessageDeviderProps {
  timestamp: string;
}

function MessageDevider({ timestamp }: MessageDeviderProps): JSX.Element {
  return (
    <div className="mx-4 flex items-center">
      <div className="h-px flex-grow bg-muted "></div>
      <div className="px-4  text-muted-foreground ">{timestamp}</div>
      <div className=" h-px flex-grow bg-muted "></div>
    </div>
  );
}

export default MessageDevider;
