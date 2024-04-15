import AnimatedTooltip from "@/components/ui/animated-tooltip";
import { User } from "@/types/user";

interface OnlineProps {
  user: User;
}

function Online({ user }: OnlineProps) {
  return (
    <>
      <div className="mb-2 flex flex-row items-center gap-x-4 rounded-sm hover:bg-muted">
        <div className="relative m-2">
          <AnimatedTooltip user={user} online={true} />
        </div>
        <div className="text-foreground"> {user.username}</div>
      </div>
    </>
  );
}

export default Online;
