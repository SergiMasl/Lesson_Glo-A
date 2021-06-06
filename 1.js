let isNumber = function (n) {
  return !isNaN(parseFloat(n) && isFinite(n));
};

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
  };
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function () {
    let addExpenses = prompt("Перечислети возможные расходы через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли депозит в банке?");

    //

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
};

appData.getExpensesMonth = function () {
  for (let key in this.expenses) {
    appData.expensesMonth = appData.expensesMonth + this.expenses[key];
  }
};

appData.getBudget = function () {
  this.budgetMonth = this.budget - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};

appData.getTargetMonth = function () {
  let targetGoal = this.mission / this.budgetMonth;
  if (targetGoal > 0) {
    console.log(`Цель будет достигнута через: ${targetGoal} месяцев`);
  } else {
    console.log("Цель не будет достигнута");
  }
};

appData.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (this.budgetDay <= 0) {
    return "Что то пошло не так";
  } else {
    return "К сожалению у вас уровень дохода ниже среднего";
  }
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

console.log("Расходы за месяц: " + appData.expensesMonth);
console.log("Уровень дохода: " + money);

console.log("\n");
console.log("Наша программа включает в себя данные: ");
console.group();
for (let key in appData) {
  console.log(key, appData[key]);
}
console.groupEnd();
