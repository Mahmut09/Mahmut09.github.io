document.addEventListener('DOMContentLoaded', () => {
  'use strict';

const cartButton = document.querySelector('#cart-button'),
      modal = document.querySelector('.modal'),
      close = document.querySelector('.close'),
      buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      modalOrder = document.querySelector('.modal-order'),
      closeAuth = document.querySelector('.close-auth'),
      closeOrder = document.querySelector('.close-order'),
      logInForm = document.querySelector('#logInForm'),
      loginInput = document.querySelector('#login'),
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out'),
      cardsRestaurants = document.querySelector('.cards-restaurants'),
      containerPromo = document.querySelector('.container-promo'),
      restaurants = document.querySelector('.restaurants'),
      menu = document.querySelector('.menu'),
      logo = document.querySelector('.logo'),
      cardsMenu = document.querySelector('.cards-menu'),
      restaurantTitle = document.querySelector('.restaurant-title'),
      rating = document.querySelector('.rating'),
      minPrice = document.querySelector('.price'),
      category = document.querySelector('.category'),
      inputSearch = document.querySelector('.input-search'),
      inputLogin = document.querySelector('.input-login'),
      listCart = document.querySelector('.modal-body'),
      modalPrice = document.querySelector('.modal-pricetag'),
      buttonClearCart = document.querySelector('.clear-cart'),
      order = document.querySelector('.order'),
      emptyCart = document.querySelector('.empty-cart'),
      buttonOrder = document.querySelector('.button-order'),
      orderAddressStreet = document.querySelector('#order-address-street'),
      orderAddressHome = document.querySelector('#order-address-home'),
      orderFloor = document.querySelector('#order-floor'),
      orderPorch = document.querySelector('#order-porch'),
      orderFlatNumber = document.querySelector('#order-flat-number'),
      buttonThanks = document.querySelector('.button-thanks'),
      modalThanksClose = document.querySelector('.modal-thanks-close'),
      closeThanks = document.querySelector('.close-thanks'),
      modalThanks = document.querySelector('.modal-thanks');

let login = localStorage.getItem('login');

const cart = [];


const loadCart = () => {       // Локал Сторедж
if (localStorage.getItem(login)) {
  JSON.parse(localStorage.getItem(login)).forEach(function(item) {
    cart.push(item);
  })
}
};

const cartStorage = () => {      // Локал Сторедж
  localStorage.setItem(login, JSON.stringify(cart))
};


const getData = async (url) => {
  const response = await window.fetch(url)

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`)  
  }

  return await response.json();
  
};

const valid = (str) => {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;       // регулярное выр на рус буквы /^[а-яА-Я][а-яА-Я\.]{1,20}$/;
  return nameReg.test(str);
}

const validAdressStreet = (str) => {
  const validOrderAdressStreet = /^[а-яА-Я][а-яА-Я\.]{3,25}$/;
  return validOrderAdressStreet.test(str);
}

const validAdressHome = (str) => {
  const validOrderAdressHome = /^[0-9]{1,3}$/;
  return validOrderAdressHome.test(str);
}

const validFloor = (str) => {
  const validOrderFloor = /^[0-9]{1,2}$/;
  return validOrderFloor.test(str);
}

const validPorch = (str) => {
  const validOrderPorch = /^[0-9]{1}$/;
  return validOrderPorch.test(str);
}

const validFlat = (str) => {
  const orderFlatNum = /^[0-9]{1,3}$/;
  return orderFlatNum.test(str);
}

const toggleModal = () => {
  modal.classList.toggle('is-open');
}

const toggleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
  loginInput.style.borderColor = '';
  loginInput.style.background = '';
}

const toggleModalOrder = () => {
  modalOrder.classList.toggle('is-open');
  toggleModal();
};

const returnMain = () => {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

const authorized = () => {

  const logOut = () => {
    login = null;
    cart.length = 0;
    localStorage.removeItem('login');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    cartButton.style.display = '';
    inputSearch.style.display = 'none';
    inputLogin.style.display = 'block';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
    returnMain();
  }

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';
  inputSearch.style.display = 'block';
  inputLogin.style.display = 'none';
  buttonOut.addEventListener('click', logOut);
  loadCart();
}

const notAuthorized = () => {
  const logIn = (event) => {
    event.preventDefault();
    loginInput.style.background = '';
    loginInput.style.borderColor = '';

    if (valid(loginInput.value.trim())) {

      login = loginInput.value;
      localStorage.setItem('login', login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
    } else {
      loginInput.style.background = '#ff00001f'; 
      loginInput.style.borderColor = '#ff00001f';
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

const checkAuth = () => login ? authorized() : notAuthorized();

const createCardsRestaurant = ({ image, kitchen, name, price, products, stars, time_of_delivery: timeOfDelivery }) => {  // рендер карточек ресторана

  const card = `
        <a class="card card-restaurant" 
        data-products="${products}"
        data-info="${[name, price, stars, kitchen]}">
          <img src="${image}" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title">${name}</h3>
              <span class="card-tag tag">Время доставки: ${timeOfDelivery} мин</span>
          </div>
          <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
      </a>
    `

    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

const createCardGood = ({ description, image, name, price, id }) => {   // рендер карточек еды в ресторанах
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
      <img src="${image}" alt="${name}" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${description}</div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart" id="${id}">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold card-price">${price} ₽</strong>
        </div>
      </div>
  `);
      
  cardsMenu.insertAdjacentElement('beforeend', card);
  
}

const openGoods = (event) => {
  const target = event.target;

  const restaurant = target.closest('.card-restaurant');
  
  if (restaurant) {

    if (login) {

      const info = restaurant.dataset.info.split(',');
      
      const [ name, price, stars, kitchen ] = info;

      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От ${price} ₽`;
      category.textContent = kitchen;

      getData(`./db/${restaurant.dataset.products}`)
        .then((data) => data.forEach(createCardGood));
    }
    else {
      toggleModalAuth();
    }
  }

}

const addToCart = (event) => {

  const target = event.target;

  const buttonAddToCart = target.closest('.button-add-cart');
 
  if (buttonAddToCart) {
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = buttonAddToCart.id;
    const food = cart.find((item) => item.id === id);

    if (food) {
      food.count += 1;
    } else {
        cart.push({
        id: id,
        title: title,
        cost: cost,
        count: 1
      });
    } cartStorage();
  }
}

const renderCart = () => {
  listCart.textContent = '';

  cart.forEach(function({ id, title, cost, count }) {
    const itemCart = `
      <div class="food-row">
        <span class="food-name">${title}</span>
        <strong class="food-price">${parseFloat(cost) * count}</strong>
        <div class="food-counter">
          <button class="counter-button counter-minus" data-id=${id}>-</button>
          <span class="counter">${count}</span>
          <button class="counter-button counter-plus" data-id=${id}>+</button>
      </div>
    </div>
    `;

    listCart.insertAdjacentHTML('beforeend', itemCart)
  });

  const totalPrice = cart.reduce(function(result, item) {         // reduce Аккумулирующая переменная (та, которая будет возращаться из предыдущего вызова этой ф-ции)
    return result +( parseFloat(item.cost) * item.count);  // parseFloat - берет строку и проверяет с 1 символа if (число) {запоминает}   (до пробела или другого символа)
  }, 0);

  modalPrice.textContent = totalPrice + ' ₽';
}

const changeCount = (event) => {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
      const food = cart.find(function(item) {
        return item.id === target.dataset.id;
    });
    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);
      }
    };
    if (target.classList.contains('counter-plus')) food.count++;

    renderCart();
    cartStorage();
  }
}

const closeModal = (event) => {
  const target = event.target;

  if (target === modal) {
    toggleModal();
    emptyCartClose();
  }
};

const closeModalAuth = (event) => {
  const target = event.target;

  if (target === modalAuth) {
    toggleModalAuth();
  }
};

const closeModalThanks = (event) => {
  const target = event.target;

  if (target === modalThanks) {
    toggleModalThanks();
  }
}

const closeModalOrder = (event) => {
  const target = event.target;

  if (target === modalOrder) {
    toggleModalOrder();
  }
};

const emptyCartClose = () => {
  emptyCart.style.display = 'none';
};

const toggleModalThanks = () => {
  modalThanksClose.classList.toggle('is-open');
}

const pushOrder = (event) => {         //формирует заказ
  event.preventDefault();

  const finalOrder = [];

  const checkAdressStreet = validAdressStreet(orderAddressStreet.value);
  const checkAdressHome = validAdressHome(orderAddressHome.value);
  const checkFloor = validFloor(orderFloor.value);
  const checkPorch = validPorch(orderPorch.value);
  const checkFlat = validFlat(orderFlatNumber.value);


  if (checkAdressStreet) {
    orderAddressStreet.style.background = '';
  }
  if (checkFloor) {
    orderFloor.style.background = '';
  }
  if (checkFlat && orderFloor.value > 0) {
    orderFlatNumber.style.background = '';
  }
  if (checkPorch) {
    orderPorch.style.background = '';
  }
  if (checkAdressHome) {
    orderAddressHome.style.background = '';
  }

  if (checkAdressStreet && checkFloor && checkFlat && checkPorch && checkAdressHome) {

      const totalPrice = cart.reduce(function(result, item) {         
        return result +( parseFloat(item.cost) * item.count); 
      }, 0);

      modalPrice.textContent = totalPrice + ' ₽';

      finalOrder.push('Логин: ' + login,
                    'Заказ: '  + JSON.stringify(cart),
                    'Сумма заказа: ' + totalPrice,
                    'Адрес:',
                    ' Улица: ' + orderAddressStreet.value,
                    ' Дом: ' + orderAddressHome.value,
                    ' Подъезд: ' + orderPorch.value,
                    ' Этаж: ' + orderFloor.value,
                    ' Номер квартиры: ' + orderFlatNumber.value);

      for ( let key in finalOrder) {
       let orderForPush = (finalOrder[key]);
       console.log(orderForPush);
      }
      toggleModalOrder();
      toggleModal();
      toggleModalThanks();

      orderAddressStreet.value = '';
      orderAddressHome.value = '';
      orderFloor.value = '';
      orderPorch.value = '';
      orderFlatNumber.value = '';

  } else {
    if (!checkAdressStreet) {
      orderAddressStreet.style.background = '#ff00001f';
    }
    if (!checkAdressHome) {
      orderAddressHome.style.background = '#ff00001f';
    }
    if (!checkFloor) {
      orderFloor.style.background = '#ff00001f';
    }
    if (!checkPorch) {
      orderPorch.style.background = '#ff00001f';
    }
    if (!checkFlat) {
      orderFlatNumber.style.background = '#ff00001f';
    }
  }
};

function init() {
  getData('./db/partners.json')       // Рендер ресторанов
    .then((data) => {
      data.forEach(createCardsRestaurant)     
  });
  
  cartButton.addEventListener('click', toggleModal); // Открыть/Закрыть Корзину

  cartButton.addEventListener('click', renderCart);  // Рендер заказа в корзине
  
  close.addEventListener('click', toggleModal);    // Закрыть модальное окно

  close.addEventListener('click', emptyCartClose); // Закрыть корзину если она пуста
  
  cardsRestaurants.addEventListener('click', openGoods); // Открывает 

  cardsMenu.addEventListener('click', addToCart); // Добавляет товары в корзину

  listCart.addEventListener('click', changeCount); // Считает сумму в корзине

  modalAuth.addEventListener('click', closeModalAuth); // Открыть/закрыть окно авторизации

  modal.addEventListener('click', closeModal); // Закрывает модалку по крестику

  closeOrder.addEventListener('click', toggleModalOrder); // Открывает/закрывает модалку оформления заказа по крестику

  modalOrder.addEventListener('click', closeModalOrder); // Открывает/закрывает модалку оформления заказа 

  buttonOrder.addEventListener('click', pushOrder);  // Отправляет заказ

  buttonThanks.addEventListener('click', toggleModalThanks); // Открывает/закрывает окно благодарности

  closeThanks.addEventListener('click', toggleModalThanks); // Открывает/закрывает окно благодарности по крестику

  modalThanks.addEventListener('click', closeModalThanks); // Закрывает окно благодарности

  buttonClearCart.addEventListener('click', () => { // Отчищает корзину или закрывает ее если она уже пустая
    if (cart.length === 0) {
      toggleModal();
      emptyCartClose();
    }
    cart.length = 0;
    renderCart();
    cartStorage();
  })

  order.addEventListener('click', () => { // Появление надписи если корзина пуста и пытаются формировать заказ
    if (cart.length === 0) {
      emptyCart.style.display = 'block';
    } else {
      toggleModalOrder();
    }
  });
  
  logo.addEventListener('click', () => {      // Возврат на гл страницу
      containerPromo.classList.remove('hide')
      restaurants.classList.remove('hide')
      menu.classList.add('hide')
  })

  inputSearch.addEventListener('keydown', (event) => {      //Поиск
    const target = event.target;
    const value = target.value.toLowerCase();
    const goods = [];

    if (event.keyCode === 13) {
      target.value = '';

      getData('./db/partners.json')
        .then(function(data) {                // Запрос на "сервер"
          const products = data.map((item) => item.products);
        
        products.forEach(function(product){
          getData(`./db/${product}`)
            .then(function(data) {
              goods.push(...data);

            const searchGoods = goods
              .filter((item) => item.name.toLowerCase().trim().includes(value));

            if (!value || value.length < 3) {
              target.style.backgroundColor = '#ff00001f';
              target.style.borderColor = '#ff00001f';
              setTimeout(function(){
                target.style.background = '';
                target.style.borderColor = '';
              }, 2000);
              return;
            }

            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            restaurantTitle.textContent = 'Результат поиска';
            rating.textContent = '';
            minPrice.textContent = '';
            category.textContent = '';

            return searchGoods; // Что бы searchGoods был виден then который ниже
          })
          .then((data) => data.forEach(createCardGood))
        })
      });
    }
  });

checkAuth();

new Swiper('.swiper-container', {
    loop: true,
    autoplay: true,
  })
}

init();
});
