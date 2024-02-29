import MessageInput from "@/components/MessageInput";
import UserInformation from "@/components/UserInformation";
import UserSettings from "@/components/UserSettings";
import React from "react";

interface FooterProps {}

function Footer({}: FooterProps): JSX.Element {
  return (
    <>
      <footer className="flex h-20 flex-grow flex-row items-center  justify-center">
        <UserInformation />
        <MessageInput />
        <UserSettings />
      </footer>
    </>
  );
}

export default Footer;
