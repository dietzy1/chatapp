import MessageInput from "@/components/MessageInput";
import UserInformation from "@/components/UserInformation";
import UserSettings from "@/components/UserSettings";

//interface FooterProps {}

function Footer(): JSX.Element {
  return (
    <>
      <footer className="flex h-[10vh] flex-grow flex-row items-center justify-center">
        <UserInformation />
        <MessageInput />
        <UserSettings />
      </footer>
    </>
  );
}

export default Footer;
