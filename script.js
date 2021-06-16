'use strict';

const start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  btnIncAdd = document.getElementsByTagName("button")[0],
  btnExpAdd = document.getElementsByTagName("button")[1],
  checkBox = document.querySelector('#deposit-check'),
  addIncItem = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.querySelector(".result-budget_day input"),
  expensesMounthValue = document.querySelector(".result-expenses_month input"),
  addIncomeValue = document.querySelector(".result-additional_income input"),
  addExpValue = document.querySelector(".result-additional_expenses input"),
  incPeriodValue = document.querySelector('.result-income_period input'),
  targetMonthValue = document.querySelector(".result-target_month input"),
  salaryAmount = document.querySelector(".salary-amount"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  addExpItem = document.querySelector('.additinal_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect =document.querySelector('.period-select'),
  periodAmount =document.querySelector('.period-amount'),
  budgetMonthValue = document.querySelector('.result-budget_month input'),
  incomeItems = document.querySelectorAll('.income-items');

class AppData {
  
  constructor(budget, budgetDay, budgetMonth, incomeMonth = 0, expensesMonth = 0, percentDeposit = 0, moneyDeposit = 0, income = {}, addIncome = [], expenses = {}, addExpenses = [], deposit = false) {

    this.budget = budget;
    this.budgetDay = budgetDay;
    this.budgetMonth = budgetMonth;
    this.income = income;
    this.incomeMonth = incomeMonth;
    this.addIncome = addIncome;
    this.expenses = expenses;
    this.expensesMonth = expensesMonth;
    this.deposit = deposit;
    this.percentDeposit = percentDeposit;
    this.moneyDeposit = moneyDeposit;
    this.addExpenses = addExpenses;
  }

  start() {
    if (salaryAmount.value === ''){
      alert('Введите зарплату')
      return;
    }

    const allInput = document.querySelectorAll('.data input[type = text]');
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
      expensesItems[0] = document.querySelectorAll(".expenses-items");
      if (expensesItems.length === 3) {
        btnExpAdd.style.display = "none";
      }
  };

  getExpenses() {
      expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector(".expenses-title").value;
        let cashExpenses = item.querySelector(".expenses-amount").value;
        if (itemExpenses !== "" && cashExpenses !== "") {
          this.expenses[itemExpenses] = cashExpenses;
        }
      });
  };

  addIncomeBlock() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
      incomeItems[0] = document.querySelectorAll(".income-items");
      if (incomeItems.length === 3) {
        btnIncAdd.style.display = "none"; 
      }
  };

  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };

  getAddExpenses() {
      let addExpenses = addExpValue.value.split(',');
      addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== "") {
          this.addExpenses.push(item);
        }
      });
    };

  getAddIncome() {
      addIncItem.forEach((item) => {
        const itemValue = item.value.trim();
        if (itemValue !== "") {
          this.addIncome.push(itemValue);
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
    
    const inputTextData = document.querySelectorAll('.data input[type = text]');
    const resultTextAll = document.querySelectorAll('.result input[type = text]');

    inputTextData.forEach(function (elem) {
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

    const addExp = [];
    for (let i = 0; i < appData.addExpenses.length; i++){
      let element = appData.addExpenses[i].trim();
      element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
      addExp.push(element);
    }
  }
};


const appData = new AppData();
appData.eventListenersOfBtn();
















