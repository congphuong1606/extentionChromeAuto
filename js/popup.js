let value = 3;
let id = "";
let IDAD_MUA = "";
let IDAD_BAN = "";
let userFolow = "";
let max = 21000;
let min = 25000;
let NUMBER_STAMP = 0;
let ignoreMuaToiDa = 0;
let ignoreBanToiDa = 0;
let autoMuaBanMore = "off";
let bamBangGiaNguoiBan = "uncheck";
let bamBangGiaNguoiMua = "uncheck";
let stampCanBuy = 21000;
let stampCanSell = 24000;
window.onload = onWindowLoad;

let timeDUR = 15;
const TYPE_TOOL = 'eth';

function clickTab1() {
    document.getElementById("body-tab1").style.display = "block";
    document.getElementById("body-tab2").style.display = "none";
    document.getElementById("tab2").style.backgroundColor = "#eee";
    document.getElementById("tab1").style.backgroundColor = "white";
    document.getElementById("tab2").style.color = "#fff";
    document.getElementById("tab1").style.color = "#f3910e";
}

function clickTab2() {
    document.getElementById("body-tab2").style.display = "block";
    document.getElementById("body-tab1").style.display = "none";
    document.getElementById("tab1").style.backgroundColor = "#eee";
    document.getElementById("tab1").style.color = "#fff";
    document.getElementById("tab2").style.color = "#f3910e";
    document.getElementById("tab2").style.backgroundColor = "white";

}

chrome.tabs.query({'active': false, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log("URL URL URL");
    console.log(url);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btn-save").addEventListener("click", clickSavebtn);
    document.getElementById("tab1").addEventListener("click", clickTab1);
    document.getElementById("tab2").addEventListener("click", clickTab2);
    document.querySelector('#showAlertMua').addEventListener('change', changeCheckboxMuaHandler);
    document.querySelector('#showAlertBan').addEventListener('change', changeCheckboxBanHandler);

    function changeCheckboxBanHandler() {
        //Do Something...maybe another function showAlert(), for instance
        if (showAlertBan.checked) {
            console.log('check');
            bamBangGiaNguoiBan = "checked";
        }
        else {
            console.log('uncheck')
            bamBangGiaNguoiBan = "uncheck";
        }
    }

    function changeCheckboxMuaHandler() {
        //Do Something...maybe another function showAlert(), for instance
        if (showAlertMua.checked) {
            console.log('check');
            bamBangGiaNguoiMua = "checked";
        }
        else {
            console.log('uncheck')
            bamBangGiaNguoiMua = "uncheck";
        }
    }

    var radios = document.querySelectorAll('input[type=radio][name="theRadioGroupName"]');

    function changeHandler(event) {

        if (this.value === "1") {
            value = 1;
            console.log('value', '1');
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "none";
            document.getElementById("div-input-mua").style.display = "table-row";
            document.getElementById("urlmua").style.display = "table-row";
            document.getElementById("urlban").style.display = "none";
            document.getElementById("div-ignore-toida-ban").style.display = "none";
            document.getElementById("div-ignore-toida-mua").style.display = "table-row";
            document.getElementById("div=folow-user-ban").style.display = "none";
            document.getElementById("div=folow-user-mua").style.display = "table-row";

        } else if (this.value === "2") {
            value = 2;
            console.log('value', '2');
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "table-row";
            document.getElementById("div-input-mua").style.display = "none";
            document.getElementById("div-ignore-toida-mua").style.display = "none";
            document.getElementById("div-ignore-toida-ban").style.display = "table-row";
            document.getElementById("urlmua").style.display = "none";
            document.getElementById("urlban").style.display = "table-row";
            document.getElementById("div=folow-user-ban").style.display = "table-row";
            document.getElementById("div=folow-user-mua").style.display = "none";
        } else if (this.value === "4") {
            value = 4;
            console.log('value', '4');
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "table-row";
            document.getElementById("div-input-mua").style.display = "table-row";
            document.getElementById("urlmua").style.display = "table-row";
            document.getElementById("urlban").style.display = "table-row";
            document.getElementById("div-ignore-toida-ban").style.display = "table-row";
            document.getElementById("div-ignore-toida-mua").style.display = "table-row";
            document.getElementById("div=folow-user-ban").style.display = "table-row";
            document.getElementById("div=folow-user-mua").style.display = "table-row";
        }
        else {
            value = 3;
            document.getElementById("mua-ban").style.display = "none";
        }
    }


    Array.prototype.forEach.call(radios, function (radio) {
        radio.addEventListener('change', changeHandler);
    });


    var checkbox = document.querySelector("input[name=checkbox]");
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.getElementById("input-buy-more").disabled = false;
            document.getElementById("input-sell-more").disabled = false;
            autoMuaBanMore = "on";
            console.log("checked")
        } else {
            document.getElementById("input-buy-more").disabled = true;
            document.getElementById("input-sell-more").disabled = true;
            autoMuaBanMore = "off";
            console.log("unchecked")
        }
    });

});



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



let idQcMua = '';
let idQcBan = '';

function showError(idTagName) {
    document.getElementById(idTagName).innerText = 'Kiểm tra!';
}

function hideError(idTagName) {
    document.getElementById(idTagName).innerText = '';
}

function senDATA() {
    chrome.runtime.sendMessage({
        action: "on",
        value: value,
        idQcMua: idQcMua,
        idQcBan: idQcBan,
        ignoreMuaToiDa: ignoreMuaToiDa,
        ignoreBanToiDa: ignoreBanToiDa,
        userFolowMua: userFolowMua,
        userFolowBan: userFolowBan,
        timeDUR: timeDUR,
        max: max,
        min: min,
        bamBangGiaNguoiMua: bamBangGiaNguoiMua,
        bamBangGiaNguoiBan: bamBangGiaNguoiBan,
    });
}

function clickSavebtn() {
    idQcMua = document.getElementById("id-ad-mua").value;
    idQcBan = document.getElementById("id-ad-ban").value;
    ignoreMuaToiDa = parseFloat(document.getElementById("ignore-toida-mua").value);
    ignoreBanToiDa = parseFloat(document.getElementById("ignore-toida-ban").value);
    ignoreMuaToiDa = (ignoreMuaToiDa > 0) ? ignoreMuaToiDa : 0;
    ignoreBanToiDa = (ignoreBanToiDa > 0) ? ignoreBanToiDa : 0;
    userFolowMua = document.getElementById("input-folow-user-mua").value + '';
    userFolowBan = document.getElementById("input-folow-user-ban").value + '';
    timeDUR = parseInt(document.getElementById("input-time-dur").value);
    timeDUR = timeDUR <= 7 ? 7 : timeDUR;
    max = document.getElementById("max-mua").value;
    min = document.getElementById("min-ban").value;
    if (value === 1) {
        if (idQcMua === '') {
            showError('error-id-mua');
            return;
        }
    }
    if (value === 2) {
        if (idQcBan === '') {
            showError('error-id-ban');
            return;
        }
    }
    if (value === 4) {
        if (idQcBan === '') {
            showError('error-id-ban');
            return;
        }
        if (idQcMua === '') {
            showError('error-id-mua');
            return;
        }

    }
    if (value === 3) {
        console.log('OFF');
        chrome.runtime.sendMessage({
            action: "off",
            value: value,
        });
        return;
    }
    if ((value === 1 && idQcMua !== '')
        || (value === 2 && idQcBan !== '')
        || (value === 4 && idQcBan !== ''
            && idQcMua !== '')) {
        hideError('error-id-mua');
        hideError('error-id-ban');
        console.log('ON-' + value);
        senDATA();
    }
}

/*function clickSavebtnFACKE() {
    userFolow = document.getElementById("input-folow-user").value + '';
    timeDUR = parseInt(document.getElementById("input-time-dur").value);
    timeDUR = timeDUR <= 7 ? 7 : timeDUR;
    id = document.getElementById("input-id").value;
    max = document.getElementById("max-mua").value;
    min = document.getElementById("min-ban").value;
    NUMBER_STAMP = parseFloat(document.getElementById("input-sle").value);
    stampCanSell = document.getElementById("input-sell-more").value;
    stampCanBuy = document.getElementById("input-buy-more").value;
    if (value === 3) {
        chrome.runtime.sendMessage({
            action: "getSource",
            tabMuaID: tabMuaID,
            tabBanID: tabBanID,
            tabDataID: tabDataID,
            min: min,
            max: max,
            NUMBER_STAMP: NUMBER_STAMP,
            timeDUR: timeDUR,
            IDAD_MUA: IDAD_MUA,
            IDAD_BAN: IDAD_BAN,
            bamBangGiaNguoiMua: bamBangGiaNguoiMua,
            bamBangGiaNguoiBan: bamBangGiaNguoiBan,
            source: value + "." + id,
            userFolow: userFolow
        });
        chrome.runtime.sendMessage({
            action: "canbuySell",
            autoMuaBanMore: autoMuaBanMore,
            stampCanSell: stampCanSell,
            stampCanBuy: stampCanBuy,
        });

    } else if ((value === 1 && IDAD_MUA !== '') || (value === 2 && IDAD_BAN !== '') || (value === 4 && IDAD_MUA !== '' && IDAD_BAN !== '')) {
        if (NUMBER_STAMP >= 0) {
            document.getElementById("error-sle").innerText = '';
            if (value === 1) {
                if (max.length === 5 && max > 15000) {
                    document.getElementById("error-mua").innerText = '';
                    chrome.runtime.sendMessage({
                        action: "getSource",
                        tabMuaID: tabMuaID,
                        tabBanID: tabBanID,
                        tabDataID: tabDataID,
                        min: min,
                        max: max,
                        NUMBER_STAMP: NUMBER_STAMP,
                        timeDUR: timeDUR,
                        bamBangGiaNguoiMua: bamBangGiaNguoiMua,
                        bamBangGiaNguoiBan: bamBangGiaNguoiBan,
                        IDAD_MUA: IDAD_MUA,
                        IDAD_BAN: IDAD_BAN,
                        source: value + "." + id,
                        userFolow: userFolow
                    });
                    chrome.runtime.sendMessage({
                        action: "canbuySell",
                        autoMuaBanMore: autoMuaBanMore,
                        stampCanSell: stampCanSell,
                        stampCanBuy: stampCanBuy,
                    });


                } else {
                    document.getElementById("error-mua").innerText = 'Kiểm tra giá trị  ';
                }

            } else if (value === 2) {
                if (min.length === 5 && min < 45000) {
                    document.getElementById("error-ban").innerText = '';
                    chrome.runtime.sendMessage({
                        action: "getSource",
                        min: min,
                        max: max,
                        NUMBER_STAMP: NUMBER_STAMP,
                        bamBangGiaNguoiBan: bamBangGiaNguoiBan,
                        bamBangGiaNguoiMua: bamBangGiaNguoiMua,
                        timeDUR: timeDUR,
                        IDAD_MUA: IDAD_MUA,
                        IDAD_BAN: IDAD_BAN,
                        source: value + "." + id,
                        userFolow: userFolow
                    });
                    chrome.runtime.sendMessage({
                        action: "canbuySell",
                        autoMuaBanMore: autoMuaBanMore,
                        stampCanSell: stampCanSell,
                        stampCanBuy: stampCanBuy,
                    });
                } else {
                    document.getElementById("error-ban").innerText = 'Kiểm tra giá trị  ';
                }
            }
        } else {
            document.getElementById("error-sle").innerText = 'Mốc số lượng phải >= 0';
        }
        document.getElementById("error-url").innerText = '';

    } else {
        document.getElementById("error-url").innerText = 'Nhập URL quảng cáo (http://...offers/ID-mua-bitcoin-giá...)';
    }

}*/


function onWindowLoad() {
    clickTab1();
    value = parseInt(localStorage.getItem('ACTION'));
    idQcMua = localStorage.getItem('IDAD_MUA');
    idQcBan = localStorage.getItem('IDAD_BAN');
    ignoreMuaToiDa = parseFloat(localStorage.getItem('ignoreMuaToiDa'));
    ignoreBanToiDa = parseFloat(localStorage.getItem('ignoreBanToiDa'));
    userFolowMua = localStorage.getItem('userFolowMua');
    userFolowBan = localStorage.getItem('userFolowBan');
    timeDUR = parseInt(localStorage.getItem('timeDUR'));
    max = parseInt(localStorage.getItem('MAX'));
    min = parseInt(localStorage.getItem('MIN'));
    bamBangGiaNguoiBan = localStorage.getItem('bamBangGiaNguoiBan');
    bamBangGiaNguoiMua = localStorage.getItem('bamBangGiaNguoiMua');


    document.getElementById("id-ad-mua").value = idQcMua;
    document.getElementById("id-ad-ban").value = idQcBan;
    document.getElementById("max-mua").value = max;
    document.getElementById("min-ban").value = min;
    document.getElementById("ignore-toida-mua").value = ignoreMuaToiDa;
    document.getElementById("ignore-toida-ban").value = ignoreBanToiDa;
    document.getElementById("input-buy-more").value = stampCanBuy;
    document.getElementById("input-sell-more").value = stampCanSell;
    document.getElementById("input-folow-user-mua").value = userFolowMua;
    document.getElementById("input-folow-user-ban").value = userFolowBan;
    document.getElementById("input-time-dur").value = timeDUR;


    stampCanSell = parseInt(localStorage.getItem('stampCanSell'));
    autoMuaBanMore = localStorage.getItem('autoMuaBanMore');
    stampCanBuy = parseInt(localStorage.getItem('stampCanBuy'));
    if (autoMuaBanMore === 'on') {
        document.getElementById("inputSw").checked = true;
        document.getElementById("input-buy-more").disabled = false;
        document.getElementById("input-sell-more").disabled = false;
        console.log("checked")
    } else {
        document.getElementById("inputSw").checked = false;
        document.getElementById("input-buy-more").disabled = true;
        document.getElementById("input-sell-more").disabled = true;
        console.log("checked")
    }


    console.log(value);
    let radio1 = document.querySelector('#radio1');
    let radio2 = document.querySelector('#radio2');
    let radio3 = document.querySelector('#radio3');
    let radio4 = document.querySelector('#radio4');
    if (bamBangGiaNguoiMua === 'checked') {
        document.querySelector('#showAlertMua').checked = true;
    } else {
        document.querySelector('#showAlertMua').checked = false;
    }
    if (bamBangGiaNguoiBan === 'checked') {
        document.querySelector('#showAlertBan').checked = true;
    } else {
        document.querySelector('#showAlertBan').checked = false;
    }

    switch (value) {
        case 1:
            console.log("AAAAAAAAAAA");
            radio1.checked = true;
            radio2.checked = false;
            radio3.checked = false;
            radio4.checked = false;
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "none";
            document.getElementById("div-input-mua").style.display = "table-row";
            document.getElementById("urlmua").style.display = "table-row";
            document.getElementById("urlban").style.display = "none";
            document.getElementById("div-ignore-toida-ban").style.display = "none";
            document.getElementById("div-ignore-toida-mua").style.display = "table-row";
            document.getElementById("div=folow-user-ban").style.display = "none";
            document.getElementById("div=folow-user-mua").style.display = "table-row";
            break;
        case 2:
            console.log("BBBBBBBBBB");
            radio1.checked = false;
            radio2.checked = true;
            radio3.checked = false;
            radio4.checked = false;
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "table-row";
            document.getElementById("div-input-mua").style.display = "none";
            document.getElementById("urlmua").style.display = "none";
            document.getElementById("urlban").style.display = "table-row";
            document.getElementById("div-ignore-toida-ban").style.display = "table-row";
            document.getElementById("div-ignore-toida-mua").style.display = "none";
            document.getElementById("div=folow-user-ban").style.display = "table-row";
            document.getElementById("div=folow-user-mua").style.display = "none";
            break;
        case 3:
            document.getElementById("mua-ban").style.display = "none";
            console.log("CCCCCCCCCCCCCCCCC");
            radio1.checked = false;
            radio2.checked = false;
            radio3.checked = true;
            radio4.checked = false;
            document.getElementById("div-input-ban").style.display = "none";
            document.getElementById("div-input-mua").style.display = "none";
            break;
        case 4:
            console.log("CCCCCCCCCCCCCCCCC");
            radio1.checked = false;
            radio2.checked = false;
            radio3.checked = false;
            radio4.checked = true;
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "table-row";
            document.getElementById("div-input-mua").style.display = "table-row";
            document.getElementById("urlmua").style.display = "table-row";
            document.getElementById("urlban").style.display = "table-row";
            document.getElementById("div-ignore-toida-ban").style.display = "table-row";
            document.getElementById("div-ignore-toida-mua").style.display = "table-row";
            document.getElementById("div=folow-user-ban").style.display = "table-row";
            document.getElementById("div=folow-user-mua").style.display = "table-row";
            break;

        default :
            break;
    }
}


chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "close") {
          window.close();
    }
});