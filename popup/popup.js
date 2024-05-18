const form = document.getElementById("form");
const bitsInput = document.getElementById("bits-input");
const saveButton = document.getElementById("save-button");
const resetButton = document.getElementById("reset-button");
const hexButton = document.getElementById("hex-button");
const binButton = document.getElementById("bin-button");

saveButton.addEventListener("click", saveSettings);
resetButton.addEventListener("click", resetSettings);
hexButton.addEventListener("click", () => sendMessageToContent({ event: "dmb-run-hex" }));
binButton.addEventListener("click", () => sendMessageToContent({ event: "dmb-run-bin" }));

// Set stored user settings
const local = await chrome.storage.local.get();
bitsInput.value = local["bits-input"] || 64;

/*
 * Saves user settings to local storage and notifies content script
 */
function saveSettings() {
    const formData = new FormData(form);
    chrome.storage.local.set(formData.entries().reduce((local, entry) => {
        local[entry[0]] = entry[1];
        return local;
    }, {}));
    // sendMessageToContent({ event: "dmb-update" });
}

/*
 * Resets user settings to defaults and nukes local storage
 */ 
function resetSettings() {
    form.reset();
    chrome.storage.local.clear();
}

/*
 * Sends given message to content script
 */
function sendMessageToContent(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}