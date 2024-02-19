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

//////////////////////////////////////////////////////////////
//DOM API
/*
DOM is basically the interface between the JS code and the browser. More specifically Html documents that are rendered in by the browser.

1 - DOM allows us to make JS interact with the browser

2 - We can write JS to create, modify and delete html elements, set styles, classes and attributes and listen and respond to events

3 - DOM tree is generated from an html document, which we can then interact with

(A DOM tree is a tree like structure which is made out of nodes)

4 - DOM is a very complex API (application programming interface) that contains lots of methods and properties to interact with the DOM tree.

the DOM has many methods such as querySelectorALL(), querySelector(), addEventListner(),. children(), .innerHTML(), .TextContent(), .CreateElement() etc.

In DOM there are different types of nodes some are html elements, and some are just text.

ALL the different DOM properties are organized into different types of objects.

A Node has different child type :

element - text - comment - document

the element type has a child type called htmlelement and each html element has different attribute

the html elements are - htmlbuttonelement, htmlimageelement, htmldivelement etc

and all of this work because of something called inheritace.

Inheritance is basically that every child type will have access to all the properties and methods of its parent type.

the DOM API needs a way to of allowing all the node types to listen to events and we usually listen to events by calling the addEventListner Method on an element or the document. This works because of a special node type which is called Event Target which is a parent of both the node type and the window node type and because of inheritance we can call the add event listner method to every single type of node in the DOM API because all the elements, text, comments, documents will inherit this method.

Note - The Event Target is an abstract and we do not use this in practice
*/
//////////////////////////////////////////////////////////////
// Selecting, Creating, and Deleting Elements
//Selceting elements
//selecting the entire document
console.log(document.documentElement);
//if we want to apply css style to the entire document we need to use documentElement

//selecting head
console.log(document.head);
//selecting body
console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section'); //will return a node list
//this methods are also available for elements
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // this methods will return a HTML collection and not a node list
// if we change anything in the DOM then this collection will be updated automatically and all of this does not happen in the node list

console.log(document.getElementsByClassName('btn'));
// this will also return a life html collection

//CREATING elements//////////////////////////////////////////
// create an element
//this will return a dom element that we can save some where
const message = document.createElement('div');
//adding a class to the element
message.classList.add('cookie-message');
//adding text to the element
message.textContent = 'We use Cookies for improved functionality and analytics';
// inserting the message t the html
message.innerHTML =
  'We use Cookies for improved functionality and analytics. <button class = "btn btn--close--cookie">Got it!</button>';
//appending the message in to the header
// header.prepend(message);
//perpending basically adds the element as the first child of this element
//we can also add it as the last child
header.append(message);

//as we can see the element is only iserted once this is because it is now life element is living inside the dom therefore it cannot be at multiple places at same time

//we can use the prepend and the append methods to move the elements

// to insert multiple copies of the same element
//first we need to copy the first element
// header.append(message.cloneNode(true));
//the cloneNode() will copy the node and passing true means all the child element will be copied

//this will display the element before the header
// header.before(message);
// And this display the element after the header
// header.after(message);

//DELETE element
// now we remove the element after we click the got it button
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });
//////////////////////////////////////////////////////////////
// Styles, Attributes and Classes
/*
//Styles
// to set a style on the element
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//reade style
console.log(message.style.height); // the style property only works for inline styles and also we cannot get a style which is hidden in the class
console.log(message.style.backgroundColor); //rgb(55, 56, 61)

// but if we want the styles which is in the class
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); //rgb(187, 187, 187)

console.log(getComputedStyle(message).height); //58.9688px

//lets increase the height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';

//Setting CSS custom properties
document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes*********************
//read attributes value
//standard attribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //Bankist logo
console.log(logo.src); //http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.className); //nav__logo
console.log(logo.getAttribute('src')); //img/logo.png
//Set Attribute
logo.alt = 'beautiful Logo';
logo.setAttribute('company', 'Bankist');
//non standard attribute
//read
console.log(logo.designer); //indefined
console.log(logo.getAttribute('designer')); //Faisal

//Data Attributes
// data attributes are special kind or attributes that start with data
console.log(logo.dataset.versionNumber); //3.0

//Classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

//do not use this because this overwrite all the other classes and allow us to give only one class
// logo.className = 'Faisal'
*/
/////////////////////////////////////////////////////////////
//smooth scrolling
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   //first get the co-ordinates of the element we want to scroll to
//   const sectionCords = section1.getBoundingClientRect();
//   console.log(sectionCords);
//   //DOMRect {x: -30, y: 846, width: 996, height: 1538.8828125, top: 846, …}

//   //co-ordinates of the target element
//   console.log(e.target.getBoundingClientRect());

//   //current scroll
//   console.log('current scroll(X/Y)', window.pageXOffset, pageYOffset); //current scroll(X/Y) 0 300

//   //demensions of the viewport
//   console.log(
//     'height and width of viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   ); //height and width of viewport 820 996

//   //scrolling
//   // window.scrollTo(
//   //   sectionCords.left + window.pageXOffset,
//   //   sectionCords.top + window.pageYOffset
//   // );
//   //old way
//   // window.scrollTo({
//   //   left: sectionCords.left + window.pageXOffset,
//   //   top: sectionCords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   //es6 way
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
//////////////////////////////////////////////////////////////
// Types of Events and Event Handlers
// An event is basically a signal that is generated by a certian dom node and signal means that something has happened
//ex - click, mouse moving etc...
// mouse enter event
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEvent listner: you are reading the heading');
// });

//Old way
// h1.onmouseenter = function (e) {
//   alert('addEvent listner: you are reading the heading');
// };

//how to remove an event handler after appearing once***
//export the function into a named function
// const alerth1 = function (e) {
//   alert('addEvent listner: you are reading the heading');

//   h1.removeEventListener('mouseenter', alerth1);
// };
//h1.addEventListener('mouseenter', alerth1);
//now we can only listen the event once

//using settimeout
// const alerth1 = function (e) {
//   alert('addEvent listner: you are reading the heading');
// };
// h1.addEventListener('mouseenter', alerth1);
// setTimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000);
/////////////////////////////////////////////////////////////
// Event Propagation: Bubbling and Capturing (in practice)
// attching event handlers to the navigation links and also its parent element
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}`;

//attching event handlers to features navigation link and it's parent element
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  //e.target is used to know where the event actually happened
  //the currentTarget is indeed the element on which the event handler is attached
  //therefore
  console.log(e.currentTarget === this); //true
  // in an event handler the this keyword is always points to the element the event handler is attached

  //stop propogation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('Container', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('nav', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});
*/
////////////////////////////////////////////////////////////
//DOM traversing
/*
//working with h1 element and from here we can go downwards, upwards and also sideways
const h1 = document.querySelector('h1');
//querySelector slects the children no matter how deep it is in the dom tree
// Going Downwards: selecting child elements
console.log(h1.querySelectorAll('.highlight')); //NodeList(2) [span.highlight, span.highlight]
//this selects all the elements of the highlight class that are children of the h1 element
// And other elements of the highlight class will not be selected because they are not the children of the h1 element

// IF we want direct children
console.log(h1.childNodes); //NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
// In this we get every child element

//gives an HTML life collection
console.log(h1.children); //HTMLCollection(3) [span.highlight, br, span.highlight]

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';

// Going upwards: selecting parents
console.log(h1.parentNode);
console.log(h1.parentElement);

//selecting a parent element which is far above the DOM tree
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // setting a CSS custom attributes
// Closest selects the parent element no matter how far up the dom tree passing the parent element

// Going sideways: selecting siblings
// in JS we can only select direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// If we all of the siblings elements and not just previous and the next one
// then we can use the trick of moving up to the parent element
console.log(h1.parentElement.children); //HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
// it will also include itself

[...h1.parentElement.children].forEach(function (el) {
  //stylilng all the siblings except the element itself
  if (el != h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/
/////////////////////////////////////////////////////////
//Lifecycle DOM Events
//DOM content loaded
//this event fired by the document as soon as the HTML is completely parsed which means the HTML has been downloaded and been converted to the DOM tree
// And also all the scripts must be downloaded and excuted
// before the DOM content loaded event can happen

//with this here we can now execute the code after the  DOM is completely loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and Dom tree built!!', e);
});

//note - but if we have the script tag in the html at the bottom then we do not have to lsiten to the DOM content loaded event.
//how to load JS file in the vanilla js file or jquery

//the loaded event
//this event is only fired when all the html and the images and the css file are loaded
//so basically when the complete page has finished loading is when this event is fired
window.addEventListener('load', function (e) {
  console.log('page fully loaded ', e);
});

//before unload***
//this event is created before a user is about to leave the page
//And if we want to ask the user if he 100% want to leave the page
//but interaction with the page is necessary
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
