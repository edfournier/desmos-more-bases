// Recieve order to execute or state updates from content script
document.addEventListener("dmb-run", run);  
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

/*
 * Returns a function that searches a given latex string for tokens starting 
 * with prefix and containing characters in the RegEx class digits
 * 
 * E.g. extractBase("0x", /[0-9a-fA-F_{}]/)("0x_{2}A") --> [{token: "0x_{2}A", clean: "0x2A"}]
 * E.g. extractBase("0b", /01/)("0b_{10}")             --> [{token: "0b_{10}", clean: "0b10"}]
 */
function extractBase(prefix, digits) {
    return (latex) => {
        const result = [];
        for (let i = latex.indexOf(prefix); i != -1; i = latex.indexOf(prefix, i)) {
            let j = i + 2;
            while (j < latex.length && digits.test(latex.charAt(j))) {
                j++;
            }
            while (latex.charAt(j - 1) === '}' && latex.charAt(j - 2) === '}') {
                j--;
            }
            const token = latex.substring(i, j);
            result.push({token: token, clean: token.replace(/[_{}]/g, "")});
            i = j;
        }
        return result;
    }
}  

const extractHex = extractBase("0x", /[0-9a-fA-F_{}]/);
const extractBinary = extractBase("0b", /01/);

const mathField = document.getElementsByClassName(
    "dcg-math-field dcg-focus dcg-mq-editable-field dcg-mq-math-mode"
    )[0];
const mq = window.Desmos.MathQuill.MathField(mathField);	
const calc = window.Calc;

/*
 * Replace hex literals with decimal in web page
 */ 
function run() {
    let latex = mq.latex();
    extractHex(latex).forEach((hex) => {
        latex = latex.replace(hex.token, toDecimal(hex.clean));
    });
    const state = calc.getState();
    state.expressions.list[0].latex = latex;  // TODO: not always 0
    calc.setState(state);
}