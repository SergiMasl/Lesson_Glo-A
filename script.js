'use strict';

let start = document.getElementById("start");
let cancel = document.getElementById("cancel");
let btnIncAdd = document.getElementsByTagName("button")[0];
let btnExpAdd = document.getElementsByTagName("button")[1];
let checkBox = document.querySelector('#deposit-check');
let addIncItem = document.querySelectorAll('.additional_income-item');
let budgetDayValue = document.querySelector(".result-budget_day input");
let expensesMounthValue = document.querySelector(".result-expenses_month input");
let addIncomeValue = document.querySelector(".result-additional_income input");
let addExpValue = document.querySelector(".result-additional_expenses input");
let incPeriodValue = document.querySelector('.result-income_period input');
let targetMonthValue = document.querySelector(".result-target_month input");
let salaryAmount = document.querySelector(".salary-amount");
let expensesItems = document.querySelectorAll(".expenses-items");
let addExpItem = document.querySelector('.additinal_expenses-item')
let targetAmount = document.querySelector('.target-amount')
let periodSelect =document.querySelector('.period-select')
let periodAmount =document.querySelector('.period-amount')
let budgetMonthValue = document.querySelector('.result-budget_month input')
let incomeItems = document.querySelectorAll('.income-items')


class AppData {
  
  constructor() {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];
  }

  start() {
    if (salaryAmount.value === ''){
      alert('Введите зарплату')
      return;
    }

    let allInput = document.querySelectorAll('.data input[type = text]');
      allInput.forEach(function (item) {
       item.setAttribute('disabled', 'true');
   });
      btnExpAdd.setAttribute('disabled', 'true');
      btnIncAdd.setAttribute('disabled', 'true');
      start.style.display = 'none';
      cancel.style.display = 'block';

      this.budget = +salaryAmount.value;
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.getInfoDeposit();
      this.getStatusIncome();
      this.showResult();
  };

  showResult() {
    const _this = this;
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMounthValue.value = this.expensesMonth;
      addExpValue.value = this.addExpenses.join(', ');
      addIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incPeriodValue.value = this.calcPeriod()
      periodSelect.addEventListener('change', function(){
        incPeriodValue.value = _this.calcPeriod(); 
      });
  };

  addExpensesBlock() {
      
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
      expensesItems = document.querySelectorAll(".expenses-items");
      if (expensesItems.length === 3) {
        btnExpAdd.style.display = "none";
      }
  };

  getExpenses() {
    const _this = this;
      expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector(".expenses-title").value; //???
        let cashExpenses = item.querySelector(".expenses-amount").value; //???
        if (itemExpenses !== "" && cashExpenses !== "") {
          _this.expenses[itemExpenses] = cashExpenses;
        }
      });
  };

  addIncomeBlock() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
      incomeItems = document.querySelectorAll(".income-items");
      if (incomeItems.length === 3) {
        btnIncAdd.style.display = "none"; //!!!!!!!incomePlus = incomeItems
      }
  };

  getIncome() {
    const _this = this;
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        _this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };

  getAddExpenses() {
      let addExpenses = addExpValue.value.split(',');
       const _this = this; 
      addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== "") {
          _this.addExpenses.push(item);
        }
      });
    };

  getAddIncome() {
     const _this = this;
      addIncItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== "") {
          _this.addIncome.push(itemValue);
        }
      });
    };


  getExpensesMonth() {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
    };

  getBudget() {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    };

  getTargetMonth() {
      return targetAmount.value / this.budgetMonth;
    };

  getStatusIncome() {
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

  getInfoDeposit  () {
      if (this.deposit) {
        do {
          this.percentDeposit = prompt("Какой годовой процент", 10);
        } while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === ' ' || this.percentDeposit === null);

        do {
          this.moneyDeposit = prompt("Какая сумма заложена", 10000);
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === ' ' || this.moneyDeposit === null);
      }
    };
    
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  };

  reset() {
    
    let inputTextData = document.querySelectorAll('.data input[type = text]');
    console.log(inputTextData)

    let resultTextAll = document.querySelectorAll('.result input[type = text]');
      console.log(resultTextAll)

    inputTextData.forEach(function (elem) {
        console.log('YEA')
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    resultTextAll.forEach(function (elem) {
      elem.value = '';
    });
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      btnExpAdd.style.display = 'block';
    }

  cancel.style.display = 'none';
  start.style.display ='block';
  btnExpAdd.removeAttribute('disabled')
  btnIncAdd.removeAttribute('disabled')
  checkBox.checked = false;

  }

  eventListenersOfBtn() {

    start.addEventListener("click", appData.start.bind(appData));



    btnExpAdd.addEventListener("click", appData.addExpensesBlock);
    btnIncAdd.addEventListener("click", appData.addIncomeBlock);
    cancel.addEventListener("click", appData.reset.bind(appData));

    periodSelect.addEventListener("change", function(){
      periodAmount.innerHTML = periodSelect.value;
    });

    let addExp = [];
    for (let i = 0; i < appData.addExpenses.length; i++){
      let element = appData.addExpenses[i].trim();
      element  =element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
      addExp.push(element);
    }
  }
};


const appData = new AppData();
appData.eventListenersOfBtn();
















