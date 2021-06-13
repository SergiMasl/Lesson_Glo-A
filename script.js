let isNumber = function (n) {
  return !isNaN(parseFloat(n) && isFinite(n));
};

let start = document.getElementById("start");
let btnPlus = document.getElementsByTagName("button");
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let buttonPlusElSecond = document.getElementsByTagName("button")[1];
let depositCheck = document.querySelector("#deposit-check");
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
let accunulatedMotnthCalue = document.getElementsByClassName(
  "accumulated_month_value"
)[0];
let budgetDayValue = document.getElementsByClassName("budget_day-value")[0];
let expensesMounthValue = document.getElementsByClassName(
  "expenses_month-value"
)[0];
let additionalIncomeValue = document.getElementsByClassName(
  "additional_income-value"
)[0];
let additionalExpensesValue = document.querySelector(
  ".additional_expenses-value"
)[0];
let incomePeriodValue = document.getElementsByClassName(
  "income_period-value"
)[0];
let targetMonthValue = document.getElementsByClassName("target_month-value")[0];

let salaryAmount = document.querySelector(".salary-amount");
let incomeTitle = document.querySelector(".income-title");
let expensesTitle = document.querySelector(".expenses-title");
let expensesItems = document.querySelectorAll(".expenses-items");
let additionalExpenses = document.querySelector(".additional_expenses");
let targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select");
let budgetMonthValue = document.querySelector(".budget_month-value");
let expensesAmount = document.querySelector(".expenses-amount");
let additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
let incomeItems = document.querySelectorAll(".income-items");
let isCalculated = false;
let cancel = document.querySelector("#cancel");
let inputText = document.querySelectorAll("input[type='text']");

showStart();

salaryAmount.addEventListener("change", showStart);

function showStart() {
  if (salaryAmount.value === "") {
    start.disabled = true;
    start.style.pointerEvents = "none";
  } else {
    start.disabled = false;
    start.style.pointerEvents = "all";
  }
}

function startCulc() {
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();
  blockAll();
}

let appData = {
  init: function () {
    appData.budget = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.addExpenses = [];
    appData.deposit = false;
    appData.percentDeposit = 0;
    appData.moneyDeposit = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.expensesMonth = 0;
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMounthValue.value = this.expensesMonth;
    additionalExpensesItem.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSaveMoney();
  },

  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },

  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  },

  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth = this.expensesMonth + this.expenses[key];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (this.budgetDay <= 0) {
      return "Что то пошло не так";
    } else {
      return "К сожалению у вас уровень дохода ниже среднего";
    }
  },

  getInfoDeposited: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt("Какой годовой процент", 10);
      } while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt("Какая сумма заложена", 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },

  rangeShow: function () {
    let showRange = document.querySelector(".period-amount");
    showRange.textContent = periodSelect.value;
    incomePeriodValue.value = appData.calcSaveMoney();
  },

  calcSaveMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
};

appData.init();
appData.start = startCulc.bind(appData);

start.addEventListener("click", appData.start);
cancel.addEventListener("click", reset);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("change", appData.rangeShow);

appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposited();

function blockAll() {
  inputText.forEach(function (item) {
    item.disabled = true;
  });
  cancel.style.display = "block";
  start.style.display = "none";
}

function reset() {
  start.style.display = "block";
  cancel.style.display = "none";
  inputText.forEach(function (item) {
    item.disabled = false;
    item.value = "";
  });
  appData.init();
  appData.showResult();
}
