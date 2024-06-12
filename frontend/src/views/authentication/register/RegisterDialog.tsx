import AnimatedTooltip from "@/components/ui/animated-tooltip";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useRandomEmoji from "@/hooks/useRandomEmoji";
import { User } from "@/types/user";
import RegisterForm from "./RegisterForm";
import useRegisterOpenStore from "@/stores/RegisterOpenStore";
import useLoginOpenStore from "@/stores/LoginOpenStore";

function RegisterDialog() {
  const [selectedEmoji, getRandomEmoji] = useRandomEmoji();

  const { setOpen } = useRegisterOpenStore();
  const { setOpen: setLoginOpen } = useLoginOpenStore();

  const handleOpen = () => {
    setOpen(false);
    setLoginOpen(true);
  };

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

      <RegisterForm selectedEmoji={selectedEmoji} />
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <span className="underline" onClick={handleOpen}>
          Sign in
        </span>
      </div>
    </DialogContent>
  );
}

export default RegisterDialog;
