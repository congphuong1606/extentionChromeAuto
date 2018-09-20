chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action === "changeData") {
        console.log("changeData:");
        console.log(request.sellOffersPrice);
        console.log(request.buyOffersPrice);
    }
});