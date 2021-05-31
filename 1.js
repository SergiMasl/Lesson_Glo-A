let money = 1200;
let income = "freelance";
let addExpenses = "Internet, Taxi, Communal";
let deposit = true;
let mission = 50000;
let period = 11;

//alert("Hello world");

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

let newExp = addExpenses.toLowerCase();
const newArr = newExp.split();
console.log(newArr);

budgetDay = money / 30;
console.log(budgetDay);
