const navbarNav = document.getElementById('navbarNav'),
      navbarToggler = document.querySelector('.navbar-toggler'),
      interviewBtn = document.querySelector('.interview-btn');

const openNav = () => {
    navbarNav.classList.toggle('is-open');
}

navbarToggler.addEventListener('click', openNav);

new Swiper('.swiper-container', {
    loop: true,
    autoplay: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      speed: 500,
      longSwipesMs: 1000,

})
