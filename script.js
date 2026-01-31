const dateTimeEl = document.getElementById("dateTime");
const currentMealEl = document.getElementById("currentMeal");

const breakfastMenuEl = document.getElementById("breakfastMenu");
const lunchMenuEl = document.getElementById("lunchMenu");
const dinnerMenuEl = document.getElementById("dinnerMenu");

const dayButtons = document.querySelectorAll(".day-btn");

const menuData = {
  0: {
    breakfast: ["Burger", "Maggi", "Cornflakes", "Bread", "Butter", "Jam", "Milk", "Tea"],
    lunch: ["Kachori Dal / Mattar", "Paneer Onion Parantha", "Aaloo Tomato Sabji", "Curd", "Veg Biryani", "Salad", "Orange / Kinnu"],
    dinner: ["Dal Moong Malka", "Mix Veg", "Egg Curry", "Rice", "Roti - Tandoori & Plain", "Salad", "Suji Halwa", "Hot Milk"]
  },
  1: {
    breakfast: ["Veg Cutlet", "Pasta", "Dalia", "Omelette", "Bread", "Butter", "Jam", "Ginger Tea", "Apple Royal"],
    lunch: ["Kadhi Chawal", "Aaloo Methi", "Roti - Tandoori & Plain", "Salad", "Papad"],
    dinner: ["Dal Makhani", "Mix Veg", "Rice", "Roti - Tandoori & Plain", "Mix Corn Salad", "Green Chutney", "Gulab Jamun", "Hot Milk"]
  },
  2: {
    breakfast: ["Idli", "Sambar", "Vada", "Upma", "Coconut Chutney", "Bread", "Butter", "Jam", "Hot Coffee"],
    lunch: ["Dal Moong Malka", "Soya Chaap", "Boondi Raita", "Rice", "Roti - Tandoori & Plain", "Salad", "Ice Cream"],
    dinner: ["Dal Arhar", "Aaloo Gobhi", "Veg Biryani", "Roti - Tandoori & Plain", "Salad", "Moong Dal Halwa", "Hot Milk"]
  },
  3: {
    breakfast: ["Poori", "Aaloo Sabji", "Poha", "Cornflakes", "Boiled Egg", "Bread", "Butter", "Jam", "Milk", "Tea", "Banana"],
    lunch: ["Dal Rajmah", "Aaloo Beans", "Veg Raita", "Rice", "Roti - Tandoori & Plain", "Mix Corn Salad"],
    dinner: ["Dal Moong Sabut", "Shahi Paneer", "Rice", "Roti - Tandoori & Plain", "Salad", "Semiya Kheer", "Hot Milk"]
  },
  4: {
    breakfast: ["Aaloo Parantha", "Curd", "Dalia", "Bread", "Butter", "Jam", "Ginger Tea"],
    lunch: ["Choley Bhature", "Dahi Vada with Saunth Chutney", "Veg Biryani", "Pickle", "Onion Salad", "Kinnu"],
    dinner: ["Dal Panchranga / Maharani", "Baingan Bharta / Baingan Masala", "Mattar Pulao", "Roti Missi - Tandoori & Plain", "Mix Corn Salad", "Mix Veg Soup", "Gajar Halwa", "Hot Milk"]
  },
  5: {
    breakfast: ["Bread Pakora / Bread Roll", "Veg Semiya", "Cornflakes", "Boiled Egg", "Bread", "Butter", "Jam", "Milk", "Tea"],
    lunch: ["Aaloo Palak Bhujia", "Dal Urad Chana", "Bathua Raita", "Rice", "Roti - Tandoori & Plain", "Papad", "Salad", "Apple Golden"],
    dinner: ["Dal Masoor Sabut", "Kadai Paneer", "Rice", "Roti - Tandoori & Plain", "Salad", "Rice Kheer", "Hot Milk"]
  },
  6: {
    breakfast: ["Gobhi Parantha", "Macaroni", "Daliya", "Curd", "Pickle", "Bread", "Butter", "Jam", "Hot Coffee", "Banana"],
    lunch: ["Dal Rajmah", "Aaloo Shimla Mirch", "Boondi Raita", "Rice", "Roti - Tandoori & Plain", "Salad"],
    dinner: ["Dal Tadka", "Masala Bhindi / Chilli Nutri", "Rice", "Roti - Tandoori & Plain", "Salad", "Fruit Custard", "Hot Milk"]
  }
};


function updateDateTime() {
  dateTimeEl.textContent = new Date().toLocaleString();
}

function getCurrentMealStatus() {
  const now = new Date();
  const time = now.getHours() + now.getMinutes() / 60;

  if (time >= 7.5 && time <= 9.5) return "Current Meal: Breakfast 🥞";
  if (time >= 12 && time <= 14) return "Current Meal: Lunch 🍛";
  if (time >= 19.5 && time <= 21) return "Current Meal: Dinner 🍽️";

  if (time > 21) return "Tomorrow’s Menu";

  if (time < 7.5) return "Next Meal: Breakfast 🥞";
  if (time < 12.5) return "Next Meal: Lunch 🍛";
  if (time < 19.5) return "Next Meal: Dinner 🍽️";

  return "";
}

function getMenuDay() {
  const now = new Date();
  let day = now.getDay();
  const time = now.getHours() + now.getMinutes() / 60;

  if (time >= 21) {
    day = (day + 1) % 7;
  }

  return day;
}

function loadMenu(day){
  breakfastMenuEl.innerHTML = "";
  lunchMenuEl.innerHTML = "";
  dinnerMenuEl.innerHTML = "";

  menuData[day].breakfast.forEach(i => breakfastMenuEl.innerHTML += `<li>${i}</li>`);
  menuData[day].lunch.forEach(i => lunchMenuEl.innerHTML += `<li>${i}</li>`);
  menuData[day].dinner.forEach(i => dinnerMenuEl.innerHTML += `<li>${i}</li>`);
}

dayButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    dayButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadMenu(btn.dataset.day);
  });
});

function init(){
  const today = getMenuDay();
  document.querySelector(`[data-day="${today}"]`).classList.add("active");
  loadMenu(today);
  updateDateTime();
  currentMealEl.textContent = getCurrentMealStatus();
}

setInterval(() => {
  updateDateTime();
  currentMealEl.textContent = getCurrentMealStatus();
}, 1000);

init();

