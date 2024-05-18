// Site's window properties
const mathField = window.Desmos.MathQuill.MathField(
    document.getElementsByClassName("dcg-math-field dcg-focus dcg-mq-editable-field dcg-mq-math-mode")[0]
);	
const calc = window.Calc;
const n = 64;

// Recieve order to execute or state updates from content script
document.addEventListener("dmb-run-bin", () => run(/0b_\{[0-1]+\}/g));  
document.addEventListener("dmb-run-hex", () => run(/0x([A-Fa-f]|_\{[0-9]+\})+/g));  
document.addEventListener("dmb-update", (e) => {
    console.log("New settings: " + e.detail);
});

/*
 * Convert n-bit binary or hex string to decimal
 */
function toDecimal(string) {
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
    const state = calc.getState();
    // TODO: list[0] is only first expression?
    state.expressions.list[0].latex = mathField.latex().replace(pattern, (match) => {
        const clean = match.replace(/[_{}]/g, "");
        return toDecimal(clean).toString();
    });
    calc.setState(state);
}