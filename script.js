'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
//QuerySelectorAll gives a node list
// A node list is not an array but it does have the forEach method
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  //first get the co-ordinates of the element we want to scroll to
  const sectionCords = section1.getBoundingClientRect();
  console.log(sectionCords);
  //DOMRect {x: -30, y: 846, width: 996, height: 1538.8828125, top: 846, …}

  //co-ordinates of the target element
  console.log(e.target.getBoundingClientRect());

  //current scroll
  console.log('current scroll(X/Y)', window.pageXOffset, pageYOffset); //current scroll(X/Y) 0 300

  //demensions of the viewport
  console.log(
    'height and width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); //height and width of viewport 820 996

  //scrolling
  // window.scrollTo(
  //   sectionCords.left + window.pageXOffset,
  //   sectionCords.top + window.pageYOffset
  // );
  //old way
  // window.scrollTo({
  //   left: sectionCords.left + window.pageXOffset,
  //   top: sectionCords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //es6 way
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////////////////
// page navigation********
//without delegation

// document.querySelectorAll('.nav__link').forEach(ele =>
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();
//     //prevent default behaviour
//     const Id = this.getAttribute('href');
//     //storing the href attribute value in Id var
//     console.log(Id);
//     //then passing the Id var containg the href value
//     document.querySelector(Id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

//with event delegation (for better performance and uses less memory)
//add the event listner to a common parent element
//dedtermin what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  //prevent default behaviour

  //matching stratergy
  // in this we only want to work with the tagert element and not the whole container i.e only the links
  //because if we click the container instead of the links the functions will also give us the whole container
  //therefore we check if the tagert element contains the class 'nav__link
  if (e.target.classList.contains('nav__link')) {
    // console.log('link');
    const Id = e.target.getAttribute('href');
    //storing the href attribute value in Id var
    console.log(Id);
    //then passing the Id var containg the href value
    document.querySelector(Id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed Component

//using event delegation
tabsContainer.addEventListener('click', function (e) {
  //fingding the closest parent of this class name
  const tabsClicked = e.target.closest('.operations__tab');
  console.log(tabsClicked);
  //gaurd clause
  //it is a if statement which returns early if the conditions is matched
  //if there is no clicked then return the function immediately
  if (!tabsClicked) return;
  //old way
  // if (tabsClicked) {
  //   tabsClicked.classList.add('.operations__tab-active');
  // }
  // Active tabs
  // First removing the class from all the tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // And then adding it to only to the clicked element
  tabsClicked.classList.add('operations__tab--active');

  // Active content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${tabsClicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animations

const hover = function (e /*opacity*/) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //first going up to select the parent and then going down to select the children
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // for logo
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      // if the current element is not the clicked link
      // Then change the opcity
      if (el !== link) {
        el.style.opacity = this; //opacity;
      }
    });
    logo.style.opacity = this; //opacity;
  }
};

//passing an argument into a handler function*******
// nav.addEventListener('mouseover', function (e) {
//   hover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   hover(e, 1);
// });

//the bind method creates a copy of the function that is called on and itt will set the this keyword in this function call to whatever value we pass in the bind method
//bind returns a new function
nav.addEventListener('mouseover', hover.bind(0.5));

nav.addEventListener('mouseout', hover.bind(1));
//////////////////////////////////////////////////////////
/*
//old way
// Sticky Navigation
const cords = section1.getBoundingClientRect();
console.log(cords);
//working with the scroll evnet
window.addEventListener('scroll', function (e) {
  //for scroll position
  console.log(window.scrollY);

  //check if the scrollY is greater than cords
  if (this.window.scrollY > cords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

// Sticky navigation: Intersection Observer API
// The observer API takes in the a callback function and a options object

//Callback function
// const obsCallback = function (entries, observer) {
//   //this function will be called each time when the target element will intersect with our root element at the given thereshold
//   entries.forEach(entry => console.log(entry));
//   //with this we get an intersection observer entry
//   //IntersectionObserverEntry {time: 932.5, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: false, …}
//   //this appeared because the target element appeared in the viewport
// };
// const obsOptions = {
//   //the root is the element that the target is intersecting
//   // the section1 is the element that the root element will intersect
//   root: null,
//   // this the percentage of intersection at which the observer callback will be called
//   // threshold: 0.1, //10%
//   thershold: [0, 0.2],
//   // 0 maens that our callback will get triggerd each time our target element moves completely out of the view and aslo as soon as it enters the view
//   // the callback will get called each time the target element comes into the view and move out of the view
//   // AND if put one i.e[0,1,0.2] then the callback function will be called when 100% of the target element is visible into the viewport
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// //section1 is the target element
// observer.observe(section1);

const header = document.querySelector('.header');
//calculating the rootmargin dynamically
const newHeight = nav.getBoundingClientRect().height;
// console.log(newHeight);

const stickyNav = function (entries) {
  //the entries are basically the thershold it can be an array also
  //destructring to get the first element of the entries
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting === false) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  //if 0% of header is visiable then we want something to happen
  threshold: 0,
  rootMargin: `-${newHeight}px`,
});
headerObserver.observe(header);
////////////////////////////
//Revel sections
//Fade In Animation
//In This we are going to observer all The section using the same observer
const allSections = document.querySelectorAll('.section');

const revelEntries = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //the target we use here is a property of interSectioObser API and we can see that when we log the entry to the console
  // The target basically contains the targert section when the interstion happens
  if (!entry.isIntersecting) return;
  else {
    entry.target.classList.remove('section--hidden');
    //unobserve the target section
    //unobserving makes the performance good
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revelEntries, {
  root: null,
  threshold: 0.15, // the sections will only revel when it is 15% visible
});

//looping over all the sections
allSections.forEach(function (sec) {
  sectionObserver.observe(sec);
  //adding the hidden class dynamically
  sec.classList.add('section--hidden');
});

//LAzy Loading Images
//Good for performance
// the data-src attribute contains the original image
//so we need to slect the images that has the data-src property
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observe) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  //Replace The src Attribute With data-src
  entry.target.src = entry.target.dataset.src;

  //Now we are goinging to use the load listner event to first load the image and then display it
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});
/////////////////////////////////////////////////////
//Slider
const sliderAnimation = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  //max number of siles
  let maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  //////////////////////////////////
  //Dots Function
  const createDot = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  // createDot();

  const activeDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');

      document
        .querySelector(`.dots__dot[data-slide="${slide}"`)
        .classList.add('dots__dot--active');
    });
  };
  // activeDot(0);
  //this function will take the number of slides
  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  // gotoSlide(0);

  //Slide Functions
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    gotoSlide(curSlide);
    activeDot(curSlide);
  };
  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    gotoSlide(curSlide);
    activeDot(curSlide);
  };

  //initialization function
  const init = function () {
    createDot();
    activeDot(0);
    gotoSlide(0);
  };
  init();

  //////////////////////////////
  // Event Handlers
  //next slide
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener(
    'click',
    previousSlide
    // if (curSlide === 0) {
    //   curSlide = maxSlide - 1;
    // } else {
    //   curSlide--;
    // }
    // gotoSile(curSlide);
  );
  //curSlide = 1, -100%, 0%, -100%, -200%

  //Keyboards event
  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') {
      previousSlide();
    }
    e.key === 'ArrowRight' && nextSlide();
  });

  //event DElegation again
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log('DOT');
      //reading the slide number
      const slide = e.target.dataset.slide;
      console.log(slide);
      gotoSlide(slide);
      activeDot(slide);
    }
  });
};
sliderAnimation();
