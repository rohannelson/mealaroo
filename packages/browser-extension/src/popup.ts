import type { SendToPopup } from "./content";

const scrapeButton = document.getElementById("scrapeButton");
scrapeButton?.addEventListener("click", async () => {
  console.log("clicked");
  const activeTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  const activeTabId = activeTab[0].id;
  if (activeTabId) {
    console.log("activeTabId: ", activeTabId);
    browser.tabs.sendMessage(activeTabId, { action: "scrapeHTML" });
  }
});

browser.runtime.onMessage.addListener((message: SendToPopup) => {
  if (message.action === "sendToPopup") {
    const resultDiv = document.getElementById("result");
    if (resultDiv) {
      resultDiv.innerHTML =
        "<ul>" +
        message.data.map((item) => `<li>${item}</li>`).join("") +
        "</ul>";
    }
  }
});
