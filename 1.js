let money = 120000;
let income = "freelance";
let addExpenses = "Internet, Taxi, Communal";
let deposit = true;
let mission = 50000;
let period = 11;
let budgetDay;

let showTypeOf = function (data) {
  console.log(`${data} is ${typeof data}`);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let newExp = addExpenses.toLowerCase();
const newArr = newExp.split(", ");

//lesson 03
money = +prompt("What is your salary?");
addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
deposit = confirm("Есть ли у вас депозит в банке?");

let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");

let arr = [expenses1, expenses2];
console.log(arr);

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

///

let getExpensesMonth = function () {
  return amount1 + amount2;
};
console.log("total of cost of living: " + getExpensesMonth());

let getAccumulatedMonth = function () {
  return money - getExpensesMonth();
};

let accumuLatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
  return mission / Math.ceil(accumuLatedMonth);
};

budgetDay = accumuLatedMonth / 30;
console.log(`Бюджет на день: ${budgetDay}`);
