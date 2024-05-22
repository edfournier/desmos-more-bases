// Inject script into DOM, giving access to the web page's window object
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", `chrome-extension://${chrome.runtime.id}/scripts/plugin.js`);
document.head.appendChild(script);

// Receive messages from popup script
chrome.runtime.onMessage.addListener(sendMessageToPlugin);

/*
 * Forward popup script message: { event, detail } to plugin script as DOM event
 */
function sendMessageToPlugin(message) {
    document.dispatchEvent(new CustomEvent(message.event, {
        detail: message.detail
    }));
}