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

function RegisterDrawer() {
  const [selectedEmoji, getRandomEmoji] = useRandomEmoji();

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
      </DrawerFooter>
    </DrawerContent>
  );
}

export default RegisterDrawer;
