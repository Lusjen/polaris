let container = document.querySelector('.about-project-container'),
    slides = document.querySelectorAll('.about-project-slides .slide'),
    arrows = document.querySelector('.navigation-box'),
    counter = 0,
    prevCount = 0;
title = container.querySelector('.about-project-text__title'),
    text = container.querySelector('.about-project-text__text'),
    secondTitle = container.querySelector('.about-project-second-text__title'),
    secondText = container.querySelector('.about-project-second-text__text'),
    img = container.querySelector('.about-project-image img'),
    indicator = document.querySelector('.about-project__counter ');
indicator.querySelector('.max').innerHTML = slides.length;
let slide = (slides, arrows) => {
    arrows.querySelector('.previous').addEventListener('click', function() {
        // img.parentNode.style.background = `url(./assets/images/about/${slides[prevCount].dataset.img}) 0 0 `;
        switchText(title, 'textFlipDown', 'title');
        switchText(text, 'textFlipDown', 'text');
        switchText(secondTitle, 'textFlipDown', 'secondtitle');
        switchText(secondText, 'textFlipDown', 'secondtext');
        switchText(img, 'imgFlipDown', 'img');
        prevCount = counter;
        counter = checkCounter(counter);
        // console.log(counter)
    });
    arrows.querySelector('.next').addEventListener('click', function() {
        // img.parentNode.style.background = `url(./assets/images/about/${slides[prevCount].dataset.img}) 0 0 `;
        switchText(title, 'textFlipUp', 'title');
        switchText(text, 'textFlipUp', 'text');
        switchText(secondTitle, 'textFlipUp', 'secondtitle');
        switchText(secondText, 'textFlipUp', 'secondtext');
        switchText(img, 'imgFlipUp', 'img');
        // console.log(counter);
        prevCount = counter;
        counter = checkCounterMinus(counter);
    });

    function switchText(elem, className, datasetName) {
        elem.classList.add(className);
        setTimeout(() => {
            elem.setAttribute('src', `./assets/images/about/${slides[counter].dataset.img}`);
            // elem.classList.add('fadeIn');

        }, 900);
        setTimeout(() => {
            elem.innerHTML = slides[counter].dataset[datasetName];
        }, 850);
        elem.addEventListener('animationend', function() {

            // elem.innerHTML = slides[counter].dataset[datasetName];
            elem.classList.remove(className);
        });
    };
    checkCounter = (digit) => {
        prevCount = digit;
        digit++;
        if (digit > slides.length - 1) {
            return digit = 0;
        } else {
            return digit;
        }
    }
    checkCounterMinus = (digit) => {
        prevCount = digit;
        digit--;
        if (digit < 0) {
            return digit = slides.length - 1;
        } else {
            return digit;
        }
    };
    let slideIndicator = new MutationObserver(() => {
        indicator.querySelector('.current').innerHTML = counter + 1;
    });
    slideIndicator.observe(img, {
        attributes: true,
        childList: true,
        subtree: true
    });
};
// console.log(img.parentNode);

slide(slides, arrows);

/*Слайдер планировок */
$('.slider-js').slick({
    dots: true,
    nextArrow: $('.plans .next'),
    prevArrow: $('.plans .previous')
});
$('.plans .about-project__counter .max')[0].innerHTML = '0' + Math.floor((document.querySelectorAll('.slider-js img').length) / 2);