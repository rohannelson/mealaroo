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

  //TODO - If you can't find any labels/containers, look directly for minutes / hour(s)

  const labelMatchers = {
    prepTime: /prep(aration)?/i,
    cookTime: /cook(ing)?/i,
    totalTime: /total/i,
  };

  const rawTimings = timings
    .map((t, i) => {
      return {
        label: t.innerText,
        duration: parseDuration(timingContainers[i].innerText),
      };
    })
    // Remove duplicates
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (v) => v.label === value.label && v.duration === value.duration,
        ),
    );

  // Initialize result
  const result: Metadata["timing"] = {
    prepTime: undefined,
    cookTime: undefined,
    totalTime: undefined,
  };

  // Assign to appropriate fields
  for (const timing of rawTimings) {
    for (const key of Object.keys(
      labelMatchers,
    ) as (keyof Metadata["timing"])[]) {
      if (labelMatchers[key].test(timing.label)) {
        result[key] = timing.duration;
      }
    }
  }

  return result;
}

function parseDuration(containerText: string) {
  const hoursRegex = /(\d+)\s*(?:hours?|hrs?)/;

  const minsRegex = /(\d+)?\s*(?:minutes?|mins?)/;

  const hoursMatch = containerText.trim().match(hoursRegex);
  const minsMatch = containerText.trim().match(minsRegex);

  // Extract hours and minutes, default to 0 if not found
  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minsMatch ? parseInt(minsMatch[1], 10) : 0;

  // Calculate the total minutes
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}
