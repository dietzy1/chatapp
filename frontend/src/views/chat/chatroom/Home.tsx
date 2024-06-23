import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home as HomeIcon } from "lucide-react";

interface HomeProps {
  expanded: boolean;
}

function Home({ expanded }: HomeProps): JSX.Element {
  if (expanded) {
    return (
      <>
        <div className="mx-auto flex min-w-72 items-center  justify-start rounded-sm p-1.5">
          <div className="flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted ">
            <HomeIcon size={24} />
          </div>
          <div className=" tracking-widest">Home</div>
        </div>
      </>
    );
  }

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
