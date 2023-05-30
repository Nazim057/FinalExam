let id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:5700/users";
const BASE_URL2 = "http://localhost:5700/favdata";

let title = document.querySelector("#title");
let description = document.querySelector("#description");
let photo = document.querySelector("#photo");
let form = document.querySelector("form");
let button = document.querySelector("#form-btn");
let favData = [];

if (id) {
  async function getData() {
    try {
      const res = await axios(`${BASE_URL}/${id}`);
      const data = await res.data;
      favData = data;
      title.value = data.title;
      description.value = `${data.description.slice(0, 30)}...`;
    } catch (error) {
      console.error("Failed to retrieve data:", error);
    }
  }

  description.addEventListener("focus", () => {
    description.value = favData.description;
  });

  button.innerHTML = "Edit Card";
  getData();
}

async function updateCard(obj) {
  try {
    await axios.patch(`${BASE_URL}/${id}`, obj);
    await axios.patch(`${BASE_URL2}/${id}`, obj);
  } catch (error) {
    console.error("An error occurred while updating the card:", error);
  }
}

async function createCard(obj) {
  try {
    await axios.post(BASE_URL, obj);
  } catch (error) {
    console.error("An error occurred while creating the card:", error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let obj = {
    title: title.value,
    description:
      description.value != `${favData.description.slice(0, 30)}...`
        ? description.value
        : favData.description,
    photo: photo.value
      ? `./assets/img/${photo.value.split("\\")[2]}`
      : "./assets/img/o2.png",
  };

  if (id) {
    await updateCard(obj);
  } else {
    await createCard(obj);
  }

  window.location = "index.html";
});


function toggleButton() {
  if (title.value.trim() && description.value.trim() && photo.value) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

title.addEventListener("input", toggleButton);
description.addEventListener("input", toggleButton);
photo.addEventListener("input", toggleButton);

let menuBtn = document.querySelector(".menu-btn");
let burgerModal = document.querySelector(".burger-modal");

menuBtn.addEventListener("click", toggleBurgerModal);

function toggleBurgerModal() {
  burgerModal.style.display =
    burgerModal.style.display == "flex" ? "none" : "flex";
}
