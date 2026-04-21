import browser from 'webextension-polyfill';

browser.action.onClicked.addListener((tab) => {
  if (tab.id) {
    console.log('[AutoFill Pro] Icon clicked, sending message to content script...');
    
    // Show temporary badge for visual feedback
    browser.action.setBadgeText({ text: 'FILL', tabId: tab.id });
    browser.action.setBadgeBackgroundColor({ color: '#3b82f6', tabId: tab.id });

    browser.tabs.sendMessage(tab.id, { action: 'fill_form' })
      .then(() => {
        console.log('[AutoFill Pro] Message sent successfully.');
        browser.action.setBadgeText({ text: 'OK', tabId: tab.id });
        browser.action.setBadgeBackgroundColor({ color: '#10b981', tabId: tab.id });
      })
      .catch((err) => {
        console.error('[AutoFill Pro] Failed to send message:', err);
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
