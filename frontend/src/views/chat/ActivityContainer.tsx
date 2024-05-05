import Offline from "./activitybar/Offline";
import Online from "./activitybar/Online";
import ActivityHeader from "./activitybar/ActivityHeader";
import { useRef } from "react";
import useUpdateWidth from "@/hooks/useUpdateWidth";
import React from "react";
import useGetUsers from "@/api/endpoints/user/getUsers";
import useActivityStore from "@/stores/activityStore";
import ActivityLoading from "./activitybar/ActivityLoading";

function ActivityContainer() {
  const rightbarRef = useRef<HTMLDivElement>(null);
  useUpdateWidth(rightbarRef, "rightbarWidth");

  const { data, isLoading, error } = useGetUsers();
  const { activity } = useActivityStore();

  const online = data?.users.filter((user) => activity.includes(user.userId));

  const offline = data?.users.filter((user) => !activity.includes(user.userId));

  const authenticated = false;

  return (
    <>
      <div
        ref={rightbarRef}
        className="hidden  h-[90vh] flex-col rounded-lg bg-background lg:flex"
      >
        <ActivityHeader />
        <div className="flex flex-col overflow-y-auto  p-2">
          <div className="mt-5 pl-1.5 tracking-widest ">
            Online - {online?.length || 0}{" "}
          </div>

          {isLoading || !authenticated || (error && <ActivityLoading />)}
          {!authenticated && <ActivityLoading />}

          {online?.map((value) => (
            <React.Fragment key={value.userId}>
              <Online user={value} />
            </React.Fragment>
          ))}

          <div className="pl-1.5 tracking-widest ">
            Offline - {offline?.length || 0}
          </div>
          {isLoading || (error && <ActivityLoading />)}
          {!authenticated && <ActivityLoading />}
          {offline?.map((value) => (
            <React.Fragment key={value.userId}>
              {<Offline user={value} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default ActivityContainer;
