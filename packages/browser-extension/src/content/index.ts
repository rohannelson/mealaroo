//Be careful with imports - something things seem to work, whereas others don't... Possibly to do with Rollup config?

import mergeAdjacentTextNodes from "./dom-mutations/merge-adjacent-text-nodes";
import removeCommentNodes from "./dom-mutations/strip-comments";
import findKeyNodes from "./dom-queries/find-key-nodes";
import parseDescription from "./parse-description";
import parseImage from "./parse-image";
import parseIngredients from "./parse-ingredients";
import parseMethod from "./parse-method";
import parseNotes from "./parse-notes";
import parseRecipeName from "./parse-recipe-name";
import parseServes from "./parse-serves";
import parseSource from "./parse-source";
import parseTiming from "./parse-timing";
import type { SendToPopup } from "./types";

browser.runtime.onMessage.addListener((message): undefined => {
  if (isType<Record<"action", "scrapeHTML">>(message)) {
    const body = document.body;
    removeCommentNodes([body]);
    mergeAdjacentTextNodes([body]);
    const keyNodes = findKeyNodes([document.body]);

    const ingredients = parseIngredients();
    const method = parseMethod();
    const notes = parseNotes();
    const recipeName = parseRecipeName();
    const description = parseDescription();
    const source = parseSource();
    const timing = parseTiming();
    const serves = parseServes(keyNodes);
    const imageUrl = parseImage();
    const data: SendToPopup["data"] = {
      ingredients,
      method,
      notes,
      metadata: { recipeName, description, source, timing, serves, imageUrl },
    };
    browser.runtime.sendMessage({
      action: "sendToPopup",
      data,
    });
  }
});

//Reused code, update in utils if changing here.
function isType<T>(message: unknown): message is T {
  return typeof message === "object" && message !== null && "action" in message;
}
