const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressDotsContainer = document.getElementById('progressDots');

let currentIndex = 0;
let autoPlayId;

function buildDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      showSlide(index);
      restartAutoplay();
    });
    progressDotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = Array.from(document.querySelectorAll('.dot'));
  dots.forEach((dot, index) => {
    dot.classList.toggle('is-active', index === currentIndex);
  });
}

function showSlide(index) {
  const activeSlide = slides[currentIndex];
  const nextSlide = slides[index];

  if (!nextSlide || nextSlide === activeSlide) return;

  if (activeSlide) {
    activeSlide.classList.remove('is-active');
  }

  nextSlide.classList.add('is-active');
  currentIndex = index;
  updateDots();
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

function startAutoplay() {
  autoPlayId = setInterval(() => {
    nextSlide();
  }, 4000);
}

function restartAutoplay() {
  clearInterval(autoPlayId);
  startAutoplay();
}

prevBtn.addEventListener('click', () => {
  prevSlide();
  restartAutoplay();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  restartAutoplay();
});

buildDots();
showSlide(0);
startAutoplay();
