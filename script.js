const menuToggle = document.getElementById("menuToggle");
const menuPanel = document.getElementById("menuPanel");
const themeToggle = document.getElementById("themeToggle");
const navCenter = document.querySelector(".nav-center");
const miniClockTime = document.getElementById("miniClockTime");
const miniWeatherPlace = document.getElementById("miniWeatherPlace");
const miniWeatherTemp = document.getElementById("miniWeatherTemp");
const pageLoader = document.getElementById("pageLoader");

const calcDisplay = document.getElementById("calcDisplay");
const calcContainer = document.querySelector(".calculator");
const toggleButtons = document.querySelectorAll(".toggle-btn");

const clockTime = document.getElementById("clockTime");
const clockDate = document.getElementById("clockDate");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const clockPanel = document.getElementById("clockPanel");

const locateBtn = document.getElementById("locateBtn");
const searchCityBtn = document.getElementById("searchCityBtn");
const cityInput = document.getElementById("cityInput");
const weatherStatus = document.getElementById("weatherStatus");
const weatherCard = document.getElementById("weatherCard");
const weatherPlace = document.getElementById("weatherPlace");
const weatherDesc = document.getElementById("weatherDesc");
const weatherTemp = document.getElementById("weatherTemp");
const weatherFeels = document.getElementById("weatherFeels");
const weatherWind = document.getElementById("weatherWind");
const weatherTime = document.getElementById("weatherTime");

const zaloBtn = document.getElementById("zaloBtn");
const zaloModal = document.getElementById("zaloModal");
const zaloClose = document.getElementById("zaloClose");
const modalBackdrop = document.querySelector(".modal-backdrop");

const heroImagePreview = document.getElementById("heroImagePreview");
const heroImageBox = document.getElementById("heroImageBox");

const weatherCodeMap = {
  0: "Trời quang",
  1: "Hầu như quang",
  2: "Ít mây",
  3: "Nhiều mây",
  45: "Sương mù",
  48: "Sương mù dày",
  51: "Mưa phùn nhẹ",
  53: "Mưa phùn",
  55: "Mưa phùn dày",
  61: "Mưa nhẹ",
  63: "Mưa vừa",
  65: "Mưa lớn",
  71: "Tuyết nhẹ",
  73: "Tuyết vừa",
  75: "Tuyết lớn",
  80: "Mưa rào nhẹ",
  81: "Mưa rào",
  82: "Mưa rào mạnh",
  95: "Dông",
  96: "Dông kèm mưa đá",
  99: "Dông mạnh"
};

let calcExpression = "";

const updateDisplay = (value) => {
  calcDisplay.textContent = value || "0";
};

const appendValue = (value) => {
  if (calcExpression === "Lỗi") {
    calcExpression = "";
  }
  calcExpression += value;
  updateDisplay(calcExpression);
};

const clearCalc = () => {
  calcExpression = "";
  updateDisplay(calcExpression);
};

const backspaceCalc = () => {
  if (calcExpression === "Lỗi") {
    clearCalc();
    return;
  }
  calcExpression = calcExpression.slice(0, -1);
  updateDisplay(calcExpression);
};

const formatExpression = (expr) => {
  let normalized = expr
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-")
    .replace(/\^/g, "**")
    .replace(/π/g, "Math.PI")
    .replace(/(?<![a-zA-Z])e(?![a-zA-Z])/g, "Math.E")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/pow\(/g, "Math.pow(");

  normalized = normalized.replace(/(\d+)%/g, "($1/100)");
  return normalized;
};

const evaluateCalc = () => {
  if (!calcExpression.trim()) return;
  try {
    const expression = formatExpression(calcExpression);
    const result = Function(`"use strict"; return (${expression})`)();
    calcExpression = Number.isFinite(result) ? result.toString() : "Lỗi";
  } catch (error) {
    calcExpression = "Lỗi";
  }
  updateDisplay(calcExpression);
};

const handleCalcButton = (event) => {
  const button = event.target.closest(".calc-btn");
  if (!button) return;

  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === "clear") {
    clearCalc();
    return;
  }

  if (action === "backspace") {
    backspaceCalc();
    return;
  }

  if (action === "equals") {
    evaluateCalc();
    return;
  }

  if (value) {
    appendValue(value);
  }
};

const handleCalcKeyboard = (event) => {
  const activeTag = document.activeElement && document.activeElement.tagName;
  if (activeTag === "INPUT" || activeTag === "TEXTAREA") {
    return;
  }
  const key = event.key;
  if (/\d/.test(key)) {
    appendValue(key);
  } else if (["+", "-", "*", "/", "(", ")", ".", "^", ","] .includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    evaluateCalc();
  } else if (key === "Backspace") {
    backspaceCalc();
  } else if (key.toLowerCase() === "c") {
    clearCalc();
  }
};

const setCalcMode = (mode) => {
  toggleButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
  calcContainer.classList.toggle("scientific", mode === "scientific");
};

const updateClock = () => {
  const now = new Date();
  const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const miniFormatter = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  clockTime.textContent = timeFormatter.format(now);
  clockDate.textContent = dateFormatter.format(now);
  if (miniClockTime) {
    miniClockTime.textContent = miniFormatter.format(now);
  }
};

const openMenu = () => {
  if (!menuPanel || !menuToggle) return;
  menuPanel.classList.add("show");
  menuToggle.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
  if (!menuPanel || !menuToggle) return;
  menuPanel.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
};

const toggleMenu = () => {
  if (!menuPanel) return;
  if (menuPanel.classList.contains("show")) {
    closeMenu();
  } else {
    openMenu();
  }
};

const closeMenuOnSelect = (event) => {
  if (event.target.tagName === "A") {
    closeMenu();
  }
};

const setTheme = (theme) => {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeToggle) {
      themeToggle.classList.add("is-light");
      themeToggle.setAttribute("aria-pressed", "true");
    }
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeToggle) {
      themeToggle.classList.remove("is-light");
      themeToggle.setAttribute("aria-pressed", "false");
    }
  }
  localStorage.setItem("theme", theme);
};

const initTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    setTheme("light");
  }
};

const weatherStatusMessage = (message) => {
  weatherStatus.textContent = message;
};

const showWeather = (data) => {
  weatherPlace.textContent = data.place;
  weatherDesc.textContent = data.description;
  weatherTemp.textContent = `${data.temp}°C`;
  weatherFeels.textContent = `Cảm giác: ${data.feels}°C`;
  weatherWind.textContent = `Gió: ${data.wind} km/h`;
  weatherTime.textContent = `Cập nhật: ${data.time}`;
  weatherCard.hidden = false;
  if (miniWeatherPlace && miniWeatherTemp) {
    miniWeatherPlace.textContent = data.place;
    miniWeatherTemp.textContent = `${data.temp}°C`;
  }
};

const fetchWeatherByCoords = async (lat, lon, label = "Vị trí hiện tại") => {
  weatherStatusMessage("Đang tải dữ liệu thời tiết...");
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Không thể lấy dữ liệu thời tiết.");
    }
    const data = await response.json();
    const current = data.current;
    const description = weatherCodeMap[current.weather_code] || "Không xác định";
    showWeather({
      place: label,
      description,
      temp: Math.round(current.temperature_2m),
      feels: Math.round(current.apparent_temperature),
      wind: Math.round(current.wind_speed_10m),
      time: current.time.replace("T", " ")
    });
    weatherStatusMessage("Đã cập nhật thời tiết.");
  } catch (error) {
    weatherStatusMessage("Không thể tải thời tiết. Hãy thử lại sau.");
  }
};

const fetchCoordsByCity = async (city) => {
  weatherStatusMessage("Đang tìm vị trí...");
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=vi&format=json`;
    const response = await fetch(geoUrl);
    if (!response.ok) {
      throw new Error("Không thể tìm vị trí.");
    }
    const data = await response.json();
    if (!data.results || !data.results.length) {
      weatherStatusMessage("Không tìm thấy thành phố phù hợp.");
      return null;
    }
    return data.results[0];
  } catch (error) {
    weatherStatusMessage("Không thể tìm vị trí. Hãy thử lại.");
    return null;
  }
};

const handleCitySearch = async () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherStatusMessage("Vui lòng nhập thành phố.");
    return;
  }
  const result = await fetchCoordsByCity(city);
  if (!result) return;
  const label = `${result.name}${result.country ? ", " + result.country : ""}`;
  fetchWeatherByCoords(result.latitude, result.longitude, label);
};

const handleLocate = () => {
  if (!navigator.geolocation) {
    weatherStatusMessage("Trình duyệt không hỗ trợ định vị.");
    return;
  }

  weatherStatusMessage("Đang lấy vị trí hiện tại...");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude, "Vị trí hiện tại");
    },
    () => {
      weatherStatusMessage("Không thể lấy vị trí. Vui lòng kiểm tra quyền truy cập.");
    }
  );
};

if (menuToggle) {
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });
}

if (navCenter) {
  navCenter.addEventListener("mouseenter", openMenu);
  navCenter.addEventListener("mouseleave", closeMenu);
}

document.addEventListener("click", (event) => {
  if (!navCenter || !navCenter.contains(event.target)) {
    closeMenu();
  }
});

if (menuPanel) {
  menuPanel.addEventListener("click", closeMenuOnSelect);
}

const openZaloModal = () => {
  if (!zaloModal) return;
  zaloModal.classList.add("show");
  zaloModal.setAttribute("aria-hidden", "false");
};

const closeZaloModal = () => {
  if (!zaloModal) return;
  zaloModal.classList.remove("show");
  zaloModal.setAttribute("aria-hidden", "true");
};

if (zaloBtn) {
  zaloBtn.addEventListener("click", openZaloModal);
}

if (zaloClose) {
  zaloClose.addEventListener("click", closeZaloModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closeZaloModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeZaloModal();
  }
});

const handleHeroImage = (file) => {
  if (!file || !heroImagePreview) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    heroImagePreview.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

if (heroImageBox) {
  heroImageBox.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  heroImageBox.addEventListener("drop", (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    handleHeroImage(file);
  });
}

calcContainer.addEventListener("click", handleCalcButton);
document.addEventListener("keydown", handleCalcKeyboard);

fullscreenBtn.addEventListener("click", () => {
  if (clockPanel.requestFullscreen) {
    clockPanel.requestFullscreen();
  }
});

locateBtn.addEventListener("click", handleLocate);
searchCityBtn.addEventListener("click", handleCitySearch);
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleCitySearch();
  }
});

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setCalcMode(btn.dataset.mode);
  });
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    setTheme(isLight ? "dark" : "light");
  });
}

const setDefaultWeather = () => {
  if (cityInput) {
    cityInput.value = "Hà Nội";
  }
  fetchWeatherByCoords(21.0285, 105.8542, "Hà Nội, Việt Nam");
};

setDefaultWeather();

const revealElements = document.querySelectorAll("section, .card");
revealElements.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

initTheme();
setCalcMode("basic");
updateClock();
setInterval(updateClock, 1000);

window.addEventListener("load", () => {
  setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add("hide");
      pageLoader.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("is-loading");
  }, 1500);
});
