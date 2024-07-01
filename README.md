# CGPA Calculator Component

This is a React component for calculating and displaying the CGPA (Cumulative Grade Point Average) and GPA (Grade Point Average) based on user input. It allows users to add, edit, and remove course entries with their respective units and grades.

## Features

- Add courses with their units and grades.
- Calculate GPA and CGPA.
- Validate user input.
- Dynamic row addition and deletion.

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/cgpa-calculator.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd cgpa-calculator
    ```

3. **Install the dependencies:**

    ```sh
    npm install
    ```

## Usage

1. **Import the Calculator component:**

    ```js
    import Calculator from './path/to/Calculator';
    ```

2. **Include the component in your application:**

    ```js
    function App() {
        const handleScore = (score) => {
            console.log("New CGPA Score:", score);
        };

        return (
            <div className="App">
                <Calculator handleScore={handleScore} />
            </div>
        );
    }

    export default App;
    ```

## Component Structure

### State Variables

- `totalNumberOfUnit`: Holds the total number of units.
- `totalCoursePoint`: Holds the total course points.
- `cgpaValue`: Holds the calculated CGPA value.
- `rows`: Holds the dynamically added course rows.

### Functions

- `rowElement(index)`: Creates a new course row element.
- `addRow()`: Adds a new course row to the list.
- `removeRow(selectedRowKey)`: Removes a specific course row from the list.
- `getGpa()`: Calculates the GPA and CGPA based on user input.
- `inputValidation()`: Validates user input for course units and grades.

## Input Validation

- Ensures that all input fields have valid values.
- Highlights invalid fields with a red border and shows an error message.
- Validates that grades are between 0 and 5 and units are non-negative.

## Styling

- The component uses Tailwind CSS for styling.
- Ensure you have Tailwind CSS set up in your project to use this component as-is.

## Example

```js
import React from 'react';
import Calculator from './components/Calculator';

function App() {
    const handleScore = (score) => {
        console.log("New CGPA Score:", score);
    };

    return (
        <div className="App">
            <Calculator handleScore={handleScore} />
        </div>
    );
}

export default App;
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README to better fit your project's specifics, such as adding more detailed installation instructions, contributing guidelines, or expanding the usage section with additional examples.
