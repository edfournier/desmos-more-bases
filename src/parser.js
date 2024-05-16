import { mq, calc } from "./window.js";

mq.latex("1 + 2")
const state = calc.getState();
state.expressions.list[0].latex = mq.latex()	// Not always 0. 
calc.setState(state);

// Manipulate math field
mq.keystroke("Backspace")
mq.latex()	
mq.latex("1 + 2")	

function convert(hex) { 
    const n = 4;
    const hex = "0xB";  

    // Two's complement on n-bit number
    let num = Number(hex); 
    if ((num >> (n - 1)) & 1) {
        num |= -1 << n;
    }
    return num; 
}

// Parsing latex
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
