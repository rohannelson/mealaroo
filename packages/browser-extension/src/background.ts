import type { SendToPopup } from "./content";
import browser from "webextension-polyfill";
import { isType } from "./utils";

browser.action.onClicked.addListener((tab) => {
  if (tab.id) {
    browser.action.setPopup({ popup: "index.html", tabId: tab.id });
  }
});
browser.runtime.onMessage.addListener((message): undefined => {
  if (isType<SendToPopup>(message)) {
    browser.runtime.sendMessage({
      action: "sendToPopup",
      data: message.data,
    });
  }
  return;
});
