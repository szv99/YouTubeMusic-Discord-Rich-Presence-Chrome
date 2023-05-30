chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({
        response: "Message Received! (content)"
    });
	if(document.getElementsByClassName("byline style-scope ytmusic-player-bar complex-string")[0] != undefined) {
    sendMessage();
	}
});

var xpath = function (xpathToExecute) {
    var result = [];
    var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        result.push(nodesSnapshot.snapshotItem(i));
    }
    return result;
}

function sendMessage() {
	var songName = document.getElementsByClassName("title style-scope ytmusic-player-bar")[0].innerHTML;
    var artistName = document.getElementsByClassName("byline style-scope ytmusic-player-bar complex-string")[0].innerText;
    var time = document.getElementsByClassName("time-info style-scope ytmusic-player-bar")[0].innerText.toString().split('/')[1];
    var imageUrl = xpath("/html/body/ytmusic-app/ytmusic-app-layout/ytmusic-player-page/div/div[1]/ytmusic-player/div[1]/yt-img-shadow/img")[0].src
    if(imageUrl.startsWith('data:image')){
        imageUrl = xpath("/html/body/ytmusic-app/ytmusic-app-layout/ytmusic-player-bar/div[2]/div[1]/img")[0].src
    }
    chrome.runtime.sendMessage({
        song: songName,
        artist: artistName,
        timeMax: time,
        imageUrl: imageUrl
    });
}