const projectsCategories = document.querySelector('.projects__categories');
const documentBody = document.body;

// projects categories
projectsCategories.addEventListener('click', (e) => {
  try {
    const elm = e.target;
    const categoryCard = elm.closest('.category__card');
    const modalClose = categoryCard.querySelector('.modal__header button i');

    const modalToggles = [
      // modal - open
      elm.classList.contains('card__caption'),
      elm.parentElement.classList.contains('card__image'),
      // modal - close
      elm.classList.contains('card__modal'),
      elm === modalClose,
    ];

    // toggle modal
    if (modalToggles.includes(true)) {
      categoryCard.classList.toggle('modal--active');
      documentBody.classList.toggle('no-scroll');
    }
  } catch (err) {
    return;
  }
});
