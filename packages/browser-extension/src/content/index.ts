//Be careful with imports - something things seem to work, whereas others don't... Possibly to do with Rollup config?

import parseIngredients from "./parse-ingredients";
import parseMethod from "./parse-method";

browser.runtime.onMessage.addListener((message): undefined => {
  if (isType<Record<"action", "scrapeHTML">>(message)) {
    const ingredients = parseIngredients();
    const method = parseMethod();
    browser.runtime.sendMessage({
      action: "sendToPopup",
      data: { ingredients, method },
    });
  }
});

//Reused code, update in utils if changing here.
function isType<T>(message: unknown): message is T {
  return typeof message === "object" && message !== null && "action" in message;
}
