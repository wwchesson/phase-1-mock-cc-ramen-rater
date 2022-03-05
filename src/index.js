// write your code here
let ramenArray;
let ramenDetails = document.querySelector("#ramen-detail");
let featuredName = document.querySelector(".name");
let featuredRestaurant = document.querySelector(".restaurant");
let ratingOnPage = document.querySelector("span");
let commentOnPage = document.getElementById("comment-display");
const commentForm = document.getElementById("new-ramen");

document.addEventListener("DOMContentLoaded", () => {
  const ramenMenu = document.querySelector("#ramen-menu");

  getYummyRamens(); //have to invoke for the fn below to run
});

function getYummyRamens() {
  fetch("http://localhost:3000/ramens")
    .then((r) => r.json())
    .then((data) => {
      ramenArray = data;
      renderRamenImages(ramenArray);
    });
}

function renderRamenImages(ramenArray) {
  ramenMenu.innerHTML = ramenArray.map(renderEachImage).join("");
}

function renderEachImage(ramen) {
  return `
  <img id=${ramen.id} class="ramen-image" src="${ramen.image}" img>
  `;
}

document.addEventListener("click", (e) => {
  if (e.target.className === "ramen-image") {
    const foundRamen = ramenArray.find(
      (ramen) => ramen.id === parseInt(e.target.id)
    );
    renderRamenDetails(foundRamen);
  }
});

function renderRamenDetails(foundRamen) {
  ramenDetails.innerHTML = `
  <img class="detail-image" src="${foundRamen.image}" alt="Yummy in my tummy">
  <h2 class="name">${foundRamen.name}</h2>
  <h3 class="restaurant">${foundRamen.restaurant}</h3>
  `;
  ratingOnPage.innerText = foundRamen.rating;
  commentOnPage.innerText = foundRamen.comment;
}

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formName = e.target.querySelector("#new-name").value;
  let formRestaurant = e.target.querySelector("#new-restaurant").value;
  let formImage = e.target.querySelector("#new-image").value;
  console.log(e.target.querySelector("#new-image").value);
  let formRating = e.target.querySelector("#new-rating").value;
  let formComment = e.target.querySelector("#new-comment").value;

  postRamens(formName, formRestaurant, formImage, formRating, formComment);

  commentForm.reset();
});

function postRamens(
  formName,
  formRestaurant,
  formImage,
  formRating,
  formComment
) {
  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formName,
      restaurant: formRestaurant,
      image: formImage,
      rating: formRating,
      comment: formComment,
    }),
  })
    .then((r) => r.json())
    .then((newRamen) => renderRamenToPage(newRamen));
}
