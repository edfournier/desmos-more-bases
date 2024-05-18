const form = document.getElementById("form");
const bitsInput = document.getElementById("bits");
const saveButton = document.getElementById("save-button");
const resetButton = document.getElementById("reset-button");
const hexButton = document.getElementById("hex-button");
const binButton = document.getElementById("bin-button");

saveButton.addEventListener("click", saveSettings);
resetButton.addEventListener("click", resetSettings);
hexButton.addEventListener("click", () => sendMessageToContent({ event: "dmb-run-hex" }));
binButton.addEventListener("click", () => sendMessageToContent({ event: "dmb-run-bin" }));

loadSettings();

/*
 * Resets user settings to defaults and nukes local storage
 */ 
function resetSettings() {
    form.reset();
    chrome.storage.local.clear();
    sendMessageToContent({ event: "dmb-reset" });
}

/*
 * Loads saved user settings and notifies content script
 */
async function loadSettings() {
    const settings = (await chrome.storage.local.get("settings")).settings;
    if (settings) {
        bitsInput.value = settings.bits || 64;
        sendMessageToContent({ event: "dmb-update", detail: settings });
    }
}

/*
 * Saves user settings to local storage and notifies content script
 */
async function saveSettings() {
    const formData = new FormData(form);
    const settings = formData.entries().reduce((settings, entry) => {
        settings[entry[0]] = entry[1];
        return settings;
    }, {});
    await chrome.storage.local.set({ settings: settings });
    sendMessageToContent({ event: "dmb-update", detail: settings });
}

/*
 * Sends given message to content script
 */
function sendMessageToContent(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}