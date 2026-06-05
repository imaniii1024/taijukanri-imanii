const STORAGE_KEY = "weight-log.entries";
const GOAL_KEY = "weight-log.goal";
const HEIGHT_KEY = "weight-log.height";

const form = document.querySelector("#entryForm");
const dateInput = document.querySelector("#dateInput");
const weightInput = document.querySelector("#weightInput");
const memoInput = document.querySelector("#memoInput");
const todayButton = document.querySelector("#todayButton");
const goalInput = document.querySelector("#goalInput");
const heightInput = document.querySelector("#heightInput");
const saveGoalButton = document.querySelector("#saveGoalButton");
const exportButton = document.querySelector("#exportButton");
const historyList = document.querySelector("#historyList");
const template = document.querySelector("#historyItemTemplate");
const chart = document.querySelector("#weightChart");
const chartEmpty = document.querySelector("#chartEmpty");
const rangeButtons = document.querySelectorAll("[data-range]");

const labels = {
  currentWeight: document.querySelector("#currentWeight"),
  currentDate: document.querySelector("#currentDate"),
  totalChange: document.querySelector("#totalChange"),
  currentBmi: document.querySelector("#currentBmi"),
  bmiHint: document.querySelector("#bmiHint"),
  goalDiff: document.querySelector("#goalDiff"),
  goalHint: document.querySelector("#goalHint"),
  goalLabel: document.querySelector("#goalLabel"),
  entryCount: document.querySelector("#entryCount"),
};

let entries = loadEntries();
let goal = loadGoal();
let heightCm = loadHeight();
let activeRange = "30";

dateInput.value = toDateInputValue(new Date());
goalInput.value = goal ? String(goal) : "";
heightInput.value = heightCm ? String(heightCm) : "";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const date = dateInput.value;
  const weight = Number(weightInput.value);
  const memo = memoInput.value.trim();

  if (!date || Number.isNaN(weight)) return;

  const existingIndex = entries.findIndex((entry) => entry.date === date);
  const nextEntry = { date, weight: roundWeight(weight), memo };

  if (existingIndex >= 0) {
    entries[existingIndex] = nextEntry;
  } else {
    entries.push(nextEntry);
  }

  entries = sortEntries(entries);
  saveEntries();
  form.reset();
  dateInput.value = toDateInputValue(new Date());
  render();
});

todayButton.addEventListener("click", () => {
  dateInput.value = toDateInputValue(new Date());
});

saveGoalButton.addEventListener("click", () => {
  const nextGoal = Number(goalInput.value);
  const nextHeight = Number(heightInput.value);
  goal = Number.isNaN(nextGoal) || !goalInput.value ? null : roundWeight(nextGoal);
  heightCm = Number.isNaN(nextHeight) || !heightInput.value ? null : roundWeight(nextHeight);
  localStorage.setItem(GOAL_KEY, goal === null ? "" : String(goal));
  localStorage.setItem(HEIGHT_KEY, heightCm === null ? "" : String(heightCm));
  render();
});

exportButton.addEventListener("click", () => {
  if (!entries.length) return;
  const header = ["date", "weight", "bmi", "memo"];
  const rows = entries.map((entry) => [entry.date, entry.weight, formatBmi(entry.weight), entry.memo]);
  const csv = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `weight-log-${toDateInputValue(new Date())}.csv`;
  link.click();
  URL.revokeObjectURL(url);
});

rangeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeRange = button.dataset.range;
    rangeButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderChart();
  });
});

historyList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-date]");
  if (!button) return;
  entries = entries.filter((entry) => entry.date !== button.dataset.date);
  saveEntries();
  render();
});

window.addEventListener("resize", renderChart);

seedDemoData();
render();

function loadEntries() {
  try {
    return sortEntries(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
  } catch {
    return [];
  }
}

function loadGoal() {
  const stored = Number(localStorage.getItem(GOAL_KEY));
  return Number.isNaN(stored) || stored === 0 ? null : stored;
}

function loadHeight() {
  const stored = Number(localStorage.getItem(HEIGHT_KEY));
  return Number.isNaN(stored) || stored === 0 ? null : stored;
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function sortEntries(items) {
  return [...items].sort((a, b) => a.date.localeCompare(b.date));
}

function render() {
  renderSummary();
  renderHistory();
  renderChart();
}

function renderSummary() {
  const latest = entries.at(-1);
  const first = entries.at(0);

  labels.entryCount.textContent = `${entries.length}件`;
  labels.goalLabel.textContent = goal ? `${goal.toFixed(1)} kg` : "-- kg";

  if (!latest) {
    labels.currentWeight.textContent = "--";
    labels.currentDate.textContent = "未記録";
    labels.totalChange.textContent = "--";
    labels.currentBmi.textContent = "--";
    labels.bmiHint.textContent = heightCm ? `${heightCm.toFixed(1)} cmで計算` : "身長を設定";
    labels.goalDiff.textContent = "--";
    labels.goalHint.textContent = "目標体重を設定";
    return;
  }

  labels.currentWeight.textContent = `${latest.weight.toFixed(1)} kg`;
  labels.currentDate.textContent = formatDate(latest.date);
  labels.totalChange.textContent = formatDiff(latest.weight - first.weight);
  labels.currentBmi.textContent = formatBmi(latest.weight);
  labels.bmiHint.textContent = heightCm ? `${heightCm.toFixed(1)} cmで計算` : "身長を設定";

  if (goal) {
    const diff = latest.weight - goal;
    labels.goalDiff.textContent = formatDiff(diff);
    labels.goalHint.textContent = diff > 0 ? "あと少しずつ減らす" : "目標を達成中";
  } else {
    labels.goalDiff.textContent = "--";
    labels.goalHint.textContent = "目標体重を設定";
  }
}

function renderHistory() {
  historyList.textContent = "";

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-history";
    empty.textContent = "まだ記録がありません";
    historyList.append(empty);
    return;
  }

  [...entries].reverse().forEach((entry) => {
    const item = template.content.cloneNode(true);
    const bmi = formatBmi(entry.weight);
    item.querySelector("time").textContent = formatDate(entry.date);
    item.querySelector("strong").textContent = `${entry.weight.toFixed(1)} kg / BMI ${bmi}`;
    item.querySelector("p").textContent = entry.memo || "メモなし";
    item.querySelector("button").dataset.date = entry.date;
    historyList.append(item);
  });
}

function renderChart() {
  const ctx = chart.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = chart.getBoundingClientRect();
  chart.width = Math.max(320, Math.floor(rect.width * ratio));
  chart.height = Math.floor(rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const data = filteredEntries();
  chartEmpty.hidden = data.length >= 2;
  if (data.length < 2) return;

  const padding = { top: 24, right: 48, bottom: 44, left: 48 };
  const width = rect.width - padding.left - padding.right;
  const height = rect.height - padding.top - padding.bottom;
  const weights = data.map((entry) => entry.weight);
  const min = Math.floor(Math.min(...weights, goal || weights[0]) - 1);
  const max = Math.ceil(Math.max(...weights, goal || weights[0]) + 1);
  const bmis = heightCm ? data.map((entry) => calculateBmi(entry.weight)) : [];
  const bmiMin = bmis.length ? Math.floor(Math.min(...bmis) - 0.5) : 0;
  const bmiMax = bmis.length ? Math.ceil(Math.max(...bmis) + 0.5) : 1;

  drawGrid(ctx, padding, width, height, min, max);
  if (goal) drawGoalLine(ctx, padding, width, height, min, max);
  drawLine(ctx, data, padding, width, height, min, max, "weight");
  if (bmis.length) {
    drawBmiGridLabels(ctx, padding, width, height, bmiMin, bmiMax);
    drawLine(ctx, data, padding, width, height, bmiMin, bmiMax, "bmi");
  }
  drawAxisLabels(ctx, data, padding, width, height);
}

function filteredEntries() {
  if (activeRange === "all") return entries;
  const days = Number(activeRange);
  const latest = entries.at(-1);
  if (!latest) return [];
  const start = new Date(latest.date);
  start.setDate(start.getDate() - days);
  return entries.filter((entry) => new Date(entry.date) >= start);
}

function drawGrid(ctx, padding, width, height, min, max) {
  ctx.strokeStyle = "#dfe4dc";
  ctx.fillStyle = "#687064";
  ctx.lineWidth = 1;
  ctx.font = "12px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";

  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (height / 4) * i;
    const value = max - ((max - min) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + width, y);
    ctx.stroke();
    ctx.fillText(`${value.toFixed(1)}`, 8, y + 4);
  }
}

function drawGoalLine(ctx, padding, width, height, min, max) {
  const y = yScale(goal, padding, height, min, max);
  ctx.strokeStyle = "#b76e2b";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(padding.left, y);
  ctx.lineTo(padding.left + width, y);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawBmiGridLabels(ctx, padding, width, height, min, max) {
  ctx.fillStyle = "#315f86";
  ctx.font = "12px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";

  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (height / 4) * i;
    const value = max - ((max - min) / 4) * i;
    const label = value.toFixed(1);
    ctx.fillText(label, padding.left + width + 6, y + 4);
  }
}

function drawLine(ctx, data, padding, width, height, min, max, type) {
  const isBmi = type === "bmi";
  ctx.strokeStyle = isBmi ? "#315f86" : "#2f7d57";
  ctx.fillStyle = isBmi ? "#315f86" : "#2f7d57";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  data.forEach((entry, index) => {
    const value = isBmi ? calculateBmi(entry.weight) : entry.weight;
    const x = xScale(index, data.length, padding, width);
    const y = yScale(value, padding, height, min, max);
    if (index === 0) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  data.forEach((entry, index) => {
    const value = isBmi ? calculateBmi(entry.weight) : entry.weight;
    const x = xScale(index, data.length, padding, width);
    const y = yScale(value, padding, height, min, max);
    ctx.beginPath();
    ctx.arc(x, y, isBmi ? 3 : 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawAxisLabels(ctx, data, padding, width, height) {
  ctx.fillStyle = "#687064";
  ctx.font = "12px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  const first = data[0];
  const last = data.at(-1);
  ctx.fillText(shortDate(first.date), padding.left, padding.top + height + 28);
  const lastLabel = shortDate(last.date);
  ctx.fillText(lastLabel, padding.left + width - ctx.measureText(lastLabel).width, padding.top + height + 28);
}

function xScale(index, length, padding, width) {
  return padding.left + (width / Math.max(1, length - 1)) * index;
}

function yScale(value, padding, height, min, max) {
  return padding.top + height - ((value - min) / (max - min || 1)) * height;
}

function roundWeight(value) {
  return Math.round(value * 10) / 10;
}

function calculateBmi(weight) {
  if (!heightCm) return null;
  const meters = heightCm / 100;
  return weight / (meters * meters);
}

function formatBmi(weight) {
  const bmi = calculateBmi(weight);
  return bmi ? bmi.toFixed(1) : "--";
}

function formatDiff(value) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)} kg`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", { month: "long", day: "numeric", weekday: "short" }).format(new Date(value));
}

function shortDate(value) {
  return new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric" }).format(new Date(value));
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function seedDemoData() {
  if (entries.length) return;
  const today = new Date();
  entries = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (11 - index) * 3);
    const drift = Math.sin(index / 1.8) * 0.4 - index * 0.08;
    return {
      date: toDateInputValue(date),
      weight: roundWeight(68.6 + drift),
      memo: index % 4 === 0 ? "ウォーキング" : "",
    };
  });
  goal = goal || 64;
  heightCm = heightCm || 170;
  saveEntries();
  localStorage.setItem(GOAL_KEY, String(goal));
  localStorage.setItem(HEIGHT_KEY, String(heightCm));
}
