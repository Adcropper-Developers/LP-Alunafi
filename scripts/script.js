// Accordion menu

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.classList.toggle("show");
  });
}

// Scroll navbar

window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 120 ||
    document.documentElement.scrollTop > 120
  ) {
    document.querySelector(".navbar").classList.add("navbar-scroll");
  } else {
    document.querySelector(".navbar").classList.remove("navbar-scroll");
  }
}

// Navbar
const nav = document.getElementById("nav");
nav.innerHTML = `
 <div class="navbar">
      <a href="./index.html">
          <img src="./assets/general/alunafi-logo.svg" class="alunafi-logo" alt="" />
      </a>
      <div class="mobilMenuIcon" id="mobilMenuIcon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="menu" id="menu">
        <a href="./index.html">Home</a>
        <a href="./business.html">Business</a>
        <a href="./services.html">Services</a>
        <a href="./faq.html">FAQ’s</a>
        <a href="https://blog.alunafi.com/">Blog</a>
        <a href="./careers.html">Careers</a>
      </div>
    </div>
    <div class="buttonContainer">
      <a href="https://epay.alunafi.com/en/login" target="_blank" class="orangeButton button">OPEN ACCOUNT</a>
      <a href="https://epay.alunafi.com/en/login" target="_blank" class="greenButton button">LOGIN</a>
    </div>
`;


let menus = document.querySelectorAll(".menu a");
  
  menus.forEach((menu) => {
  if(window.location.href.includes(menu.href)) {
    menu.classList.add("active");
  }
  
  if (menu.href == window.location.href) {
    menu.classList.add("active");
   
  }else if(window.location.href == "https://alunafi.com" && menu.href == "https://alunafi.com/index.html") {
    menu.classList.add("active");
  }
  
});

// navbar mobil menu
let mobilMenuIcon = document.getElementById("mobilMenuIcon");
let menu = document.getElementById("menu");
let navbar = document.querySelector(".navbar");
mobilMenuIcon.addEventListener("click", () => {
  mobilMenuIcon.classList.toggle("show");
  menu.classList.toggle("show");
  navbar.classList.toggle("show");
});

const script = document.createElement("script");
script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
script.async = true;
document.body.appendChild(script);


// Footer
let footer = document.getElementById("footer");
footer.innerHTML = `<div class="footerTop">
            <div>
                <p><b>Company</b></p>
                <a href="business.html">Business</a>
                <a href="services.html">Services</a>
                <a href="faq.html">FAQ’s</a>
                <a href="https://blog.alunafi.com/">Blog</a>
            </div>
            <div>
                <p><b>Services</b></p>
                <a href="services.html#sepa-payments">Swift/SEPA Payments</a>
                <a href="services.html#decided-ibans">Dedicated IBANs</a>
                <a href="services.html#multi-currency">Multi-Currency Accounts</a>
                <a href="services.html#card-solutions">Card Solutions</a>
            </div>
            <div>
                <a><b>Links</b></a>
                <a href="#" onclick="createContactForm(event)">Contact Us</a>
                <a href="resources.html">Resources</a>
                <a href="https://docs.alunafi.com">Documentation</a>
                <a href="banking-currency-holiday.html">Banking Currency Holiday</a>
            </div>
            <div>
                <p><b>Legal</b></p>
                <a href="terms-and-conditions.html">Terms & Conditions</a>
                <a id="privacy-policy" href="privacy-policy.html">Privacy Policy</a>
                <a id="cookie-policy" href="cookie-policy.html">Cookie Policy</a>
                <a id="complaint-procedure" href="complaint-procedure.html">Complaints Handling Procedure</a>
                <a href="schedule-of-fees.html">Schedule of Fees</a>
            </div>
           
        </div>
        <div class="footerBottom">
        <div class="footerBottomTop">
            <div class="footerLogoText">
                <a href="./index.html">
                  <img src="./assets/general/alunafi-logo.svg" class="alunafi-logo" alt="" />
                </a>
                <p>© All rights reserved 2025</p>
            </div>
            <div class="socialMedia">
                <a href="https://www.linkedin.com/company/alunafi-ltd" target="_blank">
                    <img src="./assets/general/linkedin.svg" alt="linkedin">
                </a>
            </div>
        </div>
            <p>Alunafi Ltd. (C 105474) is licenced by the MFSA as a financial institution under the Financial Institutions Act (Cap.376 of the Laws of Malta)</p>
             <div class="trustpilot-widget" data-locale="en-GB" data-template-id="56278e9abfbbba0bdcd568bc"
    data-businessunit-id="6870aa5a04686208777c0a28" data-style-height="52px" data-style-width="100%"> <a
      href="https://uk.trustpilot.com/review/alunafi.com" target="_blank" rel="noopener">Trustpilot</a> </div>  
      </div>
`;

// footer contact form
function createContactForm(e) {
  e.preventDefault();
  let contactFormDiv = document.createElement("div");
  contactFormDiv.classList = "contactFormCont";
  let formDiv = document.createElement("div");
  formDiv.classList = "contactForm";
  let formTextDiv = document.createElement("div");
  let h1 = document.createElement("h1");
  formDiv.append(h1);
  h1.innerText = "Contact Us";
  contactFormDiv.appendChild(formDiv);
  let form = document.createElement("form");
  form.setAttribute("action", "https://formspree.io/f/manokrkd");
  form.setAttribute("method", "POST");
  let labelName = document.createElement("label");
  labelName.innerText = "Full Name";
  let labelMail = document.createElement("label");
  labelMail.innerText = "E-mail";
  let labelMessage = document.createElement("label");
  labelMessage.innerText = "Message";
  let inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("name", "name");
  let inputMail = document.createElement("input");
  inputMail.setAttribute("type", "email");
  inputMail.setAttribute("name", "email");
  let inputMessage = document.createElement("textarea");
  inputMessage.setAttribute("type", "text");
  inputMessage.setAttribute("name", "message");
  let submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.innerText = "Contact Us";
  form.append(
    labelName,
    inputName,
    labelMail,
    inputMail,
    labelMessage,
    inputMessage,
    submitBtn
  );
  formTextDiv.append(form);
  formDiv.append(formTextDiv);
  let p = document.createElement("p");
  p.innerHTML =
    `<b>Address</b> 
    <br> Office 3, Floor 2 <br> Ta’ Mallia Buildings <br> Triq In-Negozju <br> Zone 3, Central Business District <br> Birkirkara, CBD 3010
    <br>
    <br>
    <b>Customer Support</b>
    <br>
    +356 2705 5855
    `;
  formDiv.append(p);
  document.body.appendChild(contactFormDiv);

  // Dış tıklama ile formu kapatma
  contactFormDiv.addEventListener("click", () => {
    document.body.removeChild(contactFormDiv);
  });
  // Form içine tıklanırsa kapanmaması için event durduruluyor
  formDiv.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}
// leaving alunafi popup
function createLeavingAlunafiPopup(e, targetUrl) {
  e.preventDefault();
  let popupContainer = document.createElement("div");
  popupContainer.classList = "popupContainer";
  let popup = document.createElement("div");
  popup.classList = "popup";
  let popupH1 = document.createElement("h1");
  popupH1.innerText = "You’re About to Leave alunafi.com";
  let popupP = document.createElement("p");
  popupP.innerHTML =
    "The link you’ve selected will take you to a website that is not operated by Alunafi Ltd. <br> Please note that Alunafi Ltd. is not responsible for the content or security of external sites.";
  let butonContainer = document.createElement("div");
  butonContainer.classList = "buttonContainer";
  let button1 = document.createElement("button");
  button1.classList = "buttonWhite";
  button1.innerText = "CANCEL";
  let button2 = document.createElement("button");
  button2.classList = "buttonGreen";
  button2.innerText = "CONTINUE";
  document.body.appendChild(popupContainer);
  popupContainer.appendChild(popup);
  popup.appendChild(popupH1);
  popup.appendChild(popupP);
  butonContainer.appendChild(button1);
  butonContainer.appendChild(button2);
  popup.appendChild(butonContainer);

  // dışarı tıklayınca popup kapanacak
  popupContainer.addEventListener("click", () => {
    document.body.removeChild(popupContainer);
  });
  // cancel butonuna tıklayınca popup kapanacak
  button1.addEventListener("click", () => {
    document.body.removeChild(popupContainer);
  });
  // CONTINUE butonu
  button2.addEventListener("click", () => {
    document.body.removeChild(popupContainer);
    window.open(targetUrl, "_blank"); // Yeni sekmede aç
  });
}
const buttons = document.querySelectorAll("a");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const targetUrl = e.target.href;
    // if(e.target.parentElement && e.target.parentElement?.classList.value == "menu") return;

    if (
      (!targetUrl.includes("alunafi.com")) &&
      (!targetUrl.includes("http://127.0.0.1")) &&
      (!targetUrl.includes("alunafi-adcropperteam.vercel.app")) &&
      (!targetUrl.includes("lp-test-git-alunafi-adcropper.vercel.app"))
    ) {
      createLeavingAlunafiPopup(e, targetUrl);
    }
  });
});


// loader
// sayfa geçişleri animasyonlar
window.onload = () => {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");

  const isMobile = window.innerWidth <= 768;
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    let threshold = 0.4; // varsayılan

    // Eğer section7 ve mobilse threshold'u 0.1 yap
    if (section.classList.contains("section7") && isMobile) {
      threshold = 0.15;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("active");
          } else {
            // section.classList.remove("active"); // İsteğe bağlı
          }
        });
      },
      { threshold: threshold }
    );

    observer.observe(section);
  });
};

const whatsapp = `
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<a href="https://api.whatsapp.com/send?phone=35677598981&text=Hello%20welcome%20to%20Alunafi%20customer%20support" class="float" target="_blank">
  <img src='./assets/general/whatsapp.svg' class='whatsapp-icon' draggable='false' alt='whatsapp icon' />
</a>
`;
document.body.insertAdjacentHTML('beforeend', whatsapp);