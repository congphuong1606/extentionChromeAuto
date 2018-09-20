let sellOffersPrice = [];
let buyOffersPrice = [];

function refreshTab() {
    chrome.tabs.query({}, function (tabs) {
        chrome.tabs.update(tabs[0].id, {url: 'https://remitano.com/eth/vn'});
    });
}

setInterval(function () {

    refreshTab()
    getDATA();
}, 30000);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDATA() {
    console.log('..........');
    await sleep(5000);
    chrome.tabs.query({}, function (tabs) {
        getDataFirstPage(tabs,1);
        chrome.tabs.executeScript(tabs[0].id, {"code":
                "document.getElementsByClassName('pagination-next')[0].firstChild.click();" +
                "document.getElementsByClassName('pagination-next')[1].firstChild.click();"},
            function (result) {
            console.log("Click:");
            console.log(result);
        });
    });
    await sleep(1000);
    chrome.tabs.query({}, function (tabs) {
        getDataFirstPage(tabs,2);
    });
    chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(tabs[1].id, {"code":
                "document.getElementById('bank_account_number').value = '"+sellOffersPrice[0].numberPrice+"';" +
                "document.getElementById('bank_account_name').value = '"+sellOffersPrice[0].userName+"';"

            },
            function (result) {
                console.log("ok");
            });
    });
}

function getDataFirstPage(tabs,index) {
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
        if(index===1){
            sellOffersPrice=[];
            buyOffersPrice=[];
        }
        console.log("result:");
        console.log(result);
        var data = result[0];
        console.log("data:");
        console.log(data);
        for (let i=0;i<10;i++){
            if(i<5){
                sellOffersPrice.push(data[i]);
            }else {
                buyOffersPrice.push(data[i]);
            }
        }
        console.log("sellOffersPrice:");
        console.log(sellOffersPrice);
        console.log("buyOffersPrice:");
        console.log(buyOffersPrice);
    });
}






