let money = 120000;
let income = "freelance";
let addExpenses = "Internet, Taxi, Communal";
let deposit = true;
let mission = 50000;
let period = 11;

//alert("Hello world");

// console.log(typeof money, typeof income, typeof deposit);
// console.log(addExpenses.length);
// console.log(`Период равен ${period} месяцев`);
// console.log(`Цель заработать ${mission} долларов`);

let newExp = addExpenses.toLowerCase();
const newArr = newExp.split(", ");
//console.log(newArr);

let budgetDay = money / 30;
//console.log(budgetDay);

//lesson 03
money = +prompt("What is your salary?");
addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
deposit = confirm("Есть ли у вас депозит в банке?");
console.log(
  `money: ${typeof money}, addExpenses: ${typeof addExpenses}, deposit: ${typeof deposit}`
);

let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");

let budgetMonth = money - (amount1 + amount2);
console.log(`Бюджет на месяц: ${budgetMonth} рублей`);

let totalMonth = Math.ceil(mission / budgetMonth);
console.log(`Цель будет достигнута за ${totalMonth} месяцев`);

budgetDay = Math.floor(budgetMonth / 30);
console.log(`Бюджет на день: ${budgetDay} рублей`);

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay > 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay <= 0) {
  console.log("Что то пошло не так");
} else {
  console.log("К сожалению у вас уровень дохода ниже среднего");
}
