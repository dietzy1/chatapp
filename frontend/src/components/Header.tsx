import { Separator } from "@/components/ui/separator";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";
import { HashIcon, ArrowLeft, ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";

function Header(): JSX.Element {
  const { selectedChannel } = useSelectedChatroomStore();

  const isAuthenticated = false;

  return (
    <>
      <div className="flex flex-col">
        <div className="items flex h-16 items-center justify-between">
          <div className="flex items-center tracking-widest ">
            <ArrowLeft
              className="ml-6 mr-2 flex h-8 w-8 text-foreground sm:hidden"
              onClick={() => {
                console.log("arrowclicking");
              }}
            />
            <HashIcon className="ml-6 mr-2 h-8 w-8  text-muted " />
            {selectedChannel?.name || "General"}
          </div>

          {!isAuthenticated && (
            <>
              <div className="mr-4 flex items-center gap-x-6">
                <span className="transform tracking-widest  transition-colors duration-200 hover:scale-105 hover:text-primary ">
                  Sign up
                </span>

                <Button
                  className="my-auto transform rounded-full bg-secondary-foreground px-12 py-6 font-bold uppercase tracking-widest transition-colors  duration-200 hover:scale-105 hover:bg-orange-600 dark:text-black "
                  asChild
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
