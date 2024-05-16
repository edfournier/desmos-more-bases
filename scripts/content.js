// Inject script into DOM so it can access the webpage's window object
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", `chrome-extension://${chrome.runtime.id}/scripts/plugin.js`);
document.head.appendChild(script);

function content() {
    document.dispatchEvent(new CustomEvent("dmb-content-update", {
        detail: {
            state: "5"
        }
    }));
}

// Wait for injected script to attach listener
setTimeout(content, 50);