gsap.registerPlugin(Draggable);

// box animasi awal
gsap.to(".box", {
  rotation: 360,
  x: "100vw",
  xPercent: -100,
  duration: 2,
  repeat: -1,
  yoyo: true
});

const texts = gsap.utils.toArray(".introtext");

const tl = gsap.timeline({
  repeat: -1
});

texts.forEach((text) => {
  tl.fromTo(
    text,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
  )
  .to(text, {
    y: -20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.in"
  }, "+=1.5"); // waktu teks stay
});

// design card infinite scroll
const designScroll = document.querySelector('.design-scroll');
const designCards = gsap.utils.toArray('.design-card');

// Clone cards
designCards.forEach(card => {
  const clone = card.cloneNode(true);
  designScroll.appendChild(clone);
});

// new array with all cards
const allCards = gsap.utils.toArray('.design-card');
const cardWidth = allCards[0].offsetWidth + parseInt(getComputedStyle(allCards[0]).marginRight);

// Set container width
gsap.set(designScroll, { width: allCards.length * cardWidth });

// Animation
const scrollTween = gsap.to(designScroll, {
  x: -cardWidth * designCards.length,
  duration: 20,
  ease: 'none',
  repeat: -1,
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % (cardWidth * designCards.length))
  }
});

designScroll.addEventListener('mouseenter', () => scrollTween.pause());
designScroll.addEventListener('mouseleave', () => scrollTween.play());

const scrollContainer = document.getElementById("designScroll");

let speed = 0.6; // makin besar = makin cepat
let isPaused = false;

function autoScroll() {
  if (!isPaused) {
    scrollContainer.scrollLeft += speed;

    if (
      scrollContainer.scrollLeft >=
      scrollContainer.scrollWidth / 2
    ) {
      scrollContainer.scrollLeft = 0;
    }
  }
  requestAnimationFrame(autoScroll);
}

autoScroll();

// Pause kalau user interaksi
scrollContainer.addEventListener("mouseenter", () => isPaused = true);
scrollContainer.addEventListener("mouseleave", () => isPaused = false);
scrollContainer.addEventListener("touchstart", () => isPaused = true);
scrollContainer.addEventListener("touchend", () => isPaused = false);