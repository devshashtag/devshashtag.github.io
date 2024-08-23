function sliderControls() {
  const sliders = document.querySelectorAll('.modal-slider');

  // controls event
  for (const slider of sliders) {
    const images = slider.querySelector('.slider__images');
    const selectors = slider.querySelector('.slider__selectors');
    if (!selectors) continue;

    const selectorsLength = selectors.children.length - 1;
    images.scrollTo(0, 0);

    slider.addEventListener('click', (e) => {
      const activeSelector = selectors.querySelector('.selector.active');
      let current = [...selectors.children].indexOf(activeSelector);

      if (e.target.closest('.slider__next')) {
        current++;

        if (current > selectorsLength) current = 0;
      } else if (e.target.closest('.slider__prev')) {
        current--;

        if (current < 0) current = selectorsLength;
      } else if (e.target.closest('.selector')) {
        const selector = e.target.closest('.selector');
        current = [...selectors.children].indexOf(selector);
      }

      const currentSelector = selectors.children[current];

      activeSelector.classList.remove('active');
      currentSelector.classList.add('active');

      // scroll to selected slide
      const currentImage = images.getElementsByTagName('img')[current];
      currentImage.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    });
  }
}

function moveToCurrent(index) {
  const slider = document.querySelector('.modal--active .modal-slider');
  const images = slider.querySelector('.slider__images');
  const selectors = slider.querySelector('.slider__selectors');
  if (!slider || !selectors) return;

  const activeSelector = selectors.querySelector('.selector.active');
  const current = [...selectors.children].indexOf(activeSelector);

  // scroll to selected slide
  const currentImage = images.getElementsByTagName('img')[current];
  currentImage.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
}

export { moveToCurrent, sliderControls };
