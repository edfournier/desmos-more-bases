// Inject script into DOM, giving access to the webpage's window object
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", `chrome-extension://${chrome.runtime.id}/scripts/plugin.js`);
document.head.appendChild(script);

function sendEvent(event, detail) {
    document.dispatchEvent(new CustomEvent(event, {
        detail: detail
    }));
}

// Recieve messages from popup script
chrome.runtime.onMessage.addListener((message) => {
    console.log('Message received in content script:', message);
    sendEvent("dmb-run");
});

function content() {
}

// Wait for injected script to attach listener
setTimeout(content, 50);