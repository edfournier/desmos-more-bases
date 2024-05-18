// Recieve order to execute or state updates from content script
document.addEventListener("dmb-run", run);  
document.addEventListener("dmb-update-settings", (e) => {
    console.log("New settings: " + e.detail);
});

/*
 * Convert n-bit binary or hex string to decimal
 */
function toDecimal(string) {
    const n = 64;
    let num = Number(string); 
    // Sign extend
    if ((num >> (n - 1)) & 1) {
        num |= -1 << n;
    }
    return num; 
}

/*
 * Extract and clean hex tokens from given latex string
 */
function extractHex(latex) {
    const result = [];
    for (let i = latex.indexOf("0x"); i != -1; i = latex.indexOf("0x", i)) {
        let j = i;
        while (j < latex.length && /[x0-9a-fA-F_{}]/g.test(latex.charAt(j))) {
            j++;
        }
        while (latex.charAt(j - 1) === '}' && latex.charAt(j - 2) === '}') {
            j--;
        }
        const token = latex.substring(i, j);
        result.push({token: token, clean: token.replace(/[^x0-9a-fA-F]/g, "")});
        i = j;
    }
    return result;
}

const mathField = document.getElementsByClassName(
    "dcg-math-field dcg-focus dcg-mq-editable-field dcg-mq-math-mode"
    )[0];
const mq = window.Desmos.MathQuill.MathField(mathField);	
const calc = window.Calc;

function run() {
    let latex = mq.latex();
    extractHex(latex).forEach((hex) => {
        latex = latex.replace(hex.token, toDecimal(hex.clean));
    });
    const state = calc.getState();
    mq.latex(latex);
    state.expressions.list[0].latex = mq.latex();  // TODO: not always 0
    calc.setState(state);
}