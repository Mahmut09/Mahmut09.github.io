const myTags = [
    'JavaScript', 'CSS', 'HTML',
    'JQuery', 'VueJS', 'Bootstrap',
    'Unix', 'Vanilla Js', 'Linux',
    'C++', 'Sass', 'Pascal',
];

let tagCloud = TagCloud('.sphere-content', myTags, {

    radius: 350,

    maxSpeed: 'fast',
    initSpeed: 'normal',

    direction: 135,
    
    keep: false
    
});

let scale = 1;
const sphere = document.querySelector('.tagcloud');

    const zoom = (event) => {
        let delta = event.deltaY || event.detail || event.wheelDelta;
        const target = event.target;

        if (target === sphere) {
            if (scale < 0.9) {
                scale = 1;
            } else {
                if (scale < 1.8 && delta < 0) scale += 0.1;
                else scale -= 0.1;
            }
        }

        event.target.style.zoom = scale;


        event.preventDefault();
    }

document.querySelector('.sphere-content').addEventListener("wheel", zoom);