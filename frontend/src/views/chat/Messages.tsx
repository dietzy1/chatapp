import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import useFormatMessage from "@/hooks/useFormatMessage";
import React, { useEffect, useRef } from "react";
import LeftMessage from "../messages/LeftMessage";
import RightMessage from "../messages/RightMessage";
import Header from "@/components/Header";
import useWidthStore from "@/stores/widthStore";

interface MessagesProps {}

function Messages({}: MessagesProps): JSX.Element {
  const { format } = useFormatMessage();

  /*   const cardRef = useRef<HTMLDivElement>(null);
  const setCardWidth = useWidthStore((state) => state.setCardWidth);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    updateCardWidth();

    window.addEventListener("resize", updateCardWidth);

    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, [setCardWidth]);
 */
  return (
    <>
      <main className="flex flex-grow flex-col ">
        <div className="flex flex-grow flex-col rounded-lg bg-background">
          {/*  <Card  className="flex flex-grow flex-col"> */}
          <Header />

          <div className="flex flex-col px-10 pt-10">
            {/*The plan is probaly to create a bunch of different components dictating what kind of msg shows up*/}
            <LeftMessage />
            <RightMessage />
          </div>
          {/* </Card> */}
        </div>
      </main>
    </>
  );
}

export default Messages;
