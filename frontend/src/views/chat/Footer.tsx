import MessageInput from "@/components/MessageInput";
import UserInformation from "@/components/UserInformation";
import UserSettings from "@/components/UserSettings";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGetAuth from "@/api/endpoints/auth/getAuth";
import { useState } from "react";
import RegisterDialog from "../authentication/RegisterDialog";

//interface FooterProps {}

function Footer(): JSX.Element {
  const { data } = useGetAuth();

  const [open, setOpen] = useState(false);

  //If we are not logged in then we display the example and create account button instead
  if (!data?.userId) {
    return (
      <>
        <footer className="flex h-[10vh]  flex-grow flex-row items-center justify-center">
          <RegisterDialog open={open} setOpen={setOpen} />
          <div className="flex h-[6vh] min-h-16 w-full flex-row justify-between bg-gradient-to-r from-orange-500 to-yellow-600 px-4">
            <div className="flex flex-col justify-center">
              <span className="text-lg font-semibold tracking-widest">
                Try it out!
              </span>
              <span>
                Signing up only requires you to come up with a username.
              </span>
            </div>

            <Button
              className="my-auto transform rounded-full bg-secondary-foreground px-12 py-6 font-bold uppercase tracking-widest transition-colors  duration-200 hover:scale-105 hover:bg-orange-600 dark:text-black "
              asChild
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center justify-center">
                Sign up
                <ArrowRightIcon className="h-6 w-6" />
              </div>
            </Button>
          </div>
        </footer>
      </>
    );
  }

  return (
    <>
      <footer className="flex h-[10vh] flex-grow flex-row items-center justify-center">
        <UserInformation />
        <MessageInput />
        <UserSettings />
      </footer>
    </>
  );
}

export default Footer;
