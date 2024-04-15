import AnimatedTooltip from "@/components/ui/animated-tooltip";
import { User } from "@/types/user";

interface OfflineProps {
  user: User;
}

function Offline({ user }: OfflineProps) {
  return (
    <>
      <div className="mb-2 flex flex-row items-center gap-x-4 rounded-sm hover:bg-muted">
        <div className="relative m-2">
          <AnimatedTooltip user={user} online={false} />
        </div>
        <div className="text-foreground"> {user.username}</div>
      </div>
    </>
  );
}

export default Offline;
