const BASE_URL = "http://localhost:5700/users";
const BASE_URL2 = "http://localhost:5700/favdata";

const row = document.querySelector(".fashion-data");
const search = document.querySelector(".search-input");
const sort = document.querySelector(".sort-btn");
const load = document.querySelector(".load-btn");

let bool = true;
let bool2 = true;

let allData = [];
let filtered = [];
let defaultArr = [];
let favData;

let num = 4;

async function getAllData() {
  row.innerHTML = "";
  try {
    const res = await axios(BASE_URL);
    const data = res.data;
    allData = data;
    filtered = getFilteredData();
    filtered.forEach((element) => {
      const card = createCardElement(element);
      row.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to retrieve data:", error);
  }
}

getAllData();

function getFilteredData() {
  if (filtered.length || search.value) {
    return filtered.slice(0, num);
  } else {
    return allData.slice(0, num);
  }
}

function createCardElement(element) {
  const card = document.createElement("span");
  card.classList.add("col-12", "col-lg-3", "fashion-card-div", "mb-5");
  const innerHTML = `
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
  <div class="fashion-btn-div">
    <div class="fashion-btn-top">
      <a href="add.html?id=${element.id}" class="btn btn-success">Edit</a>
      <a href="details.html?id=${element.id}" class="btn btn-warning">Details</a>
    </div>
    <div class="fashion-btn-bottom">
      <button class="btn btn-danger" onclick="deleteCard(${element.id}, this)">Delete</button>
      <button class="btn btn-info" onclick="addFav(${element.id})">Add Fav</button>
    </div>
  </div>
</div>
  `;
  card.innerHTML = innerHTML;
  return card;
}

async function deleteCard(id, btn) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    await axios.delete(`${BASE_URL2}/${id}`);
    btn.closest(".col").remove();
  } catch (error) {
    console.error("An error occurred while deleting the card:", error);
  }
}

async function addFav(id) {
  favData = allData.find((item) => item.id == id);
  try {
    const res2 = await axios(BASE_URL2);
    const data2 = res2.data;
    const check = data2.find((item) => item.id == id);
    if (!check) {
      await axios.post(BASE_URL2, favData);
    } else {
      alert("This user is now in favorites!");
    }
  } catch (error) {
    console.error("An error occurred while adding a favourite:", error);
  }
}

sort.addEventListener("click", () => {
  try {
    if (sort.innerHTML == "Ascending") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      sort.innerHTML = "Descending";
    } else if (sort.innerHTML == "Descending") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      sort.innerHTML = "Default";
    } else {
      sort.innerHTML = "Ascending";
      filtered = defaultArr;
    }
    getAllData();
  } catch (error) {
    console.error("An error occurred while sorting:", error);
  }
});

async function handleSearch() {
  try {
    filtered = allData.slice(0, num).filter((item) => {
      return item.title.toLowerCase().includes(search.value.toLowerCase());
    });
    defaultArr = filtered;
    await getAllData();
  } catch (error) {
    console.error("An error occurred while searching:", error);
  }
}

search.addEventListener("input", (e) => {
  e.preventDefault();
  handleSearch();
});

load.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    bool = allData.length <= num ? false : num <= 4 ? true : bool;
    num += bool ? 4 : -4;
    bool2 = num <= 4 ? true : allData.length <= num ? false : bool2;
    load.innerHTML = bool2 ? "Load More" : "Load Less";

    handleSearch();
    defaultArr = allData.slice(0, num).filter((item) => {
      return item.title.toLowerCase().includes(search.value.toLowerCase());
    });
    if (sort.innerHTML == "Ascending") {
      filtered = defaultArr;
      // console.log(defaultArr);
    } else if (sort.innerHTML == "Descending") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
  } catch (error) {
    console.error("An error occurred while loading data:", error);
  }
});

let menuBtn = document.querySelector(".menu-btn");
let burgerModal = document.querySelector(".burger-modal");

menuBtn.addEventListener("click", toggleBurgerModal);

function toggleBurgerModal() {
  burgerModal.style.display =
    burgerModal.style.display == "flex" ? "none" : "flex";
}

