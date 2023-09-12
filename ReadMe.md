# Budget & Expense Tracker App

The Budget and Expense Tracker App is a simple web application designed to help you manage your income and expenses. It allows you to track your earnings, spending, and available funds. The app uses JavaScript classes, switch statements, and try-catch-finally statements to provide a seamless user experience.

## How to Use

1. **Add Income**: To add income, enter a description and the amount you earned in the "Description" and "Amount" fields, respectively. Then, click the "Add Income" button. Your income will be displayed in the "Income" section, and the total earned amount will be updated at the top.

2. **Add Expense**: Similarly, to add an expense, enter a description and the expense amount in the respective fields, then click the "Add Expense" button. The expense will be listed in the "Expenses" section, and the total spent will be updated.

3. **Delete Item**: If you want to remove an income or expense entry, simply click the trash can icon (🗑️) next to the item. The item will be deleted from the list, and the totals will be recalculated.

4. **Track Balances**: The app continuously calculates and displays your total income, total expenses, and the available balance at the top of the page. You can see your financial status at a glance.

## Code Structure

The app is built using JavaScript classes to organize and manage data and user interface elements. Here's how classes and other features are used:

- **Item Class**: The `Item` class is used to create income and expense items. It has properties for `id`, `description`, and `amount`.

- **ItemCtrl Class**: This class is responsible for managing data, including adding, deleting, and retrieving items. It uses switch statements in the `performOperation` method to handle different operations such as adding income or expenses.

```javascript
  switch (operation) {
    case "addIncome":
      this.addMoney(description, amount);
      break;
    case "addExpense":
      this.addMoney(description, -amount); // Treat expense as negative
      break;
    case "deleteItem":
      this.deleteAmountArr(description);
      break;
    default:
      console.error("Invalid operation");
  }
```

- **UICtrl Class**: The `UICtrl` class handles user interface interactions. It updates the display when income or expenses are added and calculates and displays the earned, spent, and available amounts.

- **App Class**: The `App` class acts as the controller, connecting the data and UI classes. It sets up event listeners to respond to user actions like adding or deleting items.



## Error Handling

The app incorporates error handling using try-catch-finally statements. If an error occurs during data processing or user input, it's caught and logged to the console, ensuring that the app continues to run smoothly.

By following these simple instructions, you can effectively manage your finances using the Budget App while exploring how classes, switch statements, and error handling work together to create a robust web application.

Happy managing your expenses keeping the budget right!
