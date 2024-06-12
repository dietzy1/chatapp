import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import RegisterForm from "./RegisterForm";
import useRandomEmoji from "@/hooks/useRandomEmoji";
import { User } from "@/types/user";
import AnimatedTooltip from "@/components/ui/animated-tooltip";
import useRegisterOpenStore from "@/stores/RegisterOpenStore";
import useLoginOpenStore from "@/stores/LoginOpenStore";

function RegisterDrawer() {
  const [selectedEmoji, getRandomEmoji] = useRandomEmoji();

  const { setOpen } = useRegisterOpenStore();
  const { setOpen: setLoginOpen } = useLoginOpenStore();

  const handleOpen = () => {
    setOpen(false);
    setLoginOpen(true);
  };

  return (
    <DrawerContent>
      <DrawerHeader className="text-left">
        <DrawerTitle>Sign up</DrawerTitle>
        <DrawerDescription>
          Come up with a username and select your avatar!
        </DrawerDescription>
      </DrawerHeader>

      <DrawerFooter className="pt-2">
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
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span className="underline" onClick={handleOpen}>
            Sign in
          </span>
        </div>
      </DrawerFooter>
    </DrawerContent>
  );
}

export default RegisterDrawer;
