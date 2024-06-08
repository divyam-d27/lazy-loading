// REVEALING elements on SCROLL

const allSections = document.querySelectorAll(".section"); // selecting all the sections

const revealSection = function (entries, observer) {
  const [entry] = entries; // getting entry out of entries
  console.log(entry);

  // since we are observing all the sections at once.. we need a way to select particularly one.. and alter its class
  // hence we use "target" property in "IntersectionObserverEntry" (entry in this case) to access "classList"
  // entry.target.classList.remove('section--hidden');

  // we need to check for "isIntersecting" as, first section is always observed and removes "hidden" class, beforehand

  if (!entry.isIntersecting) return; // using "Guard Clause"

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target); // unobserve, because we need the effect only once.
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  sectionObserver.observe(section); // observing all the sections
  section.classList.add("section--hidden"); // add "hidden" class to all the sections..
});

// ================================================ lazy loading Images

const imgTargets = document.querySelectorAll("img"); // selecting all the images

// observer callback
const loadImg = function (entries, observer) {
  const [entry] = entries;

  // return the function if the target element is not intersecting.
  if (!entry.isIntersecting) return;

  // replace image source with original image.
  entry.target.src = entry.target.dataset.src;

  // updation of sorce of image happens in background by JS. once done emits a "load" event

  // entry.target.classList.remove('lazy-img');
  // ⚠️ We should not do this becaus eit will remove the blur filter immediately even before the original image is loaded.

  // we want to remove the blur filter only when the original image has completely loaded.
  // therefore we listen to the "load" event. Emitted only when the new source of image has completed loading.
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  // to stop observing when the effect is done
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // rootMargin: "200px", // In case we want to load the img before user reaches it
});

// Attaching an image observer to all of the images.

imgTargets.forEach((img) => imgObserver.observe(img));
