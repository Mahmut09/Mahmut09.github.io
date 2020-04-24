const generateId = () => `ID:${Math.round(Math.random() * 1e8).toString(16)}` 

const totalBalance = document.querySelector('.total-balance'),
    totalMoneyIncome = document.querySelector('.total-money-income'),
    totalMoneyExpenses = document.querySelector('.total-money-expenses'),
    historyList = document.querySelector('.history-list'),
    form = document.querySelector('#form'),
    operationName = document.querySelector('.operation-name'),
    operationAmount = document.querySelector('.operation-amount');

let dbOperation = JSON.parse(localStorage.getItem('calc')) || [];


const renderOperation = (operation) => {

    const className = operation.amount < 0 ? 'history-item-minus' : 'history-item-plus';

    const listItem = document.createElement('li');

    listItem.classList.add('history-item');
    listItem.classList.add(className);

    listItem.innerHTML = `
        ${operation.description}
        <span class="history-money">${operation.amount} ₽</span>
        <button class="history-delete" data-id="${operation.id}">x</button>
    `;
    
    historyList.append(listItem);
        
};

const updateBalance = () => {

    const resultIncome = dbOperation
    .filter((item) => item.amount > 0)
    .reduce((result, item) => result + item.amount, 0);       // передаем 0, что бы 0 попал в result при первой итерации


    const resultExpenses = dbOperation
    .filter((item) => item.amount < 0)
    .reduce((result, item) => result + item.amount, 0);

    totalMoneyIncome.textContent = resultIncome + ' ₽';
    totalMoneyExpenses.textContent = resultExpenses + ' ₽';
    totalBalance.textContent = (resultIncome + resultExpenses) + ' ₽';

};



const init = () => {
    historyList.textContent = '';

    dbOperation.forEach(renderOperation);    // === 
    // dbOperation.forEach((item) => {
    //     renderOperation(item);
    // })
    updateBalance();
    localStorage.setItem('calc', JSON.stringify(dbOperation));

};


form.addEventListener('submit', (event) => {
    event.preventDefault();        // Запрещает браузера стандартное поведение (обновлять страницу при событии submit) 
    
    const operationNameValue = operationName.value,
        operationAmountValue = operationAmount.value;


    if (operationNameValue && operationAmountValue) {

        const operation = {
            id: generateId(),
            description: operationNameValue,
            amount: +operationAmountValue,
        };

        dbOperation.push(operation);
        init();

    } else {
        if (!operationNameValue) operationName.style.borderColor = 'red';
        if (!operationNameValue) operationName.style.background = '#ff00000f'
        if (!operationAmountValue) operationAmount.style.borderColor = 'red';
        if (!operationAmountValue) operationAmount.style.background = '#ff00000f'
    }

    operationName.value = '';
    operationAmount.value = '';

});

operationName.addEventListener('click', () => {
    operationName.style.background = '';
    operationName.style.borderColor = '';
});

operationAmount.addEventListener('click', () => {
    operationAmount.style.background = '';
    operationAmount.style.borderColor = '';
});

historyList.addEventListener('click', (event) => {
    const target = event.target

    if (target.classList.contains('history-delete')) {
        dbOperation = dbOperation
            .filter(operation => operation.id !== target.dataset.id);   
        
        init();
    }

});


init();