let iconMenu = document.querySelector('.icon-menu')
let menuBody = document.querySelector('.menu__body')

iconMenu.addEventListener('click', function (event) {
  menuBody.classList.toggle('active')
  this.classList.toggle('active')
})