import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useIsMobile from "@/hooks/useIsMobile";
import { Home as HomeIcon } from "lucide-react";

function Home(): JSX.Element {
  useIsMobile();
  return (
    <>
      <Tooltip>
        <TooltipTrigger className="mx-auto flex items-center justify-center  rounded-sm p-1.5 ">
          <div className="flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted ">
            <HomeIcon size={24} />
          </div>

          <TooltipContent side="right">
            <p>Home</p>
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </>
  );
}

export default Home;
