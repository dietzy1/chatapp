import UserAvatar from "@/components/UserAvatar";
import { User } from "@/types/user";

interface OnlineProps {
  user: User;
}

function Online({ user }: OnlineProps) {
  return (
    <>
      <div className="break-all">
        <div className="mb-2 flex flex-row items-center rounded-sm hover:bg-muted">
          <div className="relative m-2">
            <UserAvatar src={user.icon.link} />
            <div className="z-2 absolute bottom-0  right-0 rounded-full bg-green-500 p-1.5" />
          </div>
          <div className="text-gray-500"> {user.username}</div>
        </div>
      </div>
    </>
  );
}

export default Online;
