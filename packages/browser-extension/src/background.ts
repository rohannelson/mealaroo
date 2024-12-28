import type { SendToPopup } from "./content";

browser.action.onClicked.addListener((tab) => {
  if (tab.id) {
    browser.action.setPopup({ popup: "index.html", tabId: tab.id });
  }
});
browser.runtime.onMessage.addListener((message: SendToPopup) => {
  if (message.action === "sendToPopup") {
    browser.runtime.sendMessage({ action: "sendToPopup", data: message.data });
  }
});
