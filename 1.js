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

function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}
let costLivingOfMonth = getExpensesMonth(amount1, amount2);

function getAccumulatedMonth(money, costLivingOfMonth) {
  return money - costLivingOfMonth;
}
let accumulatedMonth = getAccumulatedMonth(money, costLivingOfMonth);
console.log(accumulatedMonth);

function getTargetMonth(mission, accumulatedMonth) {
  return mission / accumulatedMonth;
}
let targetMonth = getTargetMonth(mission, accumulatedMonth);
console.log(`Cрок достижения цели: ${targetMonth} месяцев`);

function FuncBudgetDay() {
  budgetDay = Math.ceil(accumulatedMonth / 30);
}
FuncBudgetDay();
console.log(`Бюджет на день: ${budgetDay}`);
