# Pythonic React Calculator

This project is an interactive and responsive calculator web application with the aesthetic of a Python REPL (Read-Eval-Print Loop). It's built using modern web technologies to provide a familiar and efficient user experience for developers and enthusiasts alike.

## Features

- **Python REPL Aesthetic**: The UI is designed to look and feel like a command-line Python interpreter, with `>>>` prompts and color-coded output.
- **Interactive Interface**: Supports both keyboard input for rapid calculations and a clickable button interface for ease of use on all devices.
- **Responsive Design**: The layout adapts seamlessly to different screen sizes, ensuring a great experience on desktops, tablets, and mobile phones.
- **Calculation History**: All entered expressions and their results are displayed in a scrollable history log, just like a real console session.
- **Error Handling**: Invalid expressions are gracefully handled and display a user-friendly error message without crashing the app.
- **Standard Operations**: Supports basic arithmetic operations, parentheses for grouping, and more, powered by the robust `math.js` library.

## Tech Stack

- **React**: A declarative, component-based JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that adds type safety and improves developer experience.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom, modern designs.
- **math.js**: A comprehensive math library for JavaScript and Node.js that provides a safe and powerful `evaluate` function to parse mathematical expressions.

## How to Use

1.  **Input an Expression**:
    -   Type a mathematical expression (e.g., `(2 + 3) * 4`) directly into the input field at the bottom of the screen.
    -   Alternatively, use the on-screen buttons to construct your expression.
2.  **Evaluate**:
    -   Press the `Enter` key on your keyboard.
    -   Click the `=` button.
3.  **Control Buttons**:
    -   `C`: Clears the current input field.
    -   `DEL`: Deletes the last character from the input (backspace).
    -   `()`: Add parentheses to your expressions.
    -   `+`, `-`, `*`, `/`: Standard arithmetic operators.

The result of your calculation will be displayed, and the entire exchange will be added to the history log above.
