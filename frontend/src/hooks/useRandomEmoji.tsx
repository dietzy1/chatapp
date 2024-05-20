import { useState } from "react";

const emojis = [
  "😀",
  "😂",
  "🥰",
  "😎",
  "😢",
  "🤔",
  "😴",
  "🥳",
  "🤖",
  "👽",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😜",
  "😝",
  "🤑",
  "🤗",
  "🤭",
  "🤫",
  "🤥",
  "😶",
  "😐",
  "😑",
  "😬",
  "🙄",
  "😯",
  "😦",
  "😧",
  "😮",
  "😲",
  "😵",
  "😳",
  "🥺",
  "😠",
];

const useRandomEmoji = (): [string, () => void] => {
  const getRandomIndex = (currentIndex: number): number => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * emojis.length);
    } while (newIndex === currentIndex);
    return newIndex;
  };

  const initialIndex = getRandomIndex(-1); // Start with an index that is out of bounds to ensure initial selection
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const getRandomEmoji = (): void => {
    const newIndex = getRandomIndex(selectedIndex);
    setSelectedIndex(newIndex);
  };

  return [emojis[selectedIndex], getRandomEmoji];
};

export default useRandomEmoji;
