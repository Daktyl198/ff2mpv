function ff2mpv(url) {
    browser.tabs.executeScript({
        code: `window.location = "ytb://` + url + `";`
    });
}

browser.contextMenus.create({
    id: "ff2mpv",
    title: "Play in MPV",
    contexts: ["link", "image", "video", "audio", "selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "ff2mpv":
            /* These should be mutually exclusive, but,
               if they aren't, this is a reasonable priority.
            */
            url = info.linkUrl || info.srcUrl || info.selectionText;
            if (url) ff2mpv(url);
            break;
    }
});

browser.browserAction.onClicked.addListener((tab) => {
    ff2mpv(tab.url);
});
