let id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:5700/users";
let row = document.querySelector(".row");

async function getAllData() {
  try {
    row.innerHTML = "";
    const res = await axios(`${BASE_URL}/${id}`);
    const element = await res.data;
    row.innerHTML = `
    <div class="col col-4"></div>
    <span class="col col-3 fashion-card-div">
    <div class="fashion-card">
    <div class="fashion-img">
      <img src="${element.photo}" alt="course-img" />
    </div>
    <h5>10 Jan 2018</h5>
    <h4>${element.title}</h4>
    <p>
    ${element.description}
    </p>
    <div class="fashion-icon-div">
      <p><i class="fa-regular fa-heart"></i> 10 Likes</p>
      <p><i class="fa-regular fa-comment"></i> 20 Comments</p>
    </div>
  </div>
    </span> 
    <div class="col col-4"></div>
          `;
  } catch (error) {
    console.error(error);
  }
}

getAllData();

let menuBtn = document.querySelector(".menu-btn");
let burgerModal = document.querySelector(".burger-modal");

menuBtn.addEventListener("click", toggleBurgerModal);

function toggleBurgerModal() {
  burgerModal.style.display =
    burgerModal.style.display == "flex" ? "none" : "flex";
}