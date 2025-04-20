//Be careful with imports - something things seem to work, whereas others don't... Possibly to do with Rollup config?

import mergeAdjacentTextNodes from "./dom-mutations/merge-adjacent-text-nodes";
import removeCommentNodes from "./dom-mutations/strip-comments";
import findKeyNodes from "./dom-queries/find-key-nodes";
import parseDescription from "./parse-description";
import parseIngredients from "./parse-ingredients";
import parseMethod from "./parse-method";
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
    console.log("keyNodes", keyNodes);
    const ingredients = parseIngredients();
    const method = parseMethod();
    const recipeName = parseRecipeName();
    const description = parseDescription();
    const source = parseSource();
    const timing = parseTiming();
    const serves = parseServes();
    const data: SendToPopup["data"] = {
      ingredients,
      method,
      metadata: { recipeName, description, source, timing, serves },
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
