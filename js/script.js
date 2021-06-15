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

console.log(posThreshold)
function getEvent() {
  return event.type.search('touch') != -1 ? event.touches[0] : event
}

function swipeStart() {
  let evt = getEvent()

  sliderTrack.style.transition = ''

  posInit = posX1 = evt.clientX

  slider.addEventListener('touchmove', swipeAction)
  slider.addEventListener('touchend', swipeEnd)
  slider.addEventListener('mousemove', swipeAction)
  slider.addEventListener('mouseup', swipeEnd)
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

  slider.removeEventListener('touchmove', swipeAction)
  slider.removeEventListener('touchend', swipeEnd)
  slider.removeEventListener('mousemove', swipeAction)
  slider.removeEventListener('mouseup', swipeEnd)

  if (Math.abs(posFinal) > posThreshold) {
    if (posInit < posX1) {
      sliderIndex--
    } else if (posInit > posX1) {
      sliderIndex++
    }
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

    // dots[sliderIndex].classList.add('slider__dot_active')
  })
})

function rollDot() {
  for (let dot of dots) {
    dot.classList.remove('slider__dot_active')
  }
  dots[sliderIndex].classList.add('slider__dot_active')
}

slider.addEventListener('touchstart', swipeStart)
slider.addEventListener('mousedown', swipeStart)
sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`
rollDot()






