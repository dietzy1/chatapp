import { staticEmojis } from "./emoteData";

const useFormatMessage = () => {
  function format(msg: string) {
    staticEmojis.forEach((emoji) => {
      const regex = new RegExp(
        `(^|\\W)${emoji.emote.code.toUpperCase()}(\\W|$)`,
        "g",
      );
      msg = msg.replace(
        regex,
        `<img className=" w-4" src="https://cdn.betterttv.net/emote/${emoji.emote.id}/1x" alt="${emoji.emote.code}" />`,
      );
    });

    return (
      <>
        <div
          className="flex flex-row flex-wrap"
          dangerouslySetInnerHTML={{
            __html: msg,
          }}
        />
      </>
    );
  }
  return {
    format,
  };
};

export default useFormatMessage;
