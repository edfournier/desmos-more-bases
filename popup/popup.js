const save = document.getElementById("save");
const form = document.getElementById("form");
const reset = document.getElementById("reset");

save.addEventListener("click", saveSettings);
reset.addEventListener("click", resetSettings);

/*
 * Saves user settings to local storage and notifies content script
 */
async function saveSettings() {
    const formData = new FormData(form);
    await chrome.storage.local.set(formData.entries().reduce((state, entry) => {
        state[entry[0]] = entry[1];
        return state;
    }, {}));
}

/*
 * Resets user settings to defaults and nukes local storage
 */ 
async function resetSettings() {
    chrome.storage.local.clear();
    form.reset();

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: 'hello' });
    });
}

/*
 * Sends given message to content script
 */
function sendMessage(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}