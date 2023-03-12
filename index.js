// Проект: Mortgage
// Суть додатку:
// Юзер пройшовся по різним банкам, щоб обрати вигідний курс іпотеки.
// Тепер він хочить це все внести в єдину систему, щоб у нього все було під рукою
// Тому для нього потрібно створити застосунок, де він самостійно зможе добавляти в список різноманітні банки і іпотечні умови по ним.
// Завдання:
// Потрібно створити застосунок в якому буде відображатись список створених клієнтом банків. При клікові на назву банку - буде відображатись його детальна інформація, а саме:
// - Назва банку
// - Річна відсоткова ставка по іпотеці (interest rate, %)
// - Максимальна сума кредиту, яку надає банк (Max loan, $)
// - Мінімальний платіж (Min payment, $)
// - Термін кредиту (Loan term)
// Якщо доданих банків не має - показувати заглушку з текстом: “Банків у списку ще не має“. Для цього потрібно клікнути по кнопці “Create a new bank”.
// Якщо банки в списку є - то відображати інформацію в слідуючому порядку:
// - Порядковий номер
// - Назва банку
// - Кнопка по редагуванню
// - Кнопка по видаленню конкретного банка
// - Кнопка для створення нового банку. Має бути окремо одна на весь блок

// ================================================================================================================================ //

let banks = [];

// 1. В index.html має бути лише один <div id=“”root”“> </div> В нього буде рендеритись вся розмітка застосунку.
// Створити в JS 2 < div >.Добавити їх в ДОМ. Зробити мінімальну стилізацію.

const root = document.querySelector('#root');

const bankListWrap = document.createElement('div');
bankListWrap.classList.add('bank-list-wrap');
const bankDescWrap = document.createElement('div');
bankDescWrap.classList.add('bank-desc-wrap');
bankDescWrap.classList.add('none');

root.append(bankListWrap, bankDescWrap);

// 2. Написати функцію renderBankList, яка створює розмітку для всіх лішок списка банків і додає їх в середину ul.
// Усе стилізувати і добавити в лівий блок.Також, туди ж добавити кнопку “”Добавити новий банк“”.

const bankListUl = document.createElement('ul');
const bankListBtn = document.createElement('button');
bankListBtn.classList.add('bank-list-button');
bankListBtn.textContent = 'Добавити новий банк';
bankListBtn.type = 'button';
bankListUl.classList.add('bank-list');
bankListWrap.append(bankListUl, bankListBtn);

function renderBankList(array) {
  return array.map(item => `<li data-id="${item.id}" class="bank-list__item">
  <a class="bank-list__title">${item.name}</a>
  <button data-action="edit" class="bank-list__btn">редагувати</button>
  <button data-action="delete" class="bank-list__btn">видалити</button>
  </li>`).join('');
};

loadBanks();
bankListUl.innerHTML = renderBankList(banks);

// 3. При клікові на кожну з назв банку в лівій частині - рендерити інфу вибраного банка в правій частині.

function renderBankDesc(array) {
  return `<div class="bank-desc-list">
  <p class="bank-desc-list__text">Назва банку: ${array.name}</p>
  <p class="bank-desc-list__text">Річна відсоткова ставка по іпотеці: ${array.interestRate}%</p>
  <p class="bank-desc-list__text">Максимальна сума кредиту, яку надає банк: ${array.maxLoan}$</p>
  <p class="bank-desc-list__text">Мінімальний платіж: ${array.minPayment}$</p>
  <p class="bank-desc-list__text">Термін кредиту: ${array.loanTerm} міс.</p>
  </div>`
};

const bankListEl = document.querySelector('.bank-list');

function onClickBankName(e) {
  bankDescWrap.classList.remove('none');
  bankDescWrap.innerHTML = '';
  banks.map(item => {
    if (e.target.textContent === item.name) {
      bankDescWrap.insertAdjacentHTML('beforeend', renderBankDesc(item));
    };
  });
};

bankListEl.addEventListener('click', onClickBankName);

// 4. Додати слухачі на кнопки Edit та Delete і вивести в консоль назву кнопки по якій клікаэмо. Наприклад, “Edit”, “Delete”

function onClickBtn(e) {
  const { action } = e.target.dataset;
  const parent = e.target.closest('li');
  const { id } = parent?.dataset || {};

  switch (action) {
    case 'edit':
      editBank(id, parent);
      break;
    
    case 'delete':
      deleteBank(id, parent);
      break;
  };
};

bankListEl.addEventListener('click', onClickBtn);

// 5. Написати логіку функції створення нового банку, яка викликатиметься через клік по кнопці “Добавити новий банк“.

function renderNewBank() {
  const markup = '<form class="new-bank-form"><input type="text" data="name" placeholder="Name" class="new-bank-input" required><input type="number" data="interest-rate" placeholder="Interest Rate" class="new-bank-input" required><input type="number" data="max-loan" placeholder="Max Loan" class="new-bank-input" required><input type="number" data="min-payment" placeholder="Min Payment" class="new-bank-input" required><input type="number" data="loan-term" placeholder="Loan Term" class="new-bank-input" required><button type="submit" class="new-bank-btn">Додати</button></form>';
  return markup
};

function onClickAddBank() {
  bankListBtn.classList.add('none');

  bankListWrap.insertAdjacentHTML('beforeend', renderNewBank());

  const formNewBank = document.querySelector('.new-bank-form')
  const nameInput = document.querySelector('input[data="name"]');
  const interestRateInput = document.querySelector('input[data="interest-rate"]');
  const maxLoanInput = document.querySelector('input[data="max-loan"]');
  const minPaymentInput = document.querySelector('input[data="min-payment"]');
  const loanTermInput = document.querySelector('input[data="loan-term"]');

  formNewBank.addEventListener('submit', createNewBank);

  function createNewBank(e) {
    e.preventDefault();
    bankListBtn.classList.remove('none');
    
  const newBank = {
    id: new Date(),
    name: nameInput.value.trim(),
    interestRate: interestRateInput.value.trim(),
    maxLoan: maxLoanInput.value.trim(),
    minPayment: minPaymentInput.value.trim(),
    loanTerm: loanTermInput.value.trim(),
  };

    banks.push(newBank);
    saveBanks();
    bankListUl.innerHTML = renderBankList(banks);
    formNewBank.remove();
  };
};

bankListBtn.addEventListener('click', onClickAddBank);

// 6. Написати логіку функції видалення банку.

function deleteBank(id, parent) {
  const indexIdTask = banks.findIndex((bank) => id === bank.id);
  banks.splice(indexIdTask, 1);

  saveBanks();
  bankDescWrap.classList.add('none');
  parent.remove();
};

// 7. Написати логіку функції редагування банку.

function editBank(id) {
  console.log("Edit");
};

// 8. Реалізувати роботу списка банків з локал сторедж. Щоб при перезавантаженні сторінки список зберігався.

function saveBanks() {
  try {
      localStorage.setItem('All banks', JSON.stringify(banks));
    } catch (error) {
      console.error('error');
    };
};

function loadBanks() {
  try {
      banks = JSON.parse(localStorage.getItem('All banks')) || [];
    } catch (error) {
      console.error('error');
    };
};

// 9. Створити логіку роботи кнопки “Очистити” - коли створено більше 3х банків в списку - кнопа відмальовується.
// В решті випадків - кнопки не повинно бути.При клікові на кнопку - очищається весь список банків.

const destroyBtn = document.createElement('button');
destroyBtn.type = 'button';
destroyBtn.classList.add('destroy-btn');
destroyBtn.classList.add('none');
destroyBtn.textContent = 'Очистити';

bankListWrap.append(destroyBtn);
addDestroyBtn();

function addDestroyBtn() {
if (banks.length >= 3) {
  destroyBtn.classList.remove('none');
};
};

destroyBtn.addEventListener('click', () => {
  banks = [];
  bankListUl.innerHTML = renderBankList(banks);
  saveBanks();
  destroyBtn.classList.add('none');
});