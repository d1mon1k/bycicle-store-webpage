'use strict';
//====================BurgerMenu==>
const iconMenu = document.querySelector('.icon-menu'),
  menuBody = document.querySelector('.menu__body');

iconMenu.addEventListener('click', function (event) {
  menuBody.classList.toggle('active')
  this.classList.toggle('active')
})


//====================Slider==>
const slider = document.querySelector('.slider'),
  sliderTrack = document.querySelector('.slider__track'),
  items = document.querySelectorAll('.slider__item'),
  dotsContainer = document.querySelector('.slider__dots');

let sliderIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  slideWidth = slider.offsetWidth,
  trfRegExp = /[-0-9.]+(?=px)/,
  allowSwipe = true;


const posThreshold = 100 //!

function getEvent() {
  return event.type.search('touch') != -1 ? event.touches[0] : event
}

function swipeStart() {
  let evt = getEvent()

  sliderTrack.style.transition = ''

  posInit = posX1 = evt.clientX

  sliderTrack.addEventListener('touchmove', swipeAction)
  sliderTrack.addEventListener('touchend', swipeEnd)
  sliderTrack.addEventListener('mousemove', swipeAction)
  sliderTrack.addEventListener('mouseup', swipeEnd)
}

function swipeAction() {
  let evt = getEvent(),
    style = sliderTrack.style.transform,
    transform = +style.match(trfRegExp)[0];



  posX2 = posX1 - evt.clientX
  posX1 = evt.clientX

  //? console.log(posX1)
  //? console.log(transform + ' ' + 'transform')
  //? console.log(posX2 + ' ' + 'posX2')
  //? console.log(transform - posX2 + ' ' + 'transform - posX2')

  sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`
}

function swipeEnd() {
  let posFinal = posInit - posX1

  sliderTrack.removeEventListener('touchmove', swipeAction)
  sliderTrack.removeEventListener('touchend', swipeEnd)
  sliderTrack.removeEventListener('mousemove', swipeAction)
  sliderTrack.removeEventListener('mouseup', swipeEnd)

  if (Math.abs(posFinal) > posThreshold) {
    if (posInit < posX1 && sliderIndex > 0) {
      sliderIndex--
    } else if (posInit > posX1 && sliderIndex < items.length - 1) {
      sliderIndex++
    }
    rollSlide()
  } else {
    rollSlide()
  }
}

function rollSlide() {
  sliderTrack.style.transition = '.5s'

  sliderTrack.style.transform = `translate3d(-${sliderIndex * slideWidth}px, 0px, 0px)`
  rollDot()
}



for (let item of items) {
  let dot = document.createElement('div')
  dot.classList.add('slider__dot')
  dotsContainer.appendChild(dot)
}
const dots = document.querySelectorAll('.slider__dot')





dots.forEach((dot, index) => {
  dot.addEventListener('click', function () {

    sliderIndex = index
    dot.classList.add('slider__dot_active')

    rollDot()
    rollSlide()
  })
})

function rollDot() {
  for (let dot of dots) {
    dot.classList.remove('slider__dot_active')
  }
  dots[sliderIndex].classList.add('slider__dot_active')
}

function init() {
  console.log('resize');
  slideWidth = document.querySelector('.slider').offsetWidth;

  sliderTrack.style.width = slideWidth * items.length + 'px';
  items.forEach(item => {
    item.style.width = slideWidth + 'px';
    item.style.height = 'auto';
  });
  rollSlide();
}


sliderTrack.addEventListener('touchstart', swipeStart)
sliderTrack.addEventListener('mousedown', swipeStart)
window.addEventListener('resize', init);
sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`
rollDot()
init();