// Inject script into DOM, giving access to the webpage's window object
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", `chrome-extension://${chrome.runtime.id}/scripts/plugin.js`);
document.head.appendChild(script);

// Recieve messages from popup script
chrome.runtime.onMessage.addListener(sendMessageToPlugin);

/*
 * Forward poupup script message to plugin script as DOM event
 * @param message: { event, detail }
 */
function sendMessageToPlugin(message) {
    document.dispatchEvent(new CustomEvent(message.event, {
        detail: message.detail
    }));
}