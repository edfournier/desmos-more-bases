# Overview
Desmos More Bases is a small WIP Chrome Extension for the [Desmos Scientific Calculator](https://www.desmos.com/scientific) that evaluates binary and hex literals (e.g. `0b101010` or `0x2A`) in expressions. 

# Implementation
Not unsurprisingly, Desmos uses the [Desmos API](https://www.desmos.com/api/v1.9/docs/index.html), which exposes `Calculator.getState` and `Calculator.setState` methods to manipulate the calculator’s underlying state. The calculator also uses [MathQuill](https://docs.mathquill.com/en/latest/Api_Methods/), offering `MathField.latex` for extracting LaTeX-formatted user input. The site's `window` stores `Calc` and `Desmos` objects used to call these methods; however, content scripts do not have access to a web page's `window`. To get around this, DMB injects a script directly into the DOM, which communicates with the content script via event listeners attached to `document`. 
