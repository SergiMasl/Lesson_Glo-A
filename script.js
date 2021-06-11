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

showStart();

salaryAmount.addEventListener("change", showStart);

function showStart() {
  if (salaryAmount.value === "") {
    start.disabled = true;
    console.log(start, start.disabled);
    start.style.pointerEvents = "none";
  } else {
    start.disabled = false;
    console.log(start, start.disabled);
    start.style.pointerEvents = "all";
  }
}

let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  calcSaveMoney: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMounthValue.value = appData.expensesMonth;
    additionalExpensesItem.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSaveMoney();
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
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
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
      appData.expensesMonth = appData.expensesMonth + this.expenses[key];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget + appData.incomeMonth - this.expensesMonth;
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

start.addEventListener("click", appData.start);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("change", appData.rangeShow);

periodSelect.addEventListener("change", appData.rangeShow);

appData.budgetDay = 0;
appData.budgetMonth = 0;
appData.expensesMonth = 0;

appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposited();

// let newAddExpenses = "";
// for (let i = 0; i < appData.addExpenses.length; i++) {
//   let eachElOfArr = `${appData.addExpenses[i]
//     .charAt(0)
//     .toUpperCase()}${appData.addExpenses[i].slice(1)}`;
//   if (i === 0) {
//     newAddExpenses = newAddExpenses + eachElOfArr;
//   } else {
//     newAddExpenses = newAddExpenses + ", " + eachElOfArr;
//   }
// }
