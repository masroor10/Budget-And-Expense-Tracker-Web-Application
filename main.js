// Item Controller Class
class Item {
  constructor(id, description, amount) {
    this.id = id;
    this.description = description;
    this.amount = amount;
  }
}

class ItemCtrl {
  constructor() {
    this.data = {
      items: [],
    };
  }

  logData() {
    return this.data;
  }

  performOperation(operation, description, amount) {
    try {
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
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  }

  addMoney(description, amount) {
    try {
      // Create random id
      let ID = this.createID();
      // Create new item
      let newMoney = new Item(ID, description, amount);
      // Push it into the array
      this.data.items.push(newMoney);

      return newMoney;
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  }

  createID() {
    try {
      // Create random id number between 0 and 10000
      const idNum = Math.floor(Math.random() * 10000);
      return idNum;
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  }

  getIdNumber(item) {
    // Get the item id
    const amountId = item.parentElement.id;
    // Break the id into an array
    const itemArr = amountId.split("-");
    // Get the id number
    const id = parseInt(itemArr[1]);

    return id;
  }

  deleteAmountArr(id) {
    // Get all the ids
    const ids = this.data.items.map(function (item) {
      // Return item with id
      return item.id;
    });
    // Get index
    const index = ids.indexOf(id);
    // Remove item
    this.data.items.splice(index, 1);
  }
}

// UI Controller Class
class UICtrl {
  constructor() {
    this.UISelectors = {
      incomeBtn: "#add__income",
      expenseBtn: "#add__expense",
      description: "#description",
      amount: "#amount",
      moneyEarned: "#amount__earned",
      moneyAvailable: "#amount__available",
      moneySpent: "#amount__spent",
      incomeList: "#income__container",
      expensesList: "#expenses__container",
      incomeItem: ".income__amount",
      expenseItem: ".expense__amount",
      itemsContainer: ".items__container",
    };
  }

  getSelectors() {
    return this.UISelectors;
  }

  getDescriptionInput() {
    return {
      descriptionInput: document.querySelector(this.UISelectors.description)
        .value,
    };
  }

  getValueInput() {
    return {
      amountInput: document.querySelector(this.UISelectors.amount).value,
    };
  }

  addIncomeItem(item) {
    try {
      // Create new div
      const div = document.createElement("div");
      // Add class
      div.classList = "item income";
      // Add id to the item
      div.id = `item-${item.id}`;
      // Add HTML
      div.innerHTML = `
          <h4>${item.description}</h4>
          <div class="item__income">
              <p class="symbol">$</p>
              <span class="income__amount">${item.amount}</span>
          </div>
          <i class="far fa-trash-alt"></i>
          `;
      // Insert income into the list
      document
        .querySelector(this.UISelectors.incomeList)
        .insertAdjacentElement("beforeend", div);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  clearInputs() {
    document.querySelector(this.UISelectors.description).value = "";
    document.querySelector(this.UISelectors.amount).value = "";
  }

  updateEarned() {
    // All income elements
    const allIncome = document.querySelectorAll(this.UISelectors.incomeItem);
    // Array with all incomes
    const incomeCount = [...allIncome].map((item) => +item.innerHTML);
    // Calculate the total earned
    const incomeSum = incomeCount.reduce(function (a, b) {
      return a + b;
    }, 0);
    // Display the total earned
    const earnedTotal = (document.querySelector(
      this.UISelectors.moneyEarned
    ).innerHTML = incomeSum.toFixed(2));
  }

  addExpenseItem(item) {
    // Create new div
    const div = document.createElement("div");
    // Add class
    div.classList = "item expense";
    // Add id to the item
    div.id = `item-${item.id}`;
    // Add HTML
    div.innerHTML = `
          <h4>${item.description}</h4>
          <div class="item__expense">
              <p class="symbol">$</p>
              <span class="expense__amount">${item.amount}</span>
          </div>
          <i class="far fa-trash-alt"></i>
          `;
    // Insert income into the list
    document
      .querySelector(this.UISelectors.expensesList)
      .insertAdjacentElement("beforeend", div);
  }

  updateSpent() {
    // All expenses elements
    const allExpenses = document.querySelectorAll(this.UISelectors.expenseItem);
    // Array with all expenses
    const expenseCount = [...allExpenses].map((item) => +item.innerHTML);
    // Calculate the total
    const expenseSum = expenseCount.reduce(function (a, b) {
      return a + b;
    }, 0);
    // Display the total spent
    const expensesTotal = (document.querySelector(
      this.UISelectors.moneySpent
    ).innerHTML = expenseSum);
  }

  updateAvailable() {
    const earned = document.querySelector(this.UISelectors.moneyEarned);
    const spent = document.querySelector(this.UISelectors.moneySpent);
    const available = document.querySelector(this.UISelectors.moneyAvailable);
    available.innerHTML = (+earned.innerHTML - +spent.innerHTML).toFixed(2);
  }

  deleteAmount(id) {
    // Create the id we will select
    const amountId = `#item-${id}`;
    // Select the amount with the id we passed
    const amountDelete = document.querySelector(amountId);
    // Remove from UI
    amountDelete.remove();
  }
}

// App Controller Class
class App {
  constructor(itemCtrl, UICtrl) {
    this.itemCtrl = itemCtrl;
    this.UICtrl = UICtrl;
  }

  loadEventListeners() {
    // Get UI selectors
    const UISelectors = this.UICtrl.getSelectors();
    // Add new income
    document
      .querySelector(UISelectors.incomeBtn)
      .addEventListener("click", () => this.addIncome());
    // Add new expense
    document
      .querySelector(UISelectors.expenseBtn)
      .addEventListener("click", () => this.addExpense());
    // Delete item
    document
      .querySelector(UISelectors.itemsContainer)
      .addEventListener("click", (e) => this.deleteItem(e));
  }

  addIncome() {
    try {
      // Get description and amount values
      const description = this.UICtrl.getDescriptionInput();
      const amount = this.UICtrl.getValueInput();
      // If inputs are not empty
      if (description.descriptionInput !== "" && amount.amountInput !== "") {
        // Add new item
        const newMoney = this.itemCtrl.addMoney(
          description.descriptionInput,
          amount.amountInput
        );
        // Add item to the list
        this.UICtrl.addIncomeItem(newMoney);
        // Clear inputs
        this.UICtrl.clearInputs();
        // Update earned
        this.UICtrl.updateEarned();
        // Calculate money available
        this.UICtrl.updateAvailable();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  }

  addExpense() {
    try {
      // Get description and amount values
      const description = this.UICtrl.getDescriptionInput();
      const amount = this.UICtrl.getValueInput();
      // If inputs are not empty
      if (description.descriptionInput !== "" && amount.amountInput !== "") {
        // Add new item
        const newMoney = this.itemCtrl.addMoney(
          description.descriptionInput,
          amount.amountInput
        );
        // Add item to the list
        this.UICtrl.addExpenseItem(newMoney);
        // Clear inputs
        this.UICtrl.clearInputs();
        // Update total spent
        this.UICtrl.updateSpent();
        // Calculate money available
        this.UICtrl.updateAvailable();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  }

  deleteItem(e) {
    if (e.target.classList.contains("far")) {
      // Get id number
      const id = this.itemCtrl.getIdNumber(e.target);
      // Delete amount from UI
      this.UICtrl.deleteAmount(id);
      // Delete amount from data
      this.itemCtrl.deleteAmountArr(id);
      // Update earned
      this.UICtrl.updateEarned();
      // Update total spent
      this.UICtrl.updateSpent();
      // Calculate money available
      this.UICtrl.updateAvailable();
    }

    e.preventDefault();
  }

  init() {
    this.loadEventListeners();
  }
}

// Initialize the App
const itemCtrl = new ItemCtrl();
const UiCtrl = new UICtrl();
const app = new App(itemCtrl, UiCtrl);

app.init();
