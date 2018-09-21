let sellOffersPrice = [];
let buyOffersPrice = [];

let isAutoBuy = 1;
let isAutoSell = 2;
let isOff = 3;
let ACTION = 3;
localStorage.setItem('ACTIONgetSource1212', '3');
chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "getSource") {
        ACTION = request.source;
        localStorage.setItem('ACTIONgetSource1212', ACTION +'');
        chrome.runtime.sendMessage({
            action: "close",
            source: ACTION
        });
    }
});

function refreshTab() {
    chrome.tabs.query({}, function (tabs) {

        chrome.tabs.update(tabs[0].id, {url: 'https://remitano.com/eth/vn'});
        chrome.tabs.update(tabs[1].id, {url: 'https://remitano.com/eth/vn/offers/626716/edit'});


    });
}

setInterval(function () {
    if (ACTION !== isOff) {
        refreshTab();
        getDATA();
    }
}, 25000);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDATA() {
    console.log('..........');
    await sleep(10000);
    setupTab2();
    chrome.tabs.query({}, function (tabs) {
        getDataFirstPage(tabs, 1);
        chrome.tabs.executeScript(tabs[0].id, {
                "code":
                "document.getElementsByClassName('pagination-next')[0].firstChild.click();" +
                "document.getElementsByClassName('pagination-next')[1].firstChild.click();"
            },
            function (result) {
                console.log("page2 clicked");
            });
    });
    await sleep(1000);
    chrome.tabs.query({}, function (tabs) {
        getDataFirstPage(tabs, 2);
    });

}

async function setupTab2() {
    if (ACTION === isAutoBuy) {
        chrome.tabs.query({}, function (tabs) {
            chrome.tabs.executeScript(tabs[1].id, {
                    "code":
                        "document.getElementsByClassName('offer-type-buy')[0].firstChild.click();"
                },
                function (result) {
                    console.log("offer-type-buy clicked");
                });
        });
    }
    await sleep(500);
    chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(tabs[1].id, {
                "code":
                    "document.getElementsByClassName('btn-change')[0].click();"
            },
            function (result) {
                console.log("btn-change clicked");
            });
    });
}

function getDataFirstPage(tabs, index) {
    if (index === 1) {
        chrome.tabs.executeScript(tabs[0].id, {
                "code":
                    "document.getElementsByClassName('text-btc-color')[0].click()"
            },
            function (result) {
                console.log("offer-price clicked");
            });
    }
    chrome.tabs.executeScript(tabs[0].id, {
        "code":
        "function getData(){" +
        "             var res=[];" +
        "                var bodyDatas= document.getElementsByClassName('offer-body-meta');" +
        "                var users= document.getElementsByClassName('offer-item-username');" +
        "                 for(var i=0; i< bodyDatas.length ;i++){" +
        "           var data={" +
        "               numberPrice: bodyDatas[i].firstChild.innerText.split(' ')[0]," +
        "               maxPrice: bodyDatas[i].lastChild.innerText.split(' ')[2]," +
        "               userName: users[i].innerText" +
        "               };" +
        "                     res.push(data);" +
        "                    }" +
        "                return res;" +
        "            }" +
        "getData();"
    }, function (result) {
        if (index === 1) {
            sellOffersPrice = [];
            buyOffersPrice = [];
        }
        let data = result[0];
        for (let i = 0; i < 10; i++) {
            if (i < 5) {
                sellOffersPrice.push(data[i]);
            } else {
                buyOffersPrice.push(data[i]);
            }
        }
        if (index === 2) {
            console.log("sellOffersPrice:");
            console.log(sellOffersPrice);
            console.log("buyOffersPrice:");
            console.log(buyOffersPrice);
            let valueInput = ACTION === isAutoSell ? getNumberInput(buyOffersPrice) : getNumberInput(sellOffersPrice);
            const scriptCode = "document.getElementsByClassName('input-group')[0].firstChild.value=" + valueInput + ";";
            console.log(scriptCode);
            chrome.tabs.query({}, function (tabs) {
                chrome.tabs.executeScript(tabs[1].id, {"code": scriptCode},
                    function (result) {
                        console.log("ok input-group");
                        clickSave();
                    }
                );


            });
        }
    });
}

async function clickSave() {
    await sleep(2000);
    chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(tabs[1].id, {
                "code":
                    "document.getElementsByClassName('btn-save-offer')[0].click()"
            },
            function (result) {
                console.log("btn-save-offer clicked");
            });
    });

}


function getNumberInput(offersPrice) {
    let array1 = [];
    offersPrice.forEach(item => {
        array1.push(parseFloat(item.numberPrice.replace(",", ".")));
    });

    console.log("Math.max(...array1)");
    console.log(array1);
    let value = Math.max(...array1);
    if (ACTION === isAutoSell) {
        value = value - (value * 0.01);
    }
    if (ACTION === isAutoBuy) {
        value = value + (value * 0.01);
    }
    console.log(value);
    return value;
}