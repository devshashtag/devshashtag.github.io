const projectsCategories = document.querySelector(".projects__categories");
const cardCategories = document.querySelector(".category__cards");

function categoryTemplate(name, teamwork) {
  return `
    <!-- category -->
    <div class="category__name">${name}<span class="sep">-</span>${teamwork ? "team work" : "solo"}</div>
  `;
}

function imagesTemplate(projectName, homeUrl, imageUrls) {
  let imagesHtml = "";

  for (const imageUrl of imageUrls) {
    imagesHtml += `
      <a href="${homeUrl}" title="نمایش دمو" target="_blank">
        <img src="${imageUrl}" alt="${projectName} alt" />
      </a>
    `;
  }

  return imagesHtml;
}

function linksTemplate(projectName, pages, root) {
  let urlsHtml = "<ul>";

  for (const page of pages) {
    urlsHtml += `
      <li><a href="${(root ? root : "") + page.url}" target="_blank">${projectName} - ${page.name}</a></li>
    `;
  }

  return urlsHtml + "</ul>";
}

function cardTemplate(project) {
  return `
    <!-- card -->
    <div class="category__card">
      <div class="card__name">${project.name}</div>
      <div class="card__image">
        <img src="${project.images[0]}" alt="${project.name} alt" />
      </div>
      <div class="card__modal">
        <div class="modal__box">
          <div class="modal__header">
            <div class="modal__name">${project.name}</div>
            <button class="modal__close" title="بستن پنجره">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div class="modal__image">
              ${imagesTemplate(project.name, project.url, project.images)}
          </div>
          <div class="modal__content">
            <h3>about</h3>
            <p>${project.description}</p>

            <h3>live demo pages</h3>
            ${linksTemplate(project.name, project.pages, project.url)}

            <h3>source code</h3>
            ${linksTemplate(project.name, project.sources)}
          </div>
        </div>
      </div>
    </div>
  `;
}

function setModalEvent() {
  projectsCategories.addEventListener("click", (e) => {
    try {
      const elm = e.target;
      const categoryCard = elm.closest(".category__card");
      const modalClose = categoryCard.querySelector(".modal__header button i");

      const modalToggles = [
        // modal - open
        elm.classList.contains("card__caption"),
        elm.parentElement.classList.contains("card__image"),
        // modal - close
        elm.classList.contains("card__modal"),
        elm === modalClose,
      ];

      // toggle modal
      if (modalToggles.includes(true)) {
        if (categoryCard.classList.contains("modal--active")) {
          categoryCard.classList.toggle("modal--active");
          document.body.classList.toggle("no-scroll");
        } else {
          document.body.classList.toggle("no-scroll");
          categoryCard.classList.toggle("modal--active");
        }
      }
    } catch (err) {
      return;
    }
  });
}

const projectCardsAPI = "/assets/js/data/projects.json";

fetch(projectCardsAPI)
  .then((response) => response.json())
  .then((projectCards) => {
    for (const card of projectCards) {
      const category = card["category"];
      const projects = card["projects"];

      let teamwork = [];
      let solo = [];

      for (const project of projects) {
        if (project.teamwork) {
          teamwork.push(cardTemplate(project));
        } else {
          solo.push(cardTemplate(project));
        }
      }

      // category teamwork
      const categoryTeamWorkHTML = categoryTemplate(category, true);
      const teamworkCardsHTML = teamwork.reduce((html, current) => html + current, "");
      cardCategories.insertAdjacentHTML("beforeend", categoryTeamWorkHTML + teamworkCardsHTML);

      // category solo
      const categorySoloHTML = categoryTemplate(category, false);
      const soloCardsHTML = solo.reduce((html, current) => html + current, "");
      cardCategories.insertAdjacentHTML("beforeend", categorySoloHTML + soloCardsHTML);
    }
  });

// set modal event
setModalEvent();
