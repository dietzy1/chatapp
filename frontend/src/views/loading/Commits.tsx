import useGetMemes from "@/api/endpoints/meme/getMemes";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "@/components/ui/typewriter-effect";
import { GitCommitHorizontal } from "lucide-react";
import React from "react";
import { Timeline, TimelineItem } from "./Timeline";

interface WordObject {
  text: string;
}

function Commits() {
  const { data } = useGetMemes();

  function splitStringIntoWords(inputString: string): WordObject[] {
    const words: WordObject[] = [];
    const splitWords = inputString.split(" ");

    splitWords.forEach((word) => {
      words.push({ text: word });
    });

    return words;
  }

  return (
    <>
      <div className="flex w-full flex-row items-center justify-start">
        <GitCommitHorizontal size={32} />
        Commits on Jun 24, 2023
      </div>
      <Timeline>
        <div>hello</div>
        <TimelineItem>hello</TimelineItem>
        <TimelineItem>world</TimelineItem>
        <TimelineItem>world</TimelineItem>
      </Timeline>

      {data && data?.memes.length > 0 ? (
        <div className="text mt-10 font-sans  ">
          {data.memes.map((value, i) => (
            <React.Fragment key={i}>
              <TypewriterEffectSmooth words={splitStringIntoWords(value)} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Commits;
