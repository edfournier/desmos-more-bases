// Recieve messages from content script
document.addEventListener("dmb-content-update", (e) => {
    console.log("content.js recieved: " + e.detail.state);
});

const mathField = document.getElementsByClassName(
    "dcg-math-field dcg-focus dcg-mq-editable-field dcg-mq-math-mode"
    )[0];
const mq = window.Desmos.MathQuill.MathField(mathField);	
const calc = window.Calc;

// Manipulate state
mq.latex("1 + 2")
const state = calc.getState();
state.expressions.list[0].latex = mq.latex()	// Not always 0. 
calc.setState(state);

function convert(hex) { 
    const n = 4;
    let num = Number(hex); 
    // Sign extend
    if ((num >> (n - 1)) & 1) {
        num |= -1 << n;
    }
    return num; 
}

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
        token = latex.substring(i, j);
        result.push([token, token.replace(/[^x0-9a-fA-F]/g, "")]);
        i = j;
    }
    return result;
}