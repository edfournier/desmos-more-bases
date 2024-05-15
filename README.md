Desmos More Bases is a small Chrome Extension for the [Desmos Scientific Calculator](https://www.desmos.com/scientific) that evaluates hex literals in expressions. 

# Implementation
Not unsurprisingly, Desmos uses the [Desmos API](https://www.desmos.com/api/v1.9/docs/index.html), which exposes `Calculator.getState` and `Calculator.setState` methods to manipulate the calculator’s underlying state. The calculator also uses [MathQuill](https://docs.mathquill.com/en/latest/Api_Methods/), offering useful methods for LaTeX-formatted extracting user input.
