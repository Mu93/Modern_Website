// --------------------- Start Global section ---------------------

let allBullets = document.querySelectorAll(".nav-bullets .bullet")
    allLinks = document.querySelectorAll(".main-link a");

let scrollToSections = (sections) => {

  console.log(sections);
  sections.forEach(section => {

    section.addEventListener('click' , (e) => {

      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

      })

    })

  });

}

scrollToSections(allBullets);
scrollToSections(allLinks);

//------------------------------------------------

let activeSelection = (active) => {


  active.target.parentElement.querySelectorAll('.active').forEach(item => {

    item.classList.remove('active')

  });

  active.target.classList.add('active')

}

// --------------------- End Global section ---------------------


// --------------------- toggle settings section ---------------------
let settingsBox = document.querySelector('.settings-box'),
    settingsGear = document.querySelector('.fa-gear'),
    gearContainer = document.querySelector('.gear-container');

gearContainer.onclick = function () {

  "use strict";
  settingsGear.classList.toggle("fa-spin")
  settingsBox.classList.toggle("clicked")

}
// --------------------- Color Option - Local Storage ---------------------

let colorsList = document.querySelectorAll('.colors-list li');

// check if there's a color in local storage
let mainColors = localStorage.getItem("color_value");

if (mainColors !== null) {

    // console.log(mainColors);
    document.documentElement.style.setProperty('--main-color' , mainColors)

    colorsList.forEach(item => {

      // Remove active class from all childrens
      item.classList.remove('active')

      // Add active class to selectedColor
      if (item.dataset.color === mainColors) {

        item.classList.add('active')

      }

    });

}

// --------------------- Color Option - Switch Colors ---------------------

// loop on colors list items
colorsList.forEach(li => {

  li.addEventListener("click", (e) => {

    // console.log(e.target);
    let selectedColor = e.target.dataset.color;

    // Set Color On Root
    document.documentElement.style.setProperty('--main-color' , selectedColor)

    // Set Color On Local Storage
    localStorage.setItem("color_value" , selectedColor)

    activeSelection(e)

  })

});

// --------------------- Landing Page background ---------------------

// --------------------- background Option Status ---------------------
let bkgOption = document.querySelectorAll('.background-option span'),
    landingPage = document.querySelector('.landing-page'),
    imgsArray = ['img-1.jpg' , 'img-2.jpg' , 'img-3.jpg' , 'img-4.jpg' , 'img-5.jpg' , 'img-6.jpg'],
    bkgStart = true,
    bkgInterval;


// --------------------- background random ---------------------

  let bkgRandom =  () => {

     "use strict";

      let randomNum = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.background = "url('img/" + imgsArray[randomNum] + "') no-repeat top center ";
      landingPage.style.backgroundSize = "cover";

    }


bkgOption.forEach(item => {

  item.addEventListener("click" , (e) => {

    activeSelection(e)

    if (e.target.dataset.background === "yes") {

      bkgInterval = setInterval(bkgRandom, 2000);
      localStorage.setItem("bkgStatus", true);
    }else {

      clearInterval(bkgInterval)
      localStorage.setItem("bkgStatus", false);

    }

  })


});

  let bkgLocalStatus = localStorage.getItem("bkgStatus");

  if ( bkgLocalStatus !== null) {

    if (bkgLocalStatus === 'true') {

      bkgStart = true;
      document.querySelector('.background-option .yes').classList.add('active')

    }else {

      bkgStart = false;
      document.querySelector('.background-option .no').classList.add('active')

    }

  }

  if (bkgStart === true) {
    bkgInterval = setInterval(bkgRandom, 3000);
  }

// --------------------- End Settings section ---------------------

// --------------------- Start Skills section ---------------------

let ourSkills = document.querySelector(".our-skills");

window.onscroll = () => {

  let skillsOffsetTop = ourSkills.offsetTop,
      skillsOffsetHeight = ourSkills.offsetHeight,
      windowHeight = this.innerHeight,
      windowScrollTop = this.pageYOffset;

  if (windowScrollTop + 200 > (skillsOffsetTop + skillsOffsetHeight - windowHeight)) {

    let allSkills = document.querySelectorAll('.skill-box section.skill-bar');


    allSkills.forEach(skill => {

      skill.style.width = skill.dataset.progress;
    });

  }

}

// --------------------- End Skills section ---------------------

// --------------------- Start gallery section ---------------------

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach(img => {

  img.addEventListener('click' , (e) => {

    // Create overlay element
    let overlay = document.createElement('section');

    // add class to overlay
    overlay.className = 'popup-overlay';

    // append overlay to body
    document.body.appendChild(overlay);

    // create the popup box
    let popupBox = document.createElement('section');

    // add class to the popup box
    popupBox.className = 'popup-box';

    // create the imgs
    let popupImgs = document.createElement('img')

    // set img src
    popupImgs.src = img.src;

    // add img to popupBox
    popupBox.appendChild(popupImgs);

    // append popupBox tobody
    document.body.appendChild(popupBox);


    if (img.alt !== null) {

      // create heading
      let imgHead = document.createElement('h3');

      // create heading text
      let altText = document.createTextNode(img.alt)

      // append text to the heading
      imgHead.appendChild(altText);

      // append the heading to popupBox
      popupBox.insertBefore(imgHead , popupBox.children[0]);

    }

    // create close button
    let closeButton = document.createElement('span');

    // add class to closeButton
    closeButton.className = 'close-button';

    // append closeButton to popupBox
    popupBox.insertBefore(closeButton , popupBox.children[0]);

    // create close icon
    let closeIcon = document.createElement('i');

    // add class to closeIcon
    closeIcon.className = 'fa fa-times fa-lg';

    // append closeIcon to closeButton
    closeButton.appendChild(closeIcon)

    closeButton.onclick = () => {

      document.body.removeChild(overlay)
      document.body.removeChild(popupBox)

    }

  })

});

// --------------------- End gallery section ---------------------


let bulletsSpan = document.querySelectorAll('.show-bullets span'),
    bulletsNav = document.querySelector('.nav-bullets'),
    bulletsLocal = localStorage.getItem('bullets-options');


if (bulletsLocal !== null) {

  bulletsSpan.forEach(item => {

    item.classList.remove('active')

  });

  if (bulletsLocal === 'block') {

    bulletsNav.style.display = 'block';

    document.querySelector(".show-bullets .block").classList.add('active')

  }else {

    bulletsNav.style.display = 'none';

    document.querySelector(".show-bullets .none").classList.add('active')

  }

}

bulletsSpan.forEach(span => {

  span.addEventListener('click' , (e) => {

    if (e.target.dataset.display === 'block') {

      bulletsNav.style.display = 'block';

      localStorage.setItem('bullets-options', 'block')

    }else {

      bulletsNav.style.display = 'none'

      localStorage.setItem('bullets-options', 'none')

    };

    activeSelection(e);


  })

});


// Default Reset
document.querySelector('.default-reset').onclick = () => {

  // localStorage.clear(); // remove all stored info
  localStorage.removeItem("color_value")
  localStorage.removeItem("bkgStatus")
  localStorage.removeItem("bullets-options")

  window.location.reload()

}




let toggleBtn = document.querySelector("header .navbar-toggle"),
    tLinks = document.querySelector("header nav.main-link");


    toggleBtn.onclick = (e) => {

      e.stopPropagation();

      toggleBtn.children[0].classList.toggle("menu-active");
      tLinks.classList.toggle("open");

    }

    tLinks.onclick = (e) => {

      e.stopPropagation();

    }




document.addEventListener("click", (e) => {

  // console.log(e.target);

  if (e.target !== toggleBtn && e.target !== tLinks) {

    if (tLinks.classList.contains("open") ) {

      toggleBtn.children[0].classList.toggle("menu-active");
      tLinks.classList.toggle("open");

    }

  }


})
