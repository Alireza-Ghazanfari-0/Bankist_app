'use strict';

//DATA
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],

  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],

  locale: 'fa-IR',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],

  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

////////////////////////////////////////////////// define elements
const containerApp = document.querySelector('.a-app-container');
const movementWindow = document.querySelector('.a-movements-window');
const userName = document.querySelector('.a-user-in');
const passWord = document.querySelector('.a-pin-in');
const enterAccount = document.querySelector('.a-enter-account');
const welCome = document.querySelector('.a-welcome');
const sumIn = document.querySelector('.a-sum-in');
const sumOut = document.querySelector('.a-sum-out');
const sumInterest = document.querySelector('.a-interest');
const currentBalanace = document.querySelector('.a-current-balance');
const transferEnter = document.querySelector('.a-transfer-enter');
const transferTo = document.querySelector('.a-transfer-to');
const transferAmount = document.querySelector('.a-transfer-amount');
const loanAmount = document.querySelector('.a-loan');
const loanEnter = document.querySelector('.a-loan-enter');
const closeAccountButton = document.querySelector('.a-enter-close');
const closePin = document.querySelector('.a-pin-close');
const closeUser = document.querySelector('.a-user-close');
const sortOrder = document.querySelector('.a-sort');
const currentTime = document.querySelector('.a-current-time');
const closeTimer = document.querySelector('.a-end-timer');

movementWindow.innerHTML = '';

//define user for accounts
accounts.forEach(value => {
  value.user = value.owner
    .toLowerCase()
    .split(' ')
    .map(value => value[0])
    .join('');
});

//enter account --
let currentAccount;

const enterfunc = function (e) {
  e.preventDefault();
  //console.log('ok');
  currentAccount = accounts.find(item => item.user === userName.value);

  if (
    userName.value === currentAccount.user &&
    Number(passWord.value) === currentAccount.pin
  ) {
    containerApp.classList.remove('opacity-0');
    movementWindow.innerHTML = '';
    //console.log('okkk');

    const displaymovementsUI = function (movements, datee) {
      movementWindow.innerHTML = '';
      //currentAccount.movements.forEach((value, index) => {
      console.log('ooo', datee);
      movements.forEach((value, index) => {
        console.log(
          new Intl.DateTimeFormat(currentAccount.locale).format(
            new Date(datee[index])
          )
        );
        movementWindow.insertAdjacentHTML(
          'afterbegin',
          `<div class="row py-2 ps-5">
      <div
        class="col-auto rounded-pill text-light"
        style="
          background-image: linear-gradient(
            to bottom right,${
              value > 0
                ? 'rgb(168, 209, 104),rgb(19, 189, 19)'
                : 'rgb(232, 156, 149),rgb(189, 19, 36)'
            }
            
          );
        "
      >
        ${index + 1} ${value > 0 ? 'deposits' : 'withdraws'}
      </div>
      <div class="col fw-light"> ${new Intl.DateTimeFormat(
        currentAccount.locale
      ).format(new Date(datee[index]))}</div>
      <div class="col text-end pe-5">${value}$</div>
    </div>
    <hr />`
        );
      });
    };
    displaymovementsUI(currentAccount.movements, currentAccount.movementsDates);
    console.log('ok2');
    //welcome message
    welCome.textContent = `welcome ${currentAccount.owner.split(' ')[0]}`;

    const displayNumericsUI = function () {
      //current balanace
      currentAccount.balance = currentAccount.movements.reduce(
        (acc, cur) => acc + cur,
        0
      );
      currentBalanace.textContent = `${currentAccount.balance} $`;

      //IN
      currentBalanace.sumDeposit = currentAccount.movements
        .filter(item => item > 0)
        .reduce((acc, cur) => acc + cur, 0);
      sumIn.textContent = currentBalanace.sumDeposit;

      //out
      currentBalanace.sumWitdraws = -currentAccount.movements
        .filter(item => item < 0)
        .reduce((acc, cur) => acc + cur, 0);
      sumOut.textContent = currentBalanace.sumWitdraws;

      //interest
      currentBalanace.sumintrests = Math.trunc(
        currentAccount.movements
          .filter(value => value > 0)
          .map(value => (value * currentAccount.interestRate) / 100)
          .filter(value => value > 0)
          .reduce((acc, cur) => acc + cur, 0)
      );
      sumInterest.textContent = currentBalanace.sumintrests;
    };
    displayNumericsUI();

    //Transfer Money
    transferEnter.addEventListener('click', function (e) {
      e.preventDefault();
      const trsnsferAccount = accounts.find(
        item => item.user === transferTo.value
      );

      if (
        Number(transferAmount.value) < currentAccount.balance &&
        trsnsferAccount
      ) {
        currentAccount.movements.push(-Number(transferAmount.value));
        trsnsferAccount.movements.push(Number(transferAmount.value));
        currentAccount.movementsDates.push(new Date().toISOString());
        trsnsferAccount.movementsDates.push(new Date().toISOString());
        displaymovementsUI(
          currentAccount.movements,
          currentAccount.movementsDates
        );
        displayNumericsUI();
      }

      transferTo.value = '';
      transferAmount.value = '';
      transferAmount.blur();
    });

    //Request Loan
    loanEnter.addEventListener('click', function (e) {
      e.preventDefault();
      const amount = Number(loanAmount.value);
      if (
        amount > 0 &&
        currentAccount.movements.some(item => item >= 0.1 * amount)
      ) {
        currentAccount.movements.push(amount);
        currentAccount.movementsDates.push(new Date().toISOString());

        displaymovementsUI(
          currentAccount.movements,
          currentAccount.movementsDates
        );
        displayNumericsUI();
      }

      loanAmount.value = '';
    });

    //close account
    closeAccountButton.addEventListener('click', function (e) {
      e.preventDefault();
      //console.log('OK9');
      if (
        currentAccount.user === closeUser.value &&
        currentAccount.pin === Number(closePin.value)
      ) {
        const indexx = accounts.findIndex(
          value => value.user === currentAccount.user
        );
        //console.log(indexx);
        accounts.splice(indexx, 1);
        // console.log('oOk');
        containerApp.style.opacity = 0;
        welCome.textContent = 'Log in to get started';
      }
      closePin.value = closeUser.value = '';
    });

    //sort (movements and movement Dates)
    let sort = false;
    //let currentAccount.moves;
    sortOrder.addEventListener('click', function (e) {
      e.preventDefault();
      if (!sort) {
        currentAccount.moves = currentAccount.movements
          .slice()
          .sort((a, b) => a - b);
        currentAccount.indexxx = currentAccount.moves.map(value =>
          currentAccount.movements.indexOf(value)
        );
        currentAccount.newDate = currentAccount.indexxx.map(
          value => currentAccount.movementsDates[value]
        );
      } else {
        currentAccount.moves = currentAccount.movements;
        currentAccount.indexxx = currentAccount.moves.map(value =>
          currentAccount.movements.indexOf(value)
        );
        currentAccount.newDate = currentAccount.indexxx.map(
          value => currentAccount.movementsDates[value]
        );
      }

      movementWindow.innerHTML = '';
      //console.log(currentAccount.movements);
      displaymovementsUI(currentAccount.moves, currentAccount.newDate);
      //console.log('O-K');
      //console.log(sort);
      sort = !sort;
      //console.log(sort);
    });

    //current time
    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const worldtime = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(now);
    currentTime.textContent = worldtime;

    //close Timer
    const ttimer = setTimeout(function () {
      containerApp.classList.add('opacity-0');
      welCome.textContent = 'Log in to get started';
      //containerApp.style.opacity = 0;
      console.log('aa');
    }, 10 * 60 * 1000);
    //ناقص
    let uptime = 20;
    let min, sec;
    const intervaltimer = setInterval(function () {
      const min = String(Math.trunc(uptime / 60)).padStart(2, 0);
      const sec = String(uptime % 60).padStart(2, 0);
      //console.log(`${min}:${sec}`);
      closeTimer.textContent = `${min}:${sec}`;
      if (uptime == 0) {
        clearInterval(intervaltimer);
      }
      uptime--;
    }, 1000);
  }

  //delete user & pass display
  userName.value = '';
  passWord.value = '';
  passWord.blur();
};
//run with entering user and pass
enterAccount.addEventListener('click', enterfunc);
