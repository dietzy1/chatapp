import Offline from "./activitybar/Offline";
import Online from "./activitybar/Online";
import ActivityHeader from "./activitybar/ActivityHeader";
import { useRef } from "react";
import useUpdateWidth from "@/hooks/useUpdateWidth";
import React from "react";
import useGetUsers from "@/api/endpoints/user/getUsers";

function ActivityContainer() {
  const offline = [11, 12, 13, 14, 15];

  const rightbarRef = useRef<HTMLDivElement>(null);
  useUpdateWidth(rightbarRef, "rightbarWidth");

  const { data, isLoading, error } = useGetUsers();
  console.log(data?.users);

  //We need to create custom hooks which takes in the users and then sorts them into online and offline
  //Its dependant on the websocket connection sending the activity //TODO:

  return (
    <>
      <div
        ref={rightbarRef}
        className="hidden  h-[90vh] flex-col rounded-lg bg-background lg:flex"
      >
        <ActivityHeader />
        <div className="flex flex-col overflow-y-auto  p-2 ">
          <div className="pl-1.5">Online - {data?.users.length}</div>
          {data?.users.map((value) => (
            <React.Fragment key={value.userId}>
              <Online user={value} />
            </React.Fragment>
          ))}

          <div className="pl-1.5">Offline - 0</div>
          {offline.map((_, i) => (
            <React.Fragment key={i}>{/* <Offline /> */}</React.Fragment>
          ))}
        </div>
        {/*   </div> */}
      </div>
    </>
  );
}

export default ActivityContainer;
