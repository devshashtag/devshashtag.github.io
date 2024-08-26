function sliderControls() {
  const sliders = document.querySelectorAll('.modal-slider');

  // controls event
  for (const slider of sliders) {
    const images = slider.querySelector('.slider__images');
    const selectors = slider.querySelector('.slider__selectors');

    // skip if there is no selectors, dont show controls
    if (!selectors) continue;

    const selectorsLength = selectors.children.length - 1;
    images.scrollTo(0, 0);

    slider.addEventListener('click', (e) => {
      const activeSelector = selectors.querySelector('.selector.active');
      let index = [...selectors.children].indexOf(activeSelector);

      if (e.target.closest('.slider__next')) {
        if (++index > selectorsLength) index = 0;
      } else if (e.target.closest('.slider__prev')) {
        if (--index < 0) index = selectorsLength;
      } else if (e.target.closest('.selector')) {
        const selector = e.target.closest('.selector');
        index = [...selectors.children].indexOf(selector);
      }

      const currentSelector = selectors.children[index];
      activeSelector.classList.remove('active');
      currentSelector.classList.add('active');

      // scroll to selected slide
      const currentImage = images.querySelectorAll('.slider__image')[index];
      currentImage.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    });
  }
}

export { sliderControls };
