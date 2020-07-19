const incomingCalls = document.querySelector('.incoming-calls'),
      control = document.querySelector('.control'),
      others = document.querySelector('.others'),
      giftModal = document.querySelector('.gift-modal'),
      giftBtn = document.querySelector('.gift-btn'),
      closeGiftModal = document.querySelector('.close-modal'),
      modalLogin = document.querySelector('.modal-login'),
      personalArea = document.querySelector('.personal-area'),
      loginClose = document.querySelector('.login-close'),
      headerOnScroll = document.querySelector('.header-on-scroll');

const incomingContent = document.getElementById('incoming-content'),
      controlContent = document.getElementById('control-content'),
      otherContent = document.getElementById('other-content'),
      accordion = document.getElementById('accordion'),

      collapseLi6 = document.getElementById('collapse-li6'),
      collapseLi7 = document.getElementById('collapse-li7'),
      collapseLi8 = document.getElementById('collapse-li8'),
      collapseLi9 = document.getElementById('collapse-li9'),
      collapseLi10 = document.getElementById('collapse-li10'),
      collapseLi11 = document.getElementById('collapse-li11'),
      
      collapseOne6 = document.getElementById('collapseOne6'),
      collapseOne7 = document.getElementById('collapseOne7'),
      collapseOne8 = document.getElementById('collapseOne8'),
      collapseOne9 = document.getElementById('collapseOne9'),
      collapseOne10 = document.getElementById('collapseOne10'),
      collapseOne11 = document.getElementById('collapseOne11');

const toggleGiftModal = () => {
  giftModal.classList.toggle('is-open');
}

const toggleLoginModal = () => {
  modalLogin.classList.toggle('is-open');
}

const closeModal = (event) => {
  const target = event.target;

  if (target === giftModal) {
    toggleGiftModal();
  }
}

const closeLogin = (event) => {
  const target = event.target;

  if (target === modalLogin) {
    toggleLoginModal();
  }
}

personalArea.addEventListener('click', toggleLoginModal);
loginClose.addEventListener('click', toggleLoginModal);
modalLogin.addEventListener('click', closeLogin);

giftBtn.addEventListener('click', toggleGiftModal);
closeGiftModal.addEventListener('click', toggleGiftModal);
giftModal.addEventListener('click', closeModal);

collapseLi6.addEventListener('click', () => {
  collapseOne7.classList.remove('show');
  collapseOne8.classList.remove('show');
  collapseOne9.classList.remove('show');
  collapseOne10.classList.remove('show');
  collapseOne11.classList.remove('show');
})
collapseLi7.addEventListener('click', () => {
  collapseOne6.classList.remove('show');

  collapseOne8.classList.remove('show');
  collapseOne9.classList.remove('show');
  collapseOne10.classList.remove('show');
  collapseOne11.classList.remove('show');
});
collapseLi8.addEventListener('click', () => {
  collapseOne6.classList.remove('show');
  collapseOne7.classList.remove('show');

  collapseOne9.classList.remove('show');
  collapseOne10.classList.remove('show');
  collapseOne11.classList.remove('show');
});
collapseLi9.addEventListener('click', () => {
  collapseOne6.classList.remove('show');
  collapseOne7.classList.remove('show');
  collapseOne8.classList.remove('show');

  collapseOne10.classList.remove('show');
  collapseOne11.classList.remove('show');
});
collapseLi10.addEventListener('click', () => {
  collapseOne6.classList.remove('show');
  collapseOne7.classList.remove('show');
  collapseOne8.classList.remove('show');
  collapseOne9.classList.remove('show');

  collapseOne11.classList.remove('show');
});
collapseLi11.addEventListener('click', () => {
  collapseOne6.classList.remove('show');
  collapseOne7.classList.remove('show');
  collapseOne8.classList.remove('show');
  collapseOne9.classList.remove('show');
  collapseOne10.classList.remove('show');

});




const openIncoming = () => {
    incomingContent.style.display = 'block';
    controlContent.style.display = 'none';
    otherContent.style.display = 'none';

    incomingCalls.classList.add('active-tab');
    control.classList.remove('active-tab');
    others.classList.remove('active-tab');
}

const openControl = () => {
    incomingContent.style.display = 'none';
    controlContent.style.display = 'block';
    otherContent.style.display = 'none';

    incomingCalls.classList.remove('active-tab');
    control.classList.add('active-tab');
    others.classList.remove('active-tab');
}

const openOther = () => {
    incomingContent.style.display = 'none';
    controlContent.style.display = 'none';
    otherContent.style.display = 'block';

    incomingCalls.classList.remove('active-tab');
    control.classList.remove('active-tab');
    others.classList.add('active-tab');
}


incomingCalls.addEventListener('click', openIncoming);
control.addEventListener('click', openControl);
others.addEventListener('click', openOther);

$(document).ready(function() {
  $('.collapse.in').prev('.panel-heading').addClass('active');
  $('#accordion, #bs-collapse')
    .on('show.bs.collapse', function(a) {
      $(a.target).prev('.panel-heading').addClass('active');
    })
    .on('hide.bs.collapse', function(a) {
      $(a.target).prev('.panel-heading').removeClass('active');
    });
});




var cbpAnimatedHeader = (function() {
      var docElem = document.documentElement,


          didScroll = false,

          changeHeaderOn = 300;
      function init() {

          window.addEventListener( 'scroll', function( event ) {

              if( !didScroll ) {

                  didScroll = true;

                  setTimeout( scrollPage, 250 );

              }

          }, false );

      }

      function scrollPage() {

          var sy = scrollY();

        if (sy > 840) {
          headerOnScroll.style.opacity = '1'
        } else {
          headerOnScroll.style.opacity ='';
        }
        
          didScroll = false;
        

      }

      function scrollY() {

          return window.pageYOffset || docElem.scrollTop;

      }

      init();

  })();
  