const BASE_URL2 = "http://localhost:5700/favdata";

let row = document.querySelector(".row");

async function getFavData() {
  row.innerHTML = "";
  const res = await axios(BASE_URL2);
  const data = await res.data;
  data.forEach((element) => {
    row.innerHTML += `
    <span class="col col-12 col-lg-3 fashion-card-div">
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
      <p><i class="fa-regular fa-heart"></i> 5 Likes</p>
      <p><i class="fa-regular fa-comment"></i> 20 Comments</p>
    </div>
    <div class="buttons">
    <button class="btn btn-danger" onclick=removeData(${element.id},this)>Remove</button>
  </div>
  </div>
  </span> 
    `;
  });
}

getFavData();

async function removeData(id) {
  await axios.delete(`${BASE_URL2}/${id}`);
  getFavData();
}

let menuBtn = document.querySelector(".menu-btn");
let burgerModal = document.querySelector(".burger-modal");

menuBtn.addEventListener("click", toggleBurgerModal);

function toggleBurgerModal() {
  burgerModal.style.display =
    burgerModal.style.display == "flex" ? "none" : "flex";
}
