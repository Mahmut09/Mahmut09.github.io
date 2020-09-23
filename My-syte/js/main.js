const home = document.getElementById('home'),
      about = document.getElementById('about'),
      skills = document.getElementById('skills'),
      works = document.getElementById('works'),
      contact = document.getElementById('contact'),
      iconTextHome = document.querySelector('.icon-text-home'),
      iconTextAbout = document.querySelector('.icon-text-about'),
      iconTextSkills = document.querySelector('.icon-text-skills'),
      iconTextWorks = document.querySelector('.icon-text-works'),
      iconTextContact = document.querySelector('.icon-text-contact'),
      iconHome = document.getElementById('icon-home'),
      iconAbout = document.getElementById('icon-about'),
      iconSkills = document.getElementById('icon-skills'),
      iconWorks = document.getElementById('icon-works'),
      iconContact = document.getElementById('icon-contact'),

      aboutMe = document.getElementById('about-me'),
      name = document.querySelector('.name'),

      curs = document.querySelector('.cursor');

const loader = document.querySelector('.preloader');

loader.style.display = 'flex'

const load = () => {
    loader.style.display = 'none';
}

setTimeout(load, 200);


home.addEventListener('mouseover', () => {
    iconTextHome.classList.add('active-text-icon');
    iconHome.style.opacity = '0';
});

home.addEventListener('mouseout', () => {
    iconTextHome.classList.remove('active-text-icon');
    iconHome.style.opacity = '1';
});

about.addEventListener('mouseover', () => {
    iconTextAbout.classList.add('active-text-icon');
    iconAbout.style.opacity = '0';
});

about.addEventListener('mouseout', () => {
    iconTextAbout.classList.remove('active-text-icon');
    iconAbout.style.opacity = '1';
});

skills.addEventListener('mouseover', () => {
    iconTextSkills.classList.add('active-text-icon');
    iconSkills.style.opacity = '0';
});

skills.addEventListener('mouseout', () => {
    iconTextSkills.classList.remove('active-text-icon');
    iconSkills.style.opacity = '1';
});

works.addEventListener('mouseover', () => {
    iconTextWorks.classList.add('active-text-icon');
    iconWorks.style.opacity = '0';
});

works.addEventListener('mouseout', () => {
    iconTextWorks.classList.remove('active-text-icon');
    iconWorks.style.opacity = '1';
});

contact.addEventListener('mouseover', () => {
    iconTextContact.classList.add('active-text-icon');
    iconContact.style.opacity = '0';
});

contact.addEventListener('mouseout', () => {
    iconTextContact.classList.remove('active-text-icon');
    iconContact.style.opacity = '1';
});


aboutMe.addEventListener('mouseover', (event) => {
    const target = event.target;
    
    if (target === aboutMe || target === name) {
        return
    } else {
        target.style.transition = '.22s';
        target.style.color = '#08fdd8';
        target.style.display = 'inline-flex';
        target.style.animation = 'blast 0.55s 1';
    }
});

aboutMe.addEventListener('mouseout', (event) => {
    const target = event.target;

    if (target === aboutMe || target === name) {
        return
    } else {
        target.style.color = '';
        target.style.display = ''
        target.style.animation = '';
    }
});
