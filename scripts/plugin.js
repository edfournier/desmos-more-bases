// Site's window properties
const mq = window.Desmos.MathQuill.MathField(
    document.getElementsByClassName("dcg-math-field dcg-focus dcg-mq-editable-field dcg-mq-math-mode")[0]
);	
const calc = window.Calc;

// Recieve order to execute or state updates from content script
document.addEventListener("dmb-run-hex", run);  
document.addEventListener("dmb-update", (e) => {
    console.log("New settings: " + e.detail);
});

/*
 * Convert n-bit binary or hex string to decimal
 */
function toDecimal(string) {
    const n = 64;
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

function replace(latex) {
    const pattern = /0x(?:[A-Fa-f]|_\{\d+\})+/g;
    return latex.replace(pattern, (match) => {
        const clean = match.replace(/[_{}]/g, "");
        return toDecimal(clean).toString()
    });
}

/*
 * Replace hex literals with decimal in web page
 */ 
function run() {
    console.log("Running...");
    const state = calc.getState();
    state.expressions.list[0].latex = replace(mq.latex())  // TODO: not always 0
    calc.setState(state);
}