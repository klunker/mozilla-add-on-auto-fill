import browser from 'webextension-polyfill';

browser.action.onClicked.addListener((tab) => {
  if (tab.id) {
    // Show temporary badge for visual feedback
    browser.action.setBadgeText({ text: 'FILL', tabId: tab.id });
    browser.action.setBadgeBackgroundColor({ color: '#3b82f6', tabId: tab.id });

    browser.tabs.sendMessage(tab.id, { action: 'fill_form' })
      .then(() => {
        browser.action.setBadgeText({ text: 'OK', tabId: tab.id });
        browser.action.setBadgeBackgroundColor({ color: '#10b981', tabId: tab.id });
      })
      .catch(() => {
        browser.action.setBadgeText({ text: 'ERR', tabId: tab.id });
        browser.action.setBadgeBackgroundColor({ color: '#ef4444', tabId: tab.id });
      })
      .finally(() => {
        setTimeout(() => {
          browser.action.setBadgeText({ text: '', tabId: tab.id });
        }, 1000);
      });
  }
});
