import { Separator } from "@/components/ui/separator";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";
import { HashIcon, ArrowLeft } from "lucide-react";

function Header(): JSX.Element {
  //Stuff the header should show the current channel to the left

  const { selectedChannel } = useSelectedChatroomStore();

  return (
    <>
      <div className="flex flex-col">
        <div className="items flex h-16 items-center">
          <ArrowLeft
            className="ml-6 mr-2 flex h-8 w-8 text-foreground sm:hidden"
            onClick={() => {
              console.log("arrowclicking");
            }}
          />
          <HashIcon className="ml-6 mr-2 h-8 w-8 text-muted" />
          {selectedChannel?.name}
        </div>
        <Separator className="mx-auto w-[99%]" />
      </div>
    </>
  );
}

export default Header;
