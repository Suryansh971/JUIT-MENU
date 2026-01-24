const dateTimeEl = document.getElementById("dateTime");
const currentMealEl = document.getElementById("currentMeal");

const breakfastMenuEl = document.getElementById("breakfastMenu");
const lunchMenuEl = document.getElementById("lunchMenu");
const dinnerMenuEl = document.getElementById("dinnerMenu");

const dayButtons = document.querySelectorAll(".day-btn");

const menuData = {
  0: {
    breakfast: ["Samosa / Veg Cutlet", "Macaroni", "Cornflakes", "Bread", "Butter", "Jam", "Milk", "Tea"],
    lunch: ["Aaloo Tomato Sabji", "Kachori Dal / Mattar", "Curd", "Veg Biryani", "Salad", "Apple Royal"],
    dinner: ["Choley", "Chilli Nutri / Punjabi Aaloo", "Rice", "Roti - Tandoori & Plain", "Salad", "Green Chutney", "Besan Ladoo", "Hot Milk"]
  },
  1: {
    breakfast: ["Poori", "Aaloo Sabji", "Omellete", "Dalia", "Bread", "Butter", "Jam", "Tea"],
    lunch: ["Kadi Chawal", "Mix Veg", "Roti - Tandoori & Plain", "Salad", "Papad", "Kinnu"],
    dinner: ["Dal Makhani", "Aaloo Beans / Aaloo Gobhi", "Rice", "Roti - Tandoori & Plain", "Mix Corn Salad", "Tomato Soup", "Rice Kheer", "Hot Milk"]
  },
  2: {
    breakfast: ["Idli", "Sambar", "Vada", "Upma", "Coconut Chutney", "Bread", "Butter", "Jam", "Hot Coffee"],
    lunch: ["Dal Sabut Masoor", "Palak Paneer", "Boondi Raita", "Rice", "Roti - Tandoori & Plain", "Salad", "Kulfi / Ice Cream"],
    dinner: ["Dal Arhar", "Mix Veg", "Veg Pulao", "Roti - Tandoori & Plain", "Salad", "Gajar Ka Halwa", "Hot Milk"]
  },
  3: {
    breakfast: ["Kachori Dal / Mattar", "Aaloo Sabji", "Cornflakes", "Boiled Egg", "Bread", "Butter", "Jam", "Tea", "Milk", "Apple Royal"],
    lunch: ["Dal Rajmah", "Aaloo Shimla Mirch", "Plain Curd", "Rice", "Roti - Tandoori & Plain", "Mix Corn Salad"],
    dinner: ["Dal Moong Sabut", "Shahi Paneer", "Rice", "Roti - Tandoori & Plain", "Salad", "Semiya Kheer", "Hot Milk"]
  },
  4: {
    breakfast: ["Aaloo Paratha", "Plain Curd", "Pasta", "Dalia", "Bread", "Butter", "Jam", "Tea", "Banana"],
    lunch: ["Dal Kala Chana", "Aaloo Methi", "Matar with Rice", "Bathua ka Raita", "Roti - Tandoori & Plain", "Salad"],
    dinner: ["Aaloo Mattar Tomato", "Masala Bhindi", "Veg Biryani", "Roti Missi - Tandoori & Plain", "Mix Veg Soup", "Green Chutney", "Suji Halwa", "Hot Milk"]
  },
  5: {
    breakfast: ["Bread Pakoda / Bread Roll", "Veg Semiya", "Cornflakes", "Boiled Egg", "Bread", "Butter", "Jam", "Milk", "Tea"],
    lunch: ["Choley", "Bhature", "Dahi Vada with Saunth Chutney", "Veg Biryani", "Onion Salad", "Orange"],
    dinner: ["Veg Manchurian", "Noodles", "Chilli Paneer", "Fried Rice", "Hot & Sour Soup", "Salad", "Gulab Jamun", "Hot Milk"]
  },
  6: {
    breakfast: ["Gobhi Paratha", "Curd", "Maggi", "Daliya", "Bread", "Butter", "Jam", "Hot Coffee", "Apple Golden"],
    lunch: ["Dal Rajmah", "Mix Veg", "Boondi Raita", "Rice", "Roti - Tandoori & Plain", "Salad"],
    dinner: ["Dal Moong Malka", "Egg Bhurji / Curry", "Aaloo Gobhi / Baingan Bharta", "Rice", "Roti - Tandoori & Plain", "Mix Corn Salad", "Veg Soup", "Moong Dal Halwa", "Hot Milk"]
  }
};

function updateDateTime() {
  dateTimeEl.textContent = new Date().toLocaleString();
}

function getCurrentMealStatus() {
  const now = new Date();
  const time = now.getHours() + now.getMinutes()/60;

  // Meal timings based on attached menu
  if(time >= 7.5 && time <= 9.5) return "Current Meal: Breakfast 🥞";
  if(time >= 12 && time <= 14) return "Current Meal: Lunch 🍛";
  if(time >= 19.5 && time <= 21) return "Current Meal: Dinner 🍽️";
  if(time >= 21.25 && time <= 21.75) return "Current Meal: Milk 🥛";

  if(time < 7.5) return "Next Meal: Breakfast 🥞";
  if(time < 12.5) return "Next Meal: Lunch 🍛";
  if(time < 19.5) return "Next Meal: Dinner 🍽️";

  return "Next Meal: Breakfast 🥞";
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
  const today = new Date().getDay();
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
