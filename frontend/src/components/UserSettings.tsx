import useWidthStore from "@/stores/widthStore";

function UserSettings() {
  const cardWidth = useWidthStore((state) => state.widths.rightbarWidth);
  console.log("Rightbar width", cardWidth);
  const style = cardWidth ? { width: `${cardWidth}px` } : {};
  return (
    <>
      <div
        style={style}
        className="flex  flex-row items-center justify-center space-x-2"
      ></div>
    </>
  );
}

export default UserSettings;
