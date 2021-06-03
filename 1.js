let isNumber = function (n) {
  return !isNaN(parseFloat(n) && isFinite(n));
};

let money;
let income = "freelance";
let addExpenses = prompt("Перечислети возможные расходы через запятую");
let deposit = true;
const mission = 50000;
let period = 3;
let budgetDay;

///

let showTypeOf = function (data) {
  console.log(`${data} is ${typeof data}`);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let start = function () {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
};
start();

let expenses = [];

//console.log(addExpenses.toLocaleLowerCase().split(","));

let getExpensesMonth = function () {
  let sum = 0;

  for (i = 0; i < 2; i++) {
    let ammountSum = 0;
    expenses[i] = prompt("Введите обязательную статью расходов?");
    // sum += +prompt("Во сколько это обойдется?");
    do {
      ammountSum = prompt("Во сколько это обойдется?");
    } while (!isNumber(ammountSum));
    sum = +ammountSum + sum;
  }
  console.log(sum);
  return sum;
};

console.log(expenses);
// for (let i = 0; i < expenses.length; i++) {
//   console.log(expenses[i].toLowerCase());
// }

let expensesAmount = getExpensesMonth();
console.log("total of cost of living: " + expensesAmount);

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let accumuLatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
  let targetGoal = mission / accumuLatedMonth;
  if (targetGoal > 0) {
    console.log(`Цель будет достигнута через: ${targetGoal} месяцев`);
  } else {
    console.log("Цель не будет достигнута");
  }
};
getTargetMonth();

budgetDay = accumuLatedMonth / 30;
console.log(`Бюджет на день: ${budgetDay}`);

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay > 600 && budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay <= 0) {
    return "Что то пошло не так";
  } else {
    return "К сожалению у вас уровень дохода ниже среднего";
  }
};
console.log(getStatusIncome());
