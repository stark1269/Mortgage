const banks = [
{
id: '435tr34wrt',
name: 'Mono',
interestRate: 5,
maxLoan: 500000,
minPayment: 1000,
loanTerm: 12,
},
{
id: 'asdfw342rew5',
name: 'Privat',
interestRate: 7,
maxLoan: 1000000,
minPayment: 5000,
loanTerm: 50,
  },

];

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

// 1. В index.html має бути лише один <div id=“”root”“> </div> В нього буде рендеритись вся розмітка застосунку.
// Створити в JS 2 < div >.Добавити їх в ДОМ. Зробити мінімальну стилізацію.

const root = document.querySelector('#root');

const bankListWrap = document.createElement('div');
bankListWrap.classList.add('bank-list-wrap');
const bankDescWrap = document.createElement('div');
bankDescWrap.classList.add('bank-desc-wrap');

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
  return array.map(item => `<li class="bank-list__item">
  <a data-id="${item.id}" class="bank-list__title">${item.name}</a>
  <button class="bank-list__btn">редагувати</button>
  <button class="bank-list__btn">видалити</button>
  </li>`).join('');
};

bankListUl.insertAdjacentHTML('beforeend', renderBankList(banks));


// 3. При клікові на кожну з назв банку в лівому блоці - спочатку в консоль вивести назву вибраного банка в текстовому форматі.
// Якщо все ок - вивести в консоль уже сам об‘єкт вибраного банку.

function onClickBankName(e) {
  console.log(e.target.textContent)
  banks.map(item => {
    if (e.target.textContent === item.name) {
      console.log(item)
    };
  });
};

// 4. При клікові на кожну з назв банку в лівій частині - рендерити інфу вибраного банка в правій частині.

// id: 'asdfw342rew5',
// name: 'Privat',
// interestRate: 7,
// maxLoan: 1000000,
// minPayment: 5000,
// loanTerm: 50,

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
  bankDescWrap.innerHTML = '';
  banks.map(item => {
    if (e.target.textContent === item.name) {
      bankDescWrap.insertAdjacentHTML('beforeend', renderBankDesc(item));
    };
  });
};

bankListEl.addEventListener('click', onClickBankName);

// 5. Додати слухачі на кнопки Edit та Delete і вивести в консоль назву кнопки по якій клікаэмо. Наприклад, “Edit”, “Delete”

// 6. Написати логіку функції створення нового банку, яка викликатиметься через клік по кнопці “Добавити новий банк“.

// 7. Написати логіку функції редагування банку.

// 8. Написати логіку функції видалення банку.

// 9. Переписати код слухача подій не на кожну li списка банків, а на саму ul. Відловлювати на ul клік по самій лішці.

// 10. Реалізувати роботу списка банків з локал сторедж. Щоб при перезавантаженні сторінки список зберігався.

// 11. Створити логіку роботи кнопки “Очистити” - коли створено більше 3х банків в списку - кнопа відмальовується.
// В решті випадків - кнопки не повинно бути.При клікові на кнопку - очищається весь список банків.

// 12. Зробити пошук банків по назві. Сам інпут для пошука має з’явитись коли кількість банків в колекції буде більше 5.
// При введені більше 2х літер в інпут - шукаємо співпадіння в назвах банків та виводимо їх в список.



