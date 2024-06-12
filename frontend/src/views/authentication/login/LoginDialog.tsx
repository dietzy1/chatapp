import AnimatedTooltip from "@/components/ui/animated-tooltip";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useRandomEmoji from "@/hooks/useRandomEmoji";
import { User } from "@/types/user";
import LoginForm from "./LoginForm";

function LoginDialog() {
  const [selectedEmoji, getRandomEmoji] = useRandomEmoji();

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign up</DialogTitle>
        <DialogDescription>
          Come up with a username and select your avatar!
        </DialogDescription>
      </DialogHeader>

      <div className="mt-8 flex justify-center border-b pb-4">
        <AnimatedTooltip
          classname="h-24 w-24"
          onClick={getRandomEmoji}
          user={
            {
              username: "Bob",
              iconSrc: `https://emojicdn.elk.sh/${selectedEmoji}`,
            } as User
          }
        />
      </div>

      <LoginForm />
    </DialogContent>
  );
}

export default LoginDialog;
