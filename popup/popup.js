const save = document.getElementById("save");
const form = document.getElementById("form");
const reset = document.getElementById("reset");
const convertHex = document.getElementById("convert-hex");

save.addEventListener("click", saveSettings);
reset.addEventListener("click", resetSettings);
convertHex.addEventListener("click", () => sendMessageToContent({ event: "dmb-run" }));

/*
 * Saves user settings to local storage and notifies content script
 */
function saveSettings() {
    const formData = new FormData(form);
    chrome.storage.local.set(formData.entries().reduce((state, entry) => {
        state[entry[0]] = entry[1];
        return state;
    }, {}));
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