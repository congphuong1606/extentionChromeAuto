let sellOffersPrice = [];
let buyOffersPrice = [];
const TYPE_TOOL = 'eth';
let isAutoBuy = 1;
let isAutoSell = 2;
let isOff = 3;
let ACTION = 3;
let IDAD_MUA = "";
let IDAD_BAN = "";
let MAX = 21000;
let MIN = 24000;
let ignoreBanToiDa = 0;
let ignoreMuaToiDa = 0;
let userFolowMua = '';
let userFolowBan = '';
let scriptCodeInput = '';
let araybuyTam = [];
let araySellTam = [];
let timeDUR = 7;
let bamBangGiaNguoiBan = 'uncheck';
let bamBangGiaNguoiMua = 'uncheck';
let timeUpdateMUA = Date.now();
let timeUpdateBan = Date.now();
localStorage.setItem('ACTION', '3');
localStorage.setItem('MAX', 21000 + '');
localStorage.setItem('MIN', 24000 + '');
localStorage.setItem('ignoreBanToiDa', '0');
localStorage.setItem('ignoreMuaToiDa', '0');
localStorage.setItem('userFolowMua', '');
localStorage.setItem('userFolowBan', '');
localStorage.setItem('timeDUR', '7');
localStorage.setItem('bamBangGiaNguoiBan', 'uncheck');
localStorage.setItem('bamBangGiaNguoiMua', 'uncheck');
localStorage.setItem('IDAD_MUA', '');
localStorage.setItem('IDAD_BAN', '');
let flag = 0;

let getDataSuccess = false;
let getDataSuccessMua = false;
let getDataSuccessBan = false;

let idTabMua = '';
let idTabBan = '';
let idTabData = '';
let ACTION_Befo = 3;

function creatNewTab(url, type) {
    console.log(url);
    chrome.tabs.create({
        url: url,
        "pinned": true
    }, function (tab) {
        tab.highlighted = true;
        tab.pinned = true;
        switch (type) {
            case 'idTabData':
                idTabData = tab.id;
                break;
            case 'idTabMua':
                idTabMua = tab.id;
                break;
            case 'idTabBan':
                idTabBan = tab.id;
                break;

        }

        if (ACTION === 1 && idTabMua !== '') {
            if (ACTION_Befo === 3) {
                getDataSuccess = true;
                getDataSuccessMua = true;
            }
            if (ACTION_Befo === 2) {
                getDataSuccessMua = true;
            }
            if (ACTION_Befo === 4) {
                getDataSuccessBan = false;
            }
            ACTION_Befo = 1;
        }
        if (ACTION === 2 && idTabBan !== '') {
            if (ACTION_Befo === 3) {
                getDataSuccess = true;
                getDataSuccessBan = true;
            }
            if (ACTION_Befo === 1) {
                getDataSuccessBan = true;
            }
            if (ACTION_Befo === 4) {
                getDataSuccessMua = false;
            }
            ACTION_Befo = 2;
        }
        if (ACTION === 4 && idTabMua !== '' && idTabBan !== '') {
            if (ACTION_Befo === 3) {
                getDataSuccess = true;
                getDataSuccessBan = true;
                getDataSuccessMua = true;
            }
            if (ACTION_Befo === 1) {
                getDataSuccessBan = true;
            }
            if (ACTION_Befo === 2) {
                getDataSuccessMua = true;
            }
            ACTION_Befo = 4;
        }
    });
}


async function setupTabFirsTime() {
    if (ACTION !== 3 && idTabData === '') {
        creatNewTab('https://remitano.com/' + TYPE_TOOL + '/vn', 'idTabData');
    }
    if (ACTION === 1 && idTabMua === '') {
        creatNewTab('https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_MUA + '/edit', 'idTabMua');
    }
    if (ACTION === 2 && idTabBan === '') {
        creatNewTab('https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_BAN + '/edit', 'idTabBan');
    }
    if (ACTION === 4) {
        if (idTabMua === '')
            creatNewTab('https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_MUA + '/edit', 'idTabMua');
        if (idTabBan === '')
            creatNewTab('https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_BAN + '/edit', 'idTabBan');
    }

}

async function closeTab(number) {
    console.log(idTabData);
    console.log(idTabMua);
    console.log(idTabBan);
    await sleep(timeDUR * 1000);
    switch (number) {
        case 1:
            if (idTabData !== '') {
                chrome.tabs.remove(idTabData);

                idTabData = '';
            }
            break;
        case 2:
            if (idTabMua !== '') {
                chrome.tabs.remove(idTabMua);
                idTabMua = '';
            }
            break;
        case 3:
            if (idTabBan !== '') {
                chrome.tabs.remove(idTabBan);
                idTabBan = '';
            }

    }


}

chrome.runtime.onMessage.addListener(function (request, sender) {
    /* if (request.action === "getSource") {
         ACTION = parseInt(request.source.split(".")[0]);
         console.log(request);
         console.log(request);
         tabDataID = request.tabDataID;
         tabMuaID = request.tabMuaID;
         tabBanID = request.tabBanID;
         MAX = request.max;
         MIN = request.min;
         NUMBER_STAMP = request.NUMBER_STAMP;
         userFolow = request.userFolow;
         infoAdURL = request.infoAdURL;
         IDAD_BAN = request.IDAD_BAN;
         IDAD_MUA = request.IDAD_MUA;
         bamBangGia = request.bamBangGia;
         timeDUR = request.timeDUR;
         console.log(timeDUR);
         flag = 0;
         urlTab1 = 'https://remitano.com/eth/vn';
         ID = request.source.split(".")[1];
         localStorage.setItem('ACTIONgetSource1212', ACTION + '');
         localStorage.setItem('timeDUR', timeDUR + '');
         localStorage.setItem('IDAD_BAN', tabBanID + '');
         localStorage.setItem('IDAD_MUA', tabMuaID + '');
         localStorage.setItem('bamBangGia', bamBangGia + '');
         localStorage.setItem('MAX', MAX + '');
         localStorage.setItem('MIN', MIN + '');
         localStorage.setItem('NUMBER_STAMP', NUMBER_STAMP + '');
         localStorage.setItem('userFolow', userFolow + '');
         localStorage.setItem('IDgetSource1212', ID + '');
         /!*chrome.runtime.sendMessage({
             action: "close",
             source: ACTION
         });*!/
         if (ACTION === isAutoSell) {
             valueTam = MIN;
         }
         if (ACTION === isAutoSell) {
             valueTam = MAX;
         }


     }*/
    if (request.action === 'off') {
        ACTION = request.value;
        closeTab(1);
        closeTab(2);
        closeTab(3);
        getDataSuccess = false;
        getDataSuccessBan = false;
        getDataSuccessMua = false;
        localStorage.setItem('ACTION', ACTION + '');

        IDAD_MUA = '';
        IDAD_BAN = '';
        ignoreBanToiDa = '';
        ignoreMuaToiDa = '';
        userFolowBan = '';
        userFolowMua = '';
        timeDUR = '';
        MAX = '';
        MIN = '';
        bamBangGiaNguoiMua = '';
        bamBangGiaNguoiBan = '';
        chrome.runtime.sendMessage({
            action: "close",
            source: ACTION
        });
    }
    if (request.action === 'on') {
        IDAD_MUA = request.idQcMua;
        IDAD_BAN = request.idQcBan;
        ignoreBanToiDa = request.ignoreBanToiDa;
        ignoreMuaToiDa = request.ignoreMuaToiDa;
        userFolowBan = request.userFolowBan;
        userFolowMua = request.userFolowMua;
        timeDUR = request.timeDUR;
        MAX = request.max;
        MIN = request.min;
        bamBangGiaNguoiMua = request.bamBangGiaNguoiMua;
        bamBangGiaNguoiBan = request.bamBangGiaNguoiBan;
        ACTION = request.value;

        localStorage.setItem('IDAD_MUA', IDAD_MUA + '');
        localStorage.setItem('IDAD_BAN', IDAD_BAN + '');
        localStorage.setItem('ignoreMuaToiDa', ignoreMuaToiDa + '');
        localStorage.setItem('ignoreBanToiDa', ignoreBanToiDa + '');
        localStorage.setItem('userFolowMua', userFolowMua + '');
        localStorage.setItem('userFolowBan', userFolowBan + '');
        localStorage.setItem('timeDUR', timeDUR + '');
        localStorage.setItem('MAX', MAX + '');
        localStorage.setItem('MIN', MIN + '');
        localStorage.setItem('bamBangGiaNguoiMua', bamBangGiaNguoiMua + '');
        localStorage.setItem('bamBangGiaNguoiBan', bamBangGiaNguoiBan + '');
        console.log(request);
        localStorage.setItem('ACTION', ACTION + '');
        setupTabFirsTime();
        chrome.runtime.sendMessage({
            action: "close",
            source: ACTION
        });
        if (ACTION === 1) {
            closeTab(3);
        }
        if (ACTION === 2) {
            closeTab(2);
        }


    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function getUrlOFID(idTab, tabs) {
    console.log({idTab: idTab, tabs: tabs});
    let url = '';
    tabs.forEach(item => {
        if (item.id === idTab) {
            console.log(item.url);
            url = item.url;
        }
    });
    return url;
}


/*



function getDataTabb2(s) {
    chrome.tabs.query({}, function (tabs) {
        if (tabs[1].url !== infoAdURL) {
            chrome.tabs.update(tabs[1].id, {url: infoAdURL, active: false}, function (tab2) {
                let listener = function (tabId, changeInfo, tab) {
                    if (tabId === tab2.id && changeInfo.status === 'complete') {
                        setupTab2(tabs, tab2);
                        chrome.tabs.onUpdated.removeListener(listener);
                    }
                };
                chrome.tabs.onUpdated.addListener(listener);
            });
        } else {
            setupTab2(tabs);
        }
    });

}

function start2() {
    chrome.tabs.query({}, function (tabs) {
        if (getDataSuccess2) {
            getDataSuccess2 = false;
            console.log("LUOT MOI");
            getDataTabb2(tabs);
        }
    });
}*/

/*-----------------------------------------BEGIN TAB DATA---------------------
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------*/

async function clickPage2p(tabs) {
    if (ACTION === 4) {
        await sleep(500);
    }
    chrome.tabs.executeScript(idTabData, {
            "code":
                "document.getElementsByClassName('pagination-next')[0].firstChild.click();" +
                "document.getElementsByClassName('pagination-next')[1].firstChild.click();"
        },
        function (result) {
            console.log("Ở TAB LẤY DỮ LIỆU ĐANG CHUYỂN PAGE 2");
            getDataFirstPagep(tabs, 2);
        });
}

async function getDataTabb(tabs, index) {
    await sleep(3000);
    chrome.tabs.executeScript(idTabData, {
        "code":
            "function getData(){\n" +
            "     let array =[];\n" +
            "        var sell = document.getElementsByClassName('sell-offer');\n" +
            "        if(sell.length>0){\n" +
            "              \n" +
            "             for(var i=0;i<sell.length;i++){\n" +
            "                var text =sell[i].innerText;\n" +
            "                   array.push({\n" +
            "                       type: 'sell',\n" +
            "                        numberPrice: parseFloat(text.split(' ')[0].replace(',','.')),\n" +
            "                       maxPrice: parseFloat(text.split('Tối đa: ')[1].split(' ')[0].replace(',','.')),\n" +
            "                       userName: text.split('\\n')[2].split(' ')[0],\n" +
            "\n" +
            "                       \n" +
            "                   });\n" +
            "             }\n" +
            "        }\n" +
            "var buy = document.getElementsByClassName('buy-offer');\n" +
            "        if(buy.length>0){\n" +
            "              \n" +
            "             for(var i=0;i<buy.length;i++){\n" +
            "                var text =buy[i].innerText;\n" +
            "                   array.push({\n" +
            "                       type: 'buy',\n" +
            "                       numberPrice: parseFloat(text.split(' ')[0].replace(',','.')),\n" +
            "                       maxPrice: parseFloat(text.split('Tối đa: ')[1].split(' ')[0].replace(',','.')),\n" +
            "                       userName: text.split('\\n')[2].split(' ')[0],\n" +
            "\n" +
            "                       \n" +
            "                   });\n" +
            "             }\n" +
            "        }\n" +
            "return array;\n" +
            "};getData();"
    }, function (result) {
        console.log("result");
        console.log(result);
        let data = result[0];
        if (data.length < 10) {
            console.log("data.length");
            chrome.tabs.update(idTabData, {
                url: 'https://remitano.com/' + TYPE_TOOL + '/vn',
                active: false
            }, function (tab1) {
                let listener = function (tabId, changeInfo, tab) {
                    if (tabId === idTabData && changeInfo.status === 'complete') {
                        chrome.tabs.onUpdated.removeListener(listener);
                        getDataFirstPagep(tabs, index);
                    }
                };
                chrome.tabs.onUpdated.addListener(listener);
            });
        } else {

            if (index === 1) {
                araybuyTam = [];
                araySellTam = [];
            }
            data.forEach(item => {
                if (item.type === 'buy') {
                    araybuyTam.push(item);
                }
                if (item.type === 'sell') {
                    araySellTam.push(item);
                }

            });

            if (index === 2) {
                sellOffersPrice = araySellTam;
                buyOffersPrice = araybuyTam;
                if (ACTION === isAutoSell) {
                    console.log("10 ACC ĐẶT QUẢNG CÁO BÁN Ở 2 PAGE ĐẦU:");
                    console.log(JSON.stringify(sellOffersPrice));
                } else if (ACTION === isAutoBuy) {
                    console.log("10 ACC ĐẶT QUẢNG CÁO MUA Ở 2 PAGE ĐẦU:");
                    console.log(JSON.stringify(buyOffersPrice));
                } else {
                    console.log(JSON.stringify(buyOffersPrice));
                    console.log(JSON.stringify(sellOffersPrice));
                }
                getDataSuccess = true;
            } else {
                clickPage2p(tabs);
            }
        }
    });

}


function getDataFirstPagep(tabs, index) {
    chrome.tabs.executeScript(idTabData, {
            "code":
                "function clickbtnColor(){\n" +
                "var el= document.getElementsByClassName('text-btc-color');\n" +
                "if(el[0]!=undefined){\n" +
                "el[0].click();\n" +
                "}\n" +
                "};clickbtnColor();"
        },
        function (result) {
            console.log("ĐANG CHUYỂN CHẾ ĐỘ XEM -> VND/ethUSDT");

        });
    getDataTabb(tabs, index);

}

async function getDataTabb1(tabs) {
    if (getUrlOFID(idTabData, tabs) !== 'https://remitano.com/' + TYPE_TOOL + '/vn' || flag === 0) {
        console.log('DDDDDDDDDDDDĐ: ' + flag)
        flag = 1;
        chrome.tabs.update(idTabData, {
            url: 'https://remitano.com/' + TYPE_TOOL + '/vn',
            active: false
        }, function (tab1) {
            let listener = function (tabId, changeInfo, tab) {
                if (tabId === idTabData && changeInfo.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    getDataFirstPagep(tabs, 1);
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
        });
    } else {
        console.log('FFFFFFFFFFFFFFFFF')
        if (ACTION === 4) {
            await sleep(500);
        }
        chrome.tabs.executeScript(idTabData, {
                "code": "document.getElementsByClassName('pagination-prev')[0].firstChild.click();" +
                    "document.getElementsByClassName('pagination-prev')[1].firstChild.click();"
            },
            function (result) {
                console.log("Ở TAB LẤY DỮ LIỆU ĐANG CHUYỂN PAGE 1");
                getDataFirstPagep(tabs, 1);
            });
    }
}

function start() {
    chrome.tabs.query({}, function (tabs) {
        if (getDataSuccess) {
            getDataSuccess = false;
            console.log("LUOT MOI");
            getDataTabb1(tabs);
        }
    });
}


setInterval(function () {
    if (ACTION !== isOff) {
        start();
    }
}, 1000);
/*-----------------------------------------START TAB DATA---------------------
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------*/

/*setInterval(function () {
    if (ACTION !== isOff) {
        // start2();
    }
}, 1000);

async function aWait() {
    await sleep(2000);
    getDataSuccess2 = true;
}*/

/*--------------------------------------BEGIN MUA MUA MUA MUA ----------------------------*/

async function aWaitMUA() {
    await sleep(2000);
    getDataSuccessMua = true;
}

async function clickSaveMUA(tabs) {
    await sleep(500);
    chrome.tabs.executeScript(idTabMua, {
            "code":
                "document.getElementsByClassName('btn-save-offer')[0].click()"
        },
        function (result) {
            console.log("NHẤN SAVE");
        });
    await sleep(2000);
    chrome.tabs.query({}, function (tabs) {
        if (getUrlOFID(idTabMua, tabs).split('/')[7] === 'edit') {
            clickSaveMUA(tabs)
        } else {
            timeUpdateMUA = Date.now();
            aWaitMUA();
            console.log("-------ĐÃ LƯU LẠI QUẢNG CÁO MUA--------");
            console.log(" ");
            console.log(" ");
        }
    });


}

function getValueMUA(offersPrice) {
    let array1 = [];
    let array = [];
    offersPrice.forEach(item => {
        if (item !== null) {
            let v = item.numberPrice * 1000;
            v = v + (v * 0.01);
            array.push(v);
            if (item.maxPrice >= ignoreMuaToiDa) {
                array1.push(v);
            }
        }
    });
    array1.sort((a, b) => b - a);
    console.log(array1);
    let flag = true;
    let value = Math.max(...array1);
    array1.forEach(item => {
        if (flag && item !== null) {
            if (item <= MAX) {
                if (bamBangGiaNguoiMua === 'checked') {
                    value = item + 3;
                } else {
                    value = item + 6;
                }
                if (value > MAX) {
                    value = MAX;
                }
                flag = false;
            }
        }
    });
    if (flag) {
        if (array1.length > 0) {
            value = MAX;
        } else {
            value = Math.min(...array);
        }
    }
    if (ACTION === isOff) {
        value = 'Đã tắt tool'
    }
    console.log("GIÁ TRỊ SẼ NHẬP VÀO LÀ : " + value);
    return value;
}

function getNumberInputMUA(offersPrice) {
    let value = 'Không lấy được dữ liệu';
    if (userFolowMua !== '') {
        let flag = true;
        offersPrice.forEach(item => {
            if (item !== null && userFolowMua.trim() === item.userName) {
                let v = item.numberPrice * 1000;
                v = v + (v * 0.01);
                if (v <= MAX) {
                    console.log("ĐÃ THEO BUY" + userFolowMua);
                    if (bamBangGiaNguoiMua === 'checked') {
                        value = v + 3;
                    } else {
                        value = v + 6;
                    }
                    if (value > MAX) {
                        value = MAX;
                    }
                    flag = false;
                    console.log(value);
                } else {
                    flag = false;
                    value = getValueMUA(offersPrice);
                }
            }
        });
        if (flag) {
            value = getValueMUA(offersPrice);
        }
    } else {
        value = getValueMUA(offersPrice);
    }
    if (ACTION === isOff) {
        value = "Đã tắt tool";
    }
    return value;
}

async function inputDataMUA(tabs) {
    if (buyOffersPrice.length === 10) {
        let valueInput = getNumberInputMUA(buyOffersPrice);
        scriptCodeInput = "var element = document.getElementsByClassName('input-group')[0].firstChild;var ev = new Event('input', { bubbles: true});ev.simulated = true;element.value = " + valueInput + ";element.defaultValue  = " + valueInput + ";element.dispatchEvent(ev);";
        chrome.tabs.executeScript(idTabMua, {"code": scriptCodeInput},
            function (result) {
                console.log("ĐANG NHẬP DỮ LIỆU VÀO [Giá ethUSD]");
                clickSaveMUA(tabs);
            }
        );
    } else {
        getDataSuccessMua = true;
    }

}


async function directInputMUA(tabs) {
    if (parseInt((Date.now() - timeUpdateMUA)) >= ((timeDUR - 3) * 1000)) {
        console.log("ĐÃ ĐỦ THỜI GIAN NHẬP GIÁ MỚI " + parseInt((((Date.now() - timeUpdateMUA)) / 1000) + 3));
        inputDataMUA(tabs);
    } else {
        await sleep(1000);
        console.log("ĐANG CHỜ ĐẾN GIÂY THỨ " + parseInt((((Date.now() - timeUpdateMUA)) / 1000) + 3));
        directInputMUA(tabs);
    }
}

async function setupTabMUA(tabs) {
    chrome.tabs.executeScript(idTabMua, {
            "code":
                "function settup(){\n" +
                "        var element =document.getElementsByClassName('btn btn-default btn-edit');\n" +
                "\t\tif(element[0]!=undefined){\n" +
                "               element[0].click();\n" +
                "               return \"OK\"\n" +
                "\t\t}else{\n" +
                "\t\t\t\treturn \"FAIL\"\n" +
                "        }\n" +
                "};settup();"
        },

        function (result) {
            console.log("NHẤN VÀO NÚT [Chỉnh sửa]");
        });
    await sleep(4000);
    chrome.tabs.executeScript(idTabMua, {
            "code":
                "function clickChange(){\n" +
                "        var btnChange =document.getElementsByClassName('btn-change');\n" +
                "\t\tif(btnChange.length>0){\n" +
                "            for(var i=0;i<btnChange.length;i++){\n" +
                "                            btnChange[0].click();\n" +
                "            };\n" +
                "               return \"OK\"\n" +
                "\t\t}else{\n" +
                "\t\t\t  return \"FAIL\"\n" +
                "        }\n" +
                "};clickChange();"
        },
        function (result) {
            console.log("NHẤN VÀO NÚT [Thay đổi]");
            directInputMUA(tabs);
        });
}

let urlInfoMua = '';

function getDataTabMua(s) {
    chrome.tabs.query({}, function (tabs) {
        let curentUrl = getUrlOFID(idTabMua, tabs).split('-')[0];
        console.log(curentUrl + 'BBBBBBBBBBBBBBBBBBBBB');
        if (curentUrl !== 'https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_MUA + '/edit' && curentUrl !== 'https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_MUA) {
            chrome.tabs.update(idTabMua, {
                url: 'https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_MUA + '/edit',
                active: false
            }, function (tab2) {
                let listener = function (tabId, changeInfo, tab) {
                    if (tabId === idTabMua && changeInfo.status === 'complete') {
                        setupTabMUA(tabs);
                        chrome.tabs.onUpdated.removeListener(listener);
                    }
                };
                chrome.tabs.onUpdated.addListener(listener);
            });
        } else {
            setupTabMUA(tabs);
        }
    });

}

function startMua() {
    chrome.tabs.query({}, function (tabs) {
        if (getDataSuccessMua) {
            getDataSuccessMua = false;
            console.log("startMua");
            getDataTabMua(tabs);
        }
    });
}

setInterval(function () {
    if (ACTION === 1 || ACTION === 4) {
        startMua();
    }
}, 1000);


/*--------------------------------------START MUA MUA MUA MUA ----------------------------*/

/*--------------------------------------BEGIN BAN BAN BAN BAN ----------------------------*/

async function aWaitBAN() {
    await sleep(2000);
    getDataSuccessBan = true;
}

async function clickSaveBAN(tabs) {
    await sleep(500);
    chrome.tabs.executeScript(idTabBan, {
            "code":
                "document.getElementsByClassName('btn-save-offer')[0].click()"
        },
        function (result) {
            console.log("NHẤN SAVE");
        });
    await sleep(2000);

    chrome.tabs.query({}, function (tabs) {
        if (getUrlOFID(idTabBan, tabs).split('/')[7] === 'edit') {
            clickSaveBAN(tabs)
        } else {
            timeUpdateBan = Date.now();
            aWaitBAN();
            console.log("-------ĐÃ LƯU LẠI QUẢNG CÁO MUA--------");
            console.log(" ");
            console.log(" ");
        }
    });


}

function getValueBAN(offersPrice) {
    let array1 = [];
    let array = [];
    offersPrice.forEach(item => {
        if (item !== null) {
            let v = item.numberPrice * 1000;
            v = v - (v * 0.01);
            array.push(v);
            if (item.maxPrice >= ignoreMuaToiDa) {
                array1.push(v);
            }
        }
    });
    array1.sort((a, b) => a - b);
    console.log(array1);
    let flag = true;
    let value = Math.max(...array1);
    array1.forEach(item => {
        if (flag && item !== null) {
            if (item >= MIN) {
                if (bamBangGiaNguoiBan === 'checked') {
                    value = item + 3;
                } else {
                    value = item;
                }
                if (value < MIN) {
                    value = MIN;
                }
                flag = false;
            }
        }
    });
    if (flag) {
        if (array1.length > 0) {
            value = MIN;
        } else {
            value = Math.max(...array);
        }

    }
    if (ACTION === isOff) {
        value = 'Đã tắt tool';
    }
    console.log("GIÁ TRỊ SẼ NHẬP VÀO LÀ : " + value);
    return value;
}

function getNumberInputBAN(offersPrice) {
    let value = 'Đã tắt tool';
    if (userFolowBan !== '') {
        let flag = true;
        offersPrice.forEach(item => {
            if (item !== null && userFolowBan.trim() === item.userName) {
                let v = item.numberPrice * 1000;
                v = v - (v * 0.01);
                if (v >= MIN) {
                    if (bamBangGiaNguoiBan === 'checked') {
                        value = v + 3;
                    } else {
                        value = v;
                    }
                    if (value < MIN) {
                        value = MIN;
                    }
                    flag = false;
                    console.log("ĐÃ THEO " + userFolowBan);
                    console.log(value);
                } else {
                    flag = false;
                    value = getValueBAN(offersPrice);
                }

            }
        });
        if (flag) {
            value = getValueBAN(offersPrice);
        }
    } else {
        value = getValueBAN(offersPrice);
    }
    if (ACTION === isOff) {
        value = 'Đã tắt tool';
    }
    return value;
}


async function inputDataBAN(tabs) {
    if (sellOffersPrice.length === 10) {
        let valueInput = getNumberInputBAN(sellOffersPrice);
        scriptCodeInput = "var element = document.getElementsByClassName('input-group')[0].firstChild;var ev = new Event('input', { bubbles: true});ev.simulated = true;element.value = " + valueInput + ";element.defaultValue  = " + valueInput + ";element.dispatchEvent(ev);";
        chrome.tabs.executeScript(idTabBan, {"code": scriptCodeInput},
            function (result) {
                console.log("ĐANG NHẬP DỮ LIỆU VÀO [Giá ethUSD]");
                clickSaveBAN(tabs);
            }
        );
    } else {
        getDataSuccessBan = true;
    }

}


async function directInputBAN(tabs) {
    if (parseInt((Date.now() - timeUpdateBan)) >= ((timeDUR - 3) * 1000)) {
        console.log("ĐÃ ĐỦ THỜI GIAN NHẬP GIÁ MỚI " + parseInt((((Date.now() - timeUpdateBan)) / 1000) + 3));
        inputDataBAN(tabs);
    } else {
        await sleep(1000);
        console.log("ĐANG CHỜ ĐẾN GIÂY THỨ " + parseInt((((Date.now() - timeUpdateBan)) / 1000) + 3));
        directInputBAN(tabs);
    }
}

async function setupTabBAN(tabs, isFirst) {
    chrome.tabs.executeScript(idTabBan, {
            "code":
                "function settup(){\n" +
                "        var element =document.getElementsByClassName('btn btn-default btn-edit');\n" +
                "\t\tif(element[0]!=undefined){\n" +
                "               element[0].click();\n" +
                "               return \"OK\"\n" +
                "\t\t}else{\n" +
                "\t\t\t\treturn \"FAIL\"\n" +
                "        }\n" +
                "};settup();"
        },

        function (result) {
            console.log("NHẤN VÀO NÚT [Chỉnh sửa]");
        });
    await sleep(4000);
    chrome.tabs.executeScript(idTabBan, {
            "code":
                "function clickChange(){\n" +
                "        var btnChange =document.getElementsByClassName('btn-change');\n" +
                "\t\tif(btnChange.length>0){\n" +
                "            for(var i=0;i<btnChange.length;i++){\n" +
                "                            btnChange[0].click();\n" +
                "            };\n" +
                "               return \"OK\"\n" +
                "\t\t}else{\n" +
                "\t\t\t  return \"FAIL\"\n" +
                "        }\n" +
                "};clickChange();"
        },
        function (result) {
            console.log("NHẤN VÀO NÚT [Thay đổi]");
            directInputBAN(tabs);
        });
}


function getDataTabBAN(s) {
    chrome.tabs.query({}, function (tabs) {
        let curentUrl = getUrlOFID(idTabBan, tabs).split('-')[0];
        console.log(curentUrl + 'BBBBBBBBBBBBBBBBBBBBB');
        if (curentUrl !== 'https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_BAN + '/edit' && curentUrl !== 'https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_BAN) {
            chrome.tabs.update(idTabBan, {
                url: 'https://remitano.com/' + TYPE_TOOL + '/vn/offers/' + IDAD_BAN + '/edit',
                active: false
            }, function (tab2) {
                let listener = function (tabId, changeInfo, tab) {
                    if (tabId === idTabBan && changeInfo.status === 'complete') {
                        setupTabBAN(tabs, true);
                        chrome.tabs.onUpdated.removeListener(listener);
                    }
                };
                chrome.tabs.onUpdated.addListener(listener);
            });
        } else {
            setupTabBAN(tabs, false);
        }
    });

}

function startBAN() {
    chrome.tabs.query({}, function (tabs) {
        if (getDataSuccessBan) {
            getDataSuccessBan = false;
            console.log("startBan");
            getDataTabBAN(tabs);
        }
    });
}

setInterval(function () {
    if (ACTION === 2 || ACTION === 4) {
        startBAN();
    }
}, 1000);


/*--------------------------------------START BAN BAN BAN ----------------------------*/


/*
async function setupTab2(tabs, tab2) {
    chrome.tabs.executeScript(tabs[1].id, {
            "code":
                "function settup(){\n" +
                "        var element =document.getElementsByClassName('btn btn-default btn-edit');\n" +
                "\t\tif(element[0]!=undefined){\n" +
                "               element[0].click();\n" +
                "               return \"OK\"\n" +
                "\t\t}else{\n" +
                "\t\t\t\treturn \"FAIL\"\n" +
                "        }\n" +
                "};settup();"
        },

        function (result) {
            console.log("NHẤN VÀO NÚT [Chỉnh sửa]");
        });
    await sleep(4000);
    chrome.tabs.executeScript(tabs[1].id, {
            "code":
                "function clickChange(){\n" +
                "        var btnChange =document.getElementsByClassName('btn-change');\n" +
                "\t\tif(btnChange.length>0){\n" +
                "            for(var i=0;i<btnChange.length;i++){\n" +
                "                            btnChange[0].click();\n" +
                "            };\n" +
                "               return \"OK\"\n" +
                "\t\t}else{\n" +
                "\t\t\t  return \"FAIL\"\n" +
                "        }\n" +
                "};clickChange();"
        },
        function (result) {
            console.log("NHẤN VÀO NÚT [Thay đổi]");
            directInput(tabs);


        });
}
*/

/*async function directInput(tabs) {
    if (parseInt((Date.now() - timeUpdateMUA)) >= ((timeDUR - 3) * 1000)) {
        console.log("ĐÃ ĐỦ THỜI GIAN NHẬP GIÁ MỚI " + parseInt((((Date.now() - timeUpdateMUA)) / 1000) + 3));
        inputData(tabs);
    } else {
        await sleep(1000);
        console.log("ĐANG CHỜ ĐẾN GIÂY THỨ " + parseInt((((Date.now() - timeUpdateMUA)) / 1000) + 3));
        directInput(tabs);
    }
}


async function inputData(tabs) {
    if (sellOffersPrice.length === 10 && buyOffersPrice.length === 10) {
        let valueInput = ACTION === isAutoSell ? getNumberInput(sellOffersPrice) : getNumberInput(buyOffersPrice);
        scriptCodeInput = "var element = document.getElementsByClassName('input-group')[0].firstChild;var ev = new Event('input', { bubbles: true});ev.simulated = true;element.value = " + valueInput + ";element.defaultValue  = " + valueInput + ";element.dispatchEvent(ev);";
        chrome.tabs.executeScript(tabs[1].id, {"code": scriptCodeInput},
            function (result) {
                console.log("ĐANG NHẬP DỮ LIỆU VÀO [Giá ethUSD]");
                clickSave(tabs);
            }
        );
    } else {
        getDataSuccess2 = true;
    }

}*/


/*async function clickSave(tabs) {
    await sleep(500);
    chrome.tabs.executeScript(tabs[1].id, {
            "code":
                "document.getElementsByClassName('btn-save-offer')[0].click()"
        },
        function (result) {
            console.log("NHẤN SAVE");
        });
    await sleep(1000);
    chrome.tabs.query({}, function (tabs) {
        if (tabs[1].url.split('/')[7] === 'edit') {
            clickSave(tabs)
        } else {
            timeUpdateMUA = Date.now();
            aWait();

            console.log("ĐÃ LƯU LẠI QUẢNG CÁO");
            console.log("____ĐANG_____________________");
            console.log("________CHỜ________________");
            console.log("____________LƯỢT___________");
            console.log("_ _ _ _ _ _ _ _ __MỚI__ ___");
            console.log(" ");
            console.log(" ");
        }
    });

}*/


/*function getValue(offersPrice) {
    let array1 = [];
    let array = [];
    offersPrice.forEach(item => {
        if (item !== null) {
            let v = item.numberPrice * 1000;
            if (ACTION === isAutoSell) {
                v = v - (v * 0.01);
            }
            if (ACTION === isAutoBuy) {
                v = v + (v * 0.01);
            }

            array.push(v);
            if (item.maxPrice >= NUMBER_STAMP) {
                array1.push(v);
            }
        }

    });

    if (ACTION === isAutoBuy) {
        array1.sort((a, b) => b - a);
    }
    if (ACTION === isAutoSell) {
        array1.sort((a, b) => a - b);
    }
    console.log(array1);
    let flag = true;
    let value = Math.max(...array1);
    array1.forEach(item => {
        if (flag && item !== null) {
            if (ACTION === isAutoSell) {
                if (item >= MIN) {
                    if (bamBangGiaNguoiBan === 'checked') {
                        value = item + 3;
                    } else {
                        value = item;
                    }

                    if (value < MIN) {
                        value = MIN;
                    }
                    flag = false;
                }
            } else if (ACTION === isAutoBuy) {
                if (item <= MAX) {
                    if (bamBangGiaNguoiMua === 'checked') {
                        value = item + 3;
                    } else {
                        value = item + 6;
                    }

                    if (value > MAX) {
                        value = MAX;
                    }
                    flag = false;
                }
            } else {
                value = "Đã tắt tool";
            }
        }
    });
    if (flag) {
        if (array1.length > 0) {
            if (ACTION === isAutoBuy) {
                value = MAX;
            } else if (ACTION === isAutoSell) {
                value = MIN;
            } else {
                value = "Đã tắt tool";
            }
        } else {
            if (ACTION === isAutoBuy) {
                value = Math.min(...array);
            } else if (ACTION === isAutoSell) {
                value = Math.max(...array);
            } else {
                value = "Đã tắt tool";
            }
        }

    }
    console.log("GIÁ TRỊ SẼ NHẬP VÀO LÀ : " + value);
    return value;
}

function getNumberInput(offersPrice) {
    let value = 'Đã tắt tool';
    if (userFolow !== '') {
        let flag = true;
        offersPrice.forEach(item => {
            if (item !== null && userFolow.trim() === item.userName) {
                let v = item.numberPrice * 1000;

                if (ACTION === isAutoSell) {
                    v = v - (v * 0.01);
                    if (v >= MIN) {

                        if (bamBangGiaNguoiBan === 'checked') {
                            value = v + 3;
                        } else {
                            value = v;
                        }
                        if (value < MIN) {
                            value = MIN;
                        }
                        flag = false;
                        console.log("ĐÃ THEO " + userFolow);
                        console.log(value);
                    } else {
                        flag = false;
                        value = getValue(offersPrice);
                    }
                } else if (ACTION === isAutoBuy) {
                    v = v + (v * 0.01);
                    if (v <= MAX) {
                        console.log("ĐÃ THEO BUY" + userFolow);
                        if (bamBangGiaNguoiMua === 'checked') {
                            value = v + 3;
                        } else {
                            value = v + 6;
                        }
                        if (value > MAX) {
                            value = MAX;
                        }
                        flag = false;
                        console.log(value);
                    } else {
                        flag = false;
                        value = getValue(offersPrice);
                    }
                } else {
                    value = "Đã tắt tool";
                }
            }
        });
        if (flag) {
            value = getValue(offersPrice);
        }
    } else {
        value = getValue(offersPrice);
    }
    return value;
}*/
