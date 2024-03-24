import UserAvatar from "@/components/UserAvatar";

function RightMessage() {
  return (
    <>
      <div className=" flex  flex-row-reverse ">
        <UserAvatar />
        <div className="px-2">
          <div className="text-right text-lg">Bob</div>
          <div className=" ml-auto flex max-w-[90%] flex-col gap-2 rounded-lg bg-primary   box-decoration-clone  px-3 py-2 text-sm text-primary-foreground">
            I fuckking hate javascript
          </div>
        </div>
      </div>
    </>
  );
}

export default RightMessage;
