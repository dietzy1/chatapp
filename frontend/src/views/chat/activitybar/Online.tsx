import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { User } from "@/types/user";

interface OnlineProps {
  user: User;
}

function Online({ user }: OnlineProps) {
  const item = {
    id: user.userId,
    name: user.username,
    designation: user.description,
    image: user.icon.link,
    online: true,
  };

  return (
    <>
      <div className="mb-2 flex flex-row items-center gap-x-4 rounded-sm hover:bg-muted">
        <div className="relative m-2">
          <AnimatedTooltip item={item} />
        </div>
        <div className="text-foreground"> {user.username}</div>
      </div>
    </>
  );
}

export default Online;
