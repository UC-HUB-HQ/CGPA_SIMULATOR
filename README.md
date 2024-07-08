# CGPA Calculator

This is a React App for calculating and displaying the CGPA (Cumulative Grade Point Average) and GPA (Grade Point Average) based on user input. It allows users to add, edit, and remove course entries with their respective units and grades.

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

## Component Structure

### State Variables

- `totalNumberOfUnit`: Holds the total number of units.
- `totalCoursePoint`: Holds the total course points.
- `cgpaValue`: Holds the calculated CGPA value.
- `rows`: Holds the dynamically added course rows in an array stored using the useState hook.

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


## Contributing

Contributions are open to team members. Submit a pull request with clear message for any improvements made or bug fixes. Thank you

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
