import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home as HomeIcon } from "lucide-react";

interface HomeProps {}

function Home({}: HomeProps): JSX.Element {
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
