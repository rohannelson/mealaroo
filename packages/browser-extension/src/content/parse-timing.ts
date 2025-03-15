//Find time text...

import findContainerElements from "./dom-queries/find-container-elements";
import type { Metadata } from "./types";

//Zoom out until find minutes or hours

//Parse minutes/hours into minutes

//If you can't find time text, search for an element that just has an amount of time.

//Title = string (optional - default 'time')

//minutes = number

export default function parseTiming(): Metadata["timing"] {
  const elements = document.querySelectorAll(
    "p, span, h2, h3, h4, h5, h6, div, li",
  ); //Have I missed any relevant elements?

  const timings = Array.from(elements)
    .filter((el): el is HTMLElement => el instanceof HTMLElement)
    .filter((el) => el.innerText.match(/time$/i));

  const timingContainers = findContainerElements(timings);

  //If you can't find any labels/containers, look directly for minutes / hour(s)

  return (
    timings
      .map((t, i) => {
        return {
          label: t.innerText,
          duration: parseDuration(timingContainers[i].innerText),
        };
      })
      //remove duplicates
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (v) => v.label === value.label && v.duration === value.duration,
          ),
      )
  );
}

function parseDuration(containerText: string) {
  const hoursRegex = /(\d+)\s*(?:hours?|hrs?)/;

  const minsRegex = /(\d+)?\s*(?:minutes?|mins?)/;

  const hoursMatch = containerText.trim().match(hoursRegex);
  const minsMatch = containerText.trim().match(minsRegex);
  // Extract hours and minutes, default to 0 if not found

  console.log("hoursMatch", hoursMatch ?? "none found");
  console.log("minsMatch", minsMatch ?? "none found");

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minsMatch ? parseInt(minsMatch[1], 10) : 0;
  console.log("hours", hours);
  console.log("minutes", minutes);

  // Calculate the total minutes
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}
