//Be careful with imports - something things seem to work, whereas others don't... Possibly to do with Rollup config?

import parseIngredients from "./parse-ingredients";
import parseMethod from "./parse-method";
import parseRecipeName from "./parse-recipe-name";
import type { SendToPopup } from "./types";

browser.runtime.onMessage.addListener((message): undefined => {
  if (isType<Record<"action", "scrapeHTML">>(message)) {
    const ingredients = parseIngredients();
    const method = parseMethod();
    const recipeName = parseRecipeName();
    const data: SendToPopup["data"] = {
      ingredients,
      method,
      metadata: { recipeName },
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
