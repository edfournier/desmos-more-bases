Desmos More Bases is a small WIP Chrome Extension for the [Desmos Scientific Calculator](https://www.desmos.com/scientific) that evaluates hex literals in expressions. 

# Implementation
Not unsurprisingly, Desmos uses the [Desmos API](https://www.desmos.com/api/v1.9/docs/index.html), which exposes `Calculator.getState` and `Calculator.setState` methods to manipulate the calculator’s underlying state. The calculator also uses [MathQuill](https://docs.mathquill.com/en/latest/Api_Methods/), offering useful methods for extracting LaTeX-formatted user input.

# Planned Features
- Convert hex 
- Convert binary
- Convert with right-click
- Convert multiple expressions
- Convert RHS
- Set storage size
- Set signed or unsigned
- Default settings
- Other ideas: undo/history, custom keyboard shortcuts (chrome.commands), in-page UI