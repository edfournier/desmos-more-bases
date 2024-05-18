const defaultSettings = {
    bits: 64,
};

let settings = defaultSettings;

// Recieve order to execute or state updates from content script
document.addEventListener("dmb-run-bin", () => run(/0b_\{[0-1]+\}/g));  
document.addEventListener("dmb-run-hex", () => run(/0x([A-Fa-f]|_\{[0-9]+\})+/g));  
document.addEventListener("dmb-update", (message) => settings = message.detail);
document.addEventListener("dmb-reset", () => settings = defaultSettings);

/*
 * Convert n-bit binary or hex string to decimal
 */
function toDecimal(string, n) {
    if ((string.length - 2) * 4 > n) {
        alert(`${string} is too large for storage size n=${n} bits.`);
        return string;
    }
    let num = BigInt(string); 
    // Sign extend
    if ((num >> BigInt(n - 1)) & BigInt(1)) {
        num |= BigInt(-1) << BigInt(n);
    }
    return num; 
}

function run(pattern) {
    const mathFields = document.getElementsByClassName("dcg-math-field");
    const state = window.Calc.getState();
    for (let i = 0; i < mathFields.length; i++) {
        const mathField = window.Desmos.MathQuill.MathField(mathFields[i]);
        state.expressions.list[i].latex = mathField.latex().replace(pattern, (match) => {
            const clean = match.replace(/[_{}]/g, "");
            return toDecimal(clean, settings.bits).toString();
        });
    }
    window.Calc.setState(state);
}