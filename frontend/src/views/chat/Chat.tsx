import Footer from "./Footer";
import Leftbar from "./Leftbar";

import useGetUsers from "@/api/endpoints/user/getUsers";
import useGetUser from "@/api/endpoints/user/getUser";
import Messages from "./Messages";
import Activitybar from "./Activitybar";
import useWidthStore from "@/stores/widthStore";
import { useEffect, useRef } from "react";

/* const user = useGetUser("");
const users = useGetUsers(""); */

function Chat(): JSX.Element {
  const setLeftbarWidth = useWidthStore((state) => state.setLeftbarWidth);
  const setMiddleWidth = useWidthStore((state) => state.setMiddleWidth);
  const setRightbarWidth = useWidthStore((state) => state.setRightbarWidth);

  const leftbarRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const rightbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidths = () => {
      if (leftbarRef.current) {
        setLeftbarWidth(leftbarRef.current.offsetWidth);
      }

      if (middleRef.current) {
        setMiddleWidth(middleRef.current.offsetWidth);
      }

      if (rightbarRef.current) {
        setRightbarWidth(rightbarRef.current.offsetWidth);
      }
    };

    updateWidths();

    window.addEventListener("resize", updateWidths);

    return () => {
      window.removeEventListener("resize", updateWidths);
    };
  }, [setLeftbarWidth, setMiddleWidth, setRightbarWidth]);

  return (
    <>
      <div className="flex h-screen flex-col p-2 pb-1 dark:bg-black">
        <div className="flex flex-grow flex-row space-x-2 ">
          {/* Calculate width for leftbar */}
          <div className="flex" ref={leftbarRef}>
            <Leftbar />
          </div>

          {/* Calculate width for middlebar */}
          <div className="flex flex-grow" ref={middleRef}>
            <Messages />
          </div>

          {/* Calculate width for rightbar */}
          <div className="flex" ref={rightbarRef}>
            <Activitybar />
          </div>
        </div>
        <div className="flex">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default Chat;
