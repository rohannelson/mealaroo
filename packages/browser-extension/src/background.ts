browser.action.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab?.id ?? 0, { action: "scrapeHTML" });
});
