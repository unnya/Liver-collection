/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-04 20:31:22 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-04 22:17:19
 */
// 创建一个用于粘贴battle id的文本框
const init_input_for_battle = () => {
    let input = document.getElementById('battle_input');

    if(!input) {
        input = document.createElement('input');

        input.id = 'battle_input';
        input.style.width = '0px';
        input.style.height = '0px';

        document.body.appendChild(input);
    }
}

/**
 * 点击icon时，获得剪切板内容，像是battle id的话，
 * 去请求battle room地址
 */
const get_battle_room_href = userId => {
    chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

            let input = document.getElementById('battle_input');

            input.focus();
            input.value = '';
    
            /**
             * chrome不能直接获得剪切板内容，只能先粘贴到input中，再获得input的值
             *
             * https://stackoverflow.com/questions/25622359/clipboard-copy-paste-on-content-script-chrome-extension
            */
            document.execCommand('paste');

            // chrome.clipboard.onClipboardDataChanged.addListener(function callback)
            let value = input.value.trim();

            let reg = /^[A-Za-z0-9]+$/gi;
            if(reg.test(value) && value.length == 8) {
                port.postMessage({ message: 'battle_key_check', battleId: value, userId });
            } else {
                console.log('check failed')
            }
        });
    });
}

module.exports = { init_input_for_battle, get_battle_room_href }