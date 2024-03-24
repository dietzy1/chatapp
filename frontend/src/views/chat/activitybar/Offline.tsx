import UserAvatar from "@/components/UserAvatar";

function Offline() {
  const user = {
    name: "Bob Doe",
    icon: {
      link: "https://avatars.githubusercontent.com/u/60215086?v=4",
    },
  };

  return (
    <>
      <div className=" break-all">
        <div className="mb-2 flex flex-row items-center rounded-sm  hover:bg-muted">
          <div className="relative m-2">
            <UserAvatar />
            <div className="bg-customOrange z-2 absolute  bottom-0 right-0 rounded-full p-1.5 grayscale-0" />
          </div>
          <div className="text-gray-500 grayscale-[70%]"> {user?.name}</div>
        </div>
      </div>
    </>
  );
}

export default Offline;
