browser.webNavigation.onHistoryStateUpdated.addListener(history => {
    const url = new URL(history.url);
    if (!url.searchParams.get('v')) {
        // not a video
        return;
    }

    browser.tabs.sendMessage(history.tabId, {videoChanged: true});
},
    {url: [{urlMatches: '^https://www.youtube.com/watch\?'}]}
);

