import useGetMemes from "@/api/endpoints/meme/getMemes";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

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
      <div className="flex w-96 flex-col">
        {data && data?.memes.length > 0 ? (
          <>
            {data.memes.map((value, i) => (
              <React.Fragment key={i}>
                <Timeline>
                  <TimelineItem>
                    <TypewriterEffectSmooth
                      words={splitStringIntoWords(value)}
                    />
                  </TimelineItem>
                </Timeline>
              </React.Fragment>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Commits;
