// Именования
const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input_cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown_cities-from'),
    inputCitiesTo = document.querySelector('.input_cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown_cities-to'),
    inputDateDepart = document.querySelector('.input_date-depart'),
    cheapestTicket = document.getElementById('cheapest-ticket'),
    otherCheapTickets = document.getElementById('other-cheap-tickets'),
    modalDestination = document.querySelector('.modal-destination'),
    modalErr = document.querySelector('.modal-err'),
    modalComming = document.querySelector('.modal-comming'),
    all = document.querySelector('*'),
    header = document.querySelector('header'),
    main = document.querySelector('main'),
    plane = document.querySelector('.plane'),
    bus = document.querySelector('.bus'),
    train = document.querySelector('.train'),
    back = document.querySelector('.back');

// Данные

const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',      //dataBase/cities.json
    proxy = 'https://cors-anywhere.herokuapp.com/',
    API_KEY = 'fc850e7823ddd76bddbc7aa9cc8a6468',
    calendar = 'https://min-prices.aviasales.ru/calendar_preload',
    MAX_COUNT = 10;

let city = [];

// Функции

const getData = (url, callback) => {
    const request = new XMLHttpRequest(url);
    
    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4)
            return;
        if (request.status === 200) {
            callback(request.response);
        } else {
            console.error(request.status);
        }
        if (request.status === 400) {
            modalDestination.style.display = 'flex';
        }
    });
    request.send();
};


const showCity = (input, dropList) => {
    dropList.textContent = '';

    if (input.value !== '') {
        const filterCity = city.filter((item) => {
            const fixItem = item.name.toLowerCase();
            return fixItem.startsWith(input.value.toLowerCase());
        });

        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown_city');
            li.textContent = item.name;
            dropList.append(li);
        });
    }
};

const selectCity = (event, input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';
    }
}

const getNameCity = (code) => {
    const objCity = city.find((item) => item.code === code);
    return objCity.name;
};

const getDate = (date) => {
    return new Date(date).toLocaleString('locales', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getChanges = (num) => {
    if (num) {
        return num === 1 ? 'С одной пересадкой' : 'С двумя пересадками';
    } else {
        return 'Без пересадок'
    }
};

const getLink = (data) => {     // Формируем ссылку
    let link = 'https://www.aviasales.ru/search/';

    link += data.origin;

    const date = new Date(data.depart_date);

    const day = date.getDate();
    link += day < 10 ? '0' + day : day;  // что бы получать день в формате 01 02 03 ... 31

    const month = date.getMonth() + 1;   // +1 потому что месяцы начинаются с 0
    link += month < 10 ? '0' + month : month;

    link += data.destination;

    link += '1'; // 1 взрослый

    return link;

//  Сделать кол-во чел и проверку на наличие детей    1 = 1 взрослый, 11 = 1 взрослый + 1 детский
}

const createCard = (data) => {
    const ticket = document.createElement('article');
    ticket.classList.add('ticket');

    let deep = '';

    if (data) {
        deep = `    
            <h3 class="agent">${data.gate}</h3>
            <div class="ticket_wrapper">
                <div class="left-side">
                    <a href="${getLink(data)}" target="_blank" class="button button_buy">
                        Купить за ${data.value}₽
                    </a>
                </div>
                <div class="right-side">
                    <div class="block-left">
                        <div class="city_from">Вылет из города
                            <span class="city_name">${getNameCity(data.origin)}</span>
                        </div>
                        <div class="date">${getDate(data.depart_date)}</div>
                    </div>

                    <div class="block-right">
                        <div class="changes">${getChanges(data.number_of_changes)}</div>
                        <div class="city_to">Город назначения:
                            <span class="city_name">${getNameCity(data.destination)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        deep = '<h2>К сожалению на текущую дату билетов не нашлось!</h2>'
    }

    ticket.insertAdjacentHTML('afterbegin', deep)

    return ticket;

};

const renderCheapDay = (cheapTicket) => {
    cheapestTicket.style.display = 'block';
    cheapestTicket.innerHTML = '<h2>Самый дешевый билет на выбранную дату</h2>';        // Очищаем старые билеты

    const ticket = createCard(cheapTicket[0]);
    cheapestTicket.append(ticket);
};

const renderCheapYear = (cheapTickets) => {
    otherCheapTickets.style.display = 'block';
    otherCheapTickets.innerHTML = '<h2>Самые дешевые билеты на другие даты</h2>';      // Очищаем старые билеты

    cheapTickets.sort((a, b) => {
        return a.value - b.value;
    });

    for (let i = 0; i < cheapTickets.length && i < MAX_COUNT; i++) {
        const ticket = createCard(cheapTickets[i]);
        otherCheapTickets.append(ticket);
    }
};

const renderCheap = (data, date) => { // data - Данные, date - Дата
    const cheapTicketYear = JSON.parse(data).best_prices;

    const cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    })

    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);

}

// Обработчки событий

inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo)
});

dropdownCitiesFrom.addEventListener('click', (event) => {
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', (event) => {
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

train.addEventListener('click', () => {
    modalComming.style.display = 'flex';
    console.log('te');
});

bus.addEventListener('click', () => {
    modalComming.style.display = 'flex';
});

modalComming.addEventListener('click', () => {
    modalComming.style.display = 'none';
});

all.addEventListener('click', () => {    // Закрывает все модалки
    modalDestination.style.display = 'none';
    modalErr.style.display = 'none';
});

plane.addEventListener('click', () => {  // Если выбрали самолет
    main.style.display = 'block';
    header.style.display = 'none';
});

back.addEventListener('click', () => {
    main.style.display = 'none';
    header.style.display = 'block';
});


formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const cityFrom = city.find((item) => {
        return inputCitiesFrom.value === item.name;
    });
    const cityTo = city.find((item) => {
        return inputCitiesTo.value === item.name;
    });

    const formData = {
        from: cityFrom,
        to: cityTo,
        when: inputDateDepart.value,
    };

    if (inputCitiesFrom.value === inputCitiesTo.value) {
        modalErr.style.display = 'flex';
    } else {
        if (formData.from && formData.to) {
            const requestData = '?depart_date=' + formData.when + '&origin=' + formData.from.code + '&destination=' + formData.to.code + '&one_way=true&token=' + API_KEY; // GET Запрос
            getData(calendar + requestData, (data) => {
                renderCheap(data, formData.when);
            });
        }
        if (formData.from) {
            inputCitiesFrom.style.background = '#1e3c53';
            inputCitiesFrom.style.color = 'white';
        } else {
            inputCitiesFrom.style.background = '#ff000029';
            inputCitiesFrom.style.color = 'red';
        }
        if (formData.to) {
            inputCitiesTo.style.background = '#1e3c53';
            inputCitiesTo.style.color = 'white';
        } else {
            inputCitiesTo.style.background = '#ff000029';
            inputCitiesTo.style.color = 'red';
        }
    }
});

// Вызовы функций

getData(proxy + citiesApi, (data) => {
    city = JSON.parse(data).filter((item) => {
        return item.name;
    });
    city.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });

});