const projectsCategories = document.querySelector('.projects__categories');
const documentBody = document.body;

// projects categories
projectsCategories.addEventListener('click', (e) => {
  try {
    const elm = e.target;
    const categoryCard = elm.closest('.category__card');
    const cardModal = categoryCard.querySelector('.card__modal');
    const modalClose = cardModal.querySelector('.modal__close button i');

    const modalToggles = [
      elm.classList.contains('card__caption'),
      elm.parentElement.classList.contains('card__image'),
      elm === cardModal,
      elm === modalClose
    ];

    // toggle modal
    if (modalToggles.includes(true)) {
      categoryCard.classList.toggle('modal--active');
      documentBody.classList.toggle('no-scroll');
    }

  } catch (err) { return; }
});
