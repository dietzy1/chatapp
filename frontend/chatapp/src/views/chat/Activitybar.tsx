import { Card } from "@/components/ui/card";

import Offline from "./activitybar/Offline";
import Online from "./activitybar/Online";
import ActivityHeader from "./activitybar/ActivityHeader";

interface ActivitybarProps {}

function Activitybar({}: ActivitybarProps) {
  const online = [1, 2, 3];
  const offline = [1, 2, 3];
  return (
    <>
      <aside className=" hidden space-y-4 sm:max-xl:flex xl:flex">
        {/* <Card className=""> */}
        <div className="rounded-lg bg-background">
          <ActivityHeader />
          <div className="p-2">
            <div className="pl-1.5">Online - 3</div>
            {online.map((user, i) => (
              <>
                <Online key={i} />
              </>
            ))}

            <div className="pl-1.5">Offline - 3</div>
            {offline.map((user, i) => (
              <>
                <Offline key={i} />
              </>
            ))}
          </div>
        </div>
        {/* </Card> */}
      </aside>
    </>
  );
}

export default Activitybar;
