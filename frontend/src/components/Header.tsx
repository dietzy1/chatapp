import { Separator } from "@/components/ui/separator";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";
import { HashIcon, ArrowLeft, ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import useGetAuth from "@/api/endpoints/auth/getAuth";
import useIsMobile from "@/hooks/useIsMobile";
import useRegisterOpenStore from "@/stores/RegisterOpenStore";
import useLoginOpenStore from "@/stores/LoginOpenStore";
import Login from "@/views/authentication/Login";

function Header(): JSX.Element {
  const { selectedChannel } = useSelectedChatroomStore();

  const { data } = useGetAuth();
  const isMobile = useIsMobile();
  const { setOpen: setRegisterOpen } = useRegisterOpenStore();
  const { open, setOpen: setLoginOpen } = useLoginOpenStore();

  return (
    <>
      <div className="flex flex-col">
        <Login open={open} setOpen={setLoginOpen} />
        <div className="items flex h-16 items-center justify-between">
          <div className="flex items-center tracking-widest ">
            {isMobile && data?.userId && (
              <ArrowLeft
                className="ml-6 mr-2 flex h-8 w-8 text-foreground sm:hidden"
                onClick={() => {
                  console.log("arrowclicking");
                }}
              />
            )}
            {data?.userId && (
              <div className="flex items-center">
                <HashIcon className="ml-6 mr-2 h-8 w-8  text-muted " />
                {selectedChannel?.name || "General"}
              </div>
            )}

            {!data?.userId && !isMobile && (
              <div className="flex items-center">
                <HashIcon className="ml-6 mr-2 h-8 w-8  text-muted " />
                {selectedChannel?.name || "General"}
              </div>
            )}
          </div>

          {!data?.userId && (
            <>
              <div className="ml-auto mr-4 flex items-center gap-x-6">
                <span
                  className="transform tracking-widest  transition-colors duration-200 hover:scale-105 hover:text-primary "
                  onClick={() => {
                    setRegisterOpen(true);
                  }}
                >
                  Sign up
                </span>

                <Button
                  className="my-auto transform rounded-full bg-secondary-foreground px-12 py-6 font-bold uppercase tracking-widest transition-colors  duration-200 hover:scale-105 hover:bg-orange-600 dark:text-black "
                  asChild
                  onClick={() => {
                    setLoginOpen(true);
                  }}
                >
                  <div className="flex items-center justify-center">
                    Log in
                    <ArrowRightIcon className="h-6 w-6" />
                  </div>
                </Button>
              </div>
            </>
          )}
        </div>
        <Separator className="mx-auto w-[99%]" />
      </div>
    </>
  );
}

export default Header;
