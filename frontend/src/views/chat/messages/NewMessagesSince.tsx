interface NewMessagesSinceProps {
  amount: number;
  date: string;
}

function NewMessagesSince({
  amount,
  date,
}: NewMessagesSinceProps): JSX.Element {
  return (
    <div className="absolute flex h-12 w-full items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-white">
          {amount} new messages since {date}
        </span>
      </div>
    </div>
  );
}
export default NewMessagesSince;
