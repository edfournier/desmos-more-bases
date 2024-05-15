Desmos More Bases is a small Chrome Extension for the [Desmos Scientific Calculator](https://www.desmos.com/scientific) that evaluates hex literals in expressions. 

# Implementation
Not unsurprisingly, Desmos uses the Desmos API, which exposes Calculator.getState and Calculator.setState methods to manipulate the calculator’s underlying state. The calculator also uses MathQuill, offering useful methods for LaTeX-formatted extracting user input.
