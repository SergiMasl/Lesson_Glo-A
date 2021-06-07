let isNumber = function (n) {
  return !isNaN(parseFloat(n) && isFinite(n));
};

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?", 50000);
    } while (!isNumber(money));
  };
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  calcSaveMoney: 0,
  mission: 50000,
  period: 3,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный заработок?")) {
      let itemIncome;
      do {
        itemIncome = prompt("Какой у вас дополнительный заработок?", "Таксую");
      } while (isNumber(itemIncome));

      let cashIncome;
      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt(
      "Перечислети возможные расходы через запятую",
      "Садик, Комуналка, бензин, Квартплата"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли депозит в банке?");

    for (i = 0; i < 2; i++) {
      let ammountSum = 0;
      const expenstNew = prompt("Введите обязательную статью расходов?");
      for (let key in this.expenses) {
        if (key === expenstNew) {
          alert("Введено одинаковое значения! Данные будут перезаписаны.");
        }
      }
      do {
        ammountSum = prompt("Во сколько это обойдется?");
      } while (!isNumber(ammountSum));
      //sum = +ammountSum + sum;
      this.expenses[expenstNew] = +ammountSum;
    }
  },

  getExpensesMonth: function () {
    for (let key in this.expenses) {
      appData.expensesMonth = appData.expensesMonth + this.expenses[key];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },

  getTargetMonth: function () {
    let targetGoal = this.mission / this.budgetMonth;
    if (targetGoal > 0) {
      console.log(`Цель будет достигнута через: ${targetGoal} месяцев`);
    } else {
      console.log("Цель не будет достигнута");
    }
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

  calcSaveMoney: function () {
    return this.budgetMonth * this.period;
  },
};

appData.budget = money;
appData.budgetDay = 0;
appData.budgetMonth = 0;
appData.expensesMonth = 0;

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposited();

console.log("Расходы за месяц: " + appData.expensesMonth);
console.log("Уровень дохода: " + money);

console.log("\n");
console.log("Наша программа включает в себя данные: ");
console.group();
for (let key in appData) {
  console.log(key, appData[key]);
}
console.groupEnd();

let newAddExpenses = "";
for (let i = 0; i < appData.addExpenses.length; i++) {
  let eachElOfArr = `${appData.addExpenses[i]
    .charAt(0)
    .toUpperCase()}${appData.addExpenses[i].slice(1)}`;
  if (i === 0) {
    newAddExpenses = newAddExpenses + eachElOfArr;
  } else {
    newAddExpenses = newAddExpenses + ", " + eachElOfArr;
  }
}
console.log(newAddExpenses);
