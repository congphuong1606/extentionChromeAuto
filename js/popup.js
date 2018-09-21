let value = 3;


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btn-save").addEventListener("click", clickSavebtn);
    var radios = document.querySelectorAll('input[type=radio][name="theRadioGroupName"]');

    function changeHandler(event) {
        if (this.value === "1") {
            value = 1;
            console.log('value', 'allot');

        } else if (this.value === "2") {
            value = 2;
            console.log('value', 'transfer');
        } else {
            value = 3;
        }
    }

    Array.prototype.forEach.call(radios, function (radio) {
        radio.addEventListener('change', changeHandler);
    });
});

function clickSavebtn() {
    chrome.runtime.sendMessage({
        action: "getSource",
        source: value
    });
}

function onWindowLoad() {
    value = parseInt(localStorage.getItem('ACTIONgetSource1212'));
    console.log(value);
    let radio1 = document.querySelector('#radio1');
    let radio2 = document.querySelector('#radio2');
    let radio3 = document.querySelector('#radio3');
    switch (value) {
        case 1:
            console.log("AAAAAAAAAAA");
            radio1.checked = true;
            radio2.checked = false;
            radio3.checked = false;
            break;
        case 2:
            console.log("BBBBBBBBBB");
            radio1.checked = false;
            radio2.checked = true;
            radio3.checked = false;
            break;
        case 3:
            console.log("CCCCCCCCCCCCCCCCC");
            radio1.checked = false;
            radio2.checked = false;
            radio3.checked = true;
            break;

        default :
            break;
    }
}

window.onload = onWindowLoad;

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "close") {
        window.close();
    }
});