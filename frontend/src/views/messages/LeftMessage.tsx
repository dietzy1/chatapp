import UserAvatar from "@/components/UserAvatar";

//TODO: Add context menu component to it
function LeftMessage() {
  return (
    <>
      <section className=" flex flex-row ">
        <UserAvatar />
        <div className="px-2">
          <div className="inline-block text-lg">Bob</div>

          <div className="max-w-[90%] text-wrap break-words rounded-lg bg-muted px-3 py-2 text-sm">
            My name is bob and this is a message
          </div>
        </div>
      </section>
    </>
  );
}

export default LeftMessage;
