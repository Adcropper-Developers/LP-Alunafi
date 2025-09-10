// Telefon Değiştirme Kısmı
let isNotHovered = true;
const screenContent = document.querySelector('.screen-content');
const checkBoxes = document.querySelectorAll('.checkbox');
// Background image icin ornek
// const defaultColor = './assets/defaultimage';
const defaultColor = 'white';
// Background image icin ornek
// const colors =  ['./assets/image1', './assets/image2', './assets/image3', './assets/image4'];
const colors = ['', './assets/home-page/secure-data-encryption1.png', './assets/home-page/multi-devices-screen.png','./assets/home-page/progress.png'];
checkBoxes.forEach((item, idx) => {
  item.addEventListener('mouseover', () => {
    screenContent.style.backgroundColor = colors[idx];
    // Background image icin ornek
    // Styledaki ilk virgule kadar olan kisim telefonun çentiği için o kısmı silmemek lazım
    screenContent.style.backgroundImage = `url(./assets/home-page/Notch.svg), url(${colors[idx]})`;
    screenContent.style.backgroundRepeat = "no-repeat, no-repeat";
    screenContent.style.backgroundSize = "50%, 100% 100%";
    screenContent.style.backgroundPosition = "50% -1%, 50% 100%";
    isNotHovered = false;
  });
  item.addEventListener('mouseleave', () => {
    checkMouseOver();
  })
});

function checkMouseOver() {
    isNotHovered = true; // Varsayılan olarak true yap
    checkBoxes.forEach(element => {
      if (element.matches(":hover")) {
        isNotHovered = false; // Eğer biri bile hover olmuşsa false yap
      }
    });
    if (isNotHovered) {
      screenContent.style.backgroundColor = 'transparent';
      // screenContent.style.backgroundImage = `url(./assets/Notch.svg)`;
      // screenContent.style.backgroundRepeat = `no-repeat`;
      // screenContent.style.backgroundSize = `50%`;
      // screenContent.style.backgroundPosition = `50% -1%`;
    }
  }