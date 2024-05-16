const save = document.getElementById("save");
const form = document.getElementById("form");
const reset = document.getElementById("reset");

async function savePreferences() {
    const formData = new FormData(form);
    await chrome.storage.local.set(formData.entries().reduce((state, entry) => {
        state[entry[0]] = entry[1];
        return state;
    }, {}));
}

async function resetPreferences() {
    chrome.storage.local.clear();
    form.reset();
}

save.addEventListener("click", saveFormData);
reset.addEventListener("click", resetPreferences);

// TODO: 
/*
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "Hello from popup!" });
});
*/

