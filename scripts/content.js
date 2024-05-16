// Inject script into DOM, giving access to the webpage's window object
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", `chrome-extension://${chrome.runtime.id}/scripts/plugin.js`);
document.head.appendChild(script);

function sendUpdate(state) {
    document.dispatchEvent(new CustomEvent("dmb-content-update", {
        detail: {
            state: state
        }
    }));
}


// TODO: Setup content-popup communication w/ chrome.runtime.sendMessage
chrome.runtime.onMessage.addListener((message, send, sendResponse) => {

});

function content() {
    sendUpdate("test sent from content script");
}

// Wait for injected script to attach listener
setTimeout(content, 50);