function updateRichPresence(songName, artistName, timeMax, imageUrl) {
    var data = {
        song: songName,
        artist: artistName,
        timeMax: timeMax,
        imageUrl: imageUrl
    };

    const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      
      fetch("http://localhost:31373/", settings)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
      
}
chrome.runtime.onUpdateAvailable.addListener((details) =>
  chrome.runtime.reload()
);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.sendMessage(tabId, {
        message: 'send'
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    updateRichPresence(request.song, request.artist, request.timeMax, request.imageUrl)
});