const roadmap = [
  ["1","Excel foundations","Formulas, references, formatting, sorting, filtering"],
  ["2","Excel power tools","XLOOKUP/VLOOKUP, IF, SUMIF, COUNTIF, dates"],
  ["3","Excel analysis","Pivot tables, charts, dashboards"],
  ["4","Mini project","Build a real Excel dashboard from messy data"],
  ["5","SQL foundations","SELECT, WHERE, ORDER BY, GROUP BY"],
  ["6","SQL analysis","JOINs, subqueries, CASE, aggregates"],
  ["7","Statistics","Descriptive stats, probability, distributions"],
  ["8","Python for data","Python basics, pandas, NumPy"],
  ["9","Visualization","Matplotlib/visual storytelling"],
  ["10","Portfolio","Combine Excel + SQL + Python into a case study"],
  ["11","Machine learning","Regression, classification, evaluation"],
  ["12","AI direction","ML project + AI tools + career positioning"]
];

const missions = [
  "Spend 30 minutes learning one Excel function, then solve 5 examples without copying.",
  "Create a small dataset of 20 records and practice sorting, filtering and conditional formatting.",
  "Use XLOOKUP or VLOOKUP to connect two small tables.",
  "Build a one-page Excel dashboard with at least 2 charts.",
  "Write 10 SQL SELECT queries using a sample student dataset.",
  "Practice GROUP BY and aggregate functions with 10 questions.",
  "Explain mean, median, variance and standard deviation in your own words.",
  "Analyze a CSV-style dataset and write 5 insights from it.",
  "Build one chart and explain what decision it should help someone make.",
  "Write a portfolio case study: problem → data → method → insight → recommendation."
];

let state = JSON.parse(localStorage.getItem("levelUpState") || '{"xp":0,"done":0,"road":[],"targets":{}}');

function save(){ localStorage.setItem("levelUpState", JSON.stringify(state)); render(); }

function render(){
  document.getElementById("xp").textContent = state.xp;
  document.getElementById("done").textContent = state.done;
  const pct = Math.min(100, state.done / 20 * 100);
  document.getElementById("bar").style.width = pct + "%";
  document.getElementById("levelBadge").textContent = "LEVEL " + (Math.floor(state.xp / 100) + 1);

  document.getElementById("roadmap").innerHTML = roadmap.map((r,i)=>`
    <div class="road">
      <div class="week">W${r[0]}</div>
      <div><b>${r[1]}</b><br><small>${r[2]}</small></div>
      <input type="checkbox" ${state.road.includes(i)?"checked":""} onchange="toggleRoad(${i}, this.checked)">
    </div>`).join("");

  document.getElementById("mission").innerHTML = `<p>${missions[state.done % missions.length]}</p><p class="muted">Estimated time: 30–60 minutes.</p>`;

  document.querySelectorAll("[data-target]").forEach(cb=>{
    cb.checked = !!state.targets[cb.dataset.target];
    cb.onchange = () => { state.targets[cb.dataset.target] = cb.checked; save(); };
  });
}

function toggleRoad(i, checked){
  state.road = checked ? [...new Set([...state.road,i])] : state.road.filter(x=>x!==i);
  save();
}

function completeMission(){
  state.done++;
  state.xp += 25;
  save();
  alert("Mission complete. +25 XP 🔥");
}

async function askAI(action){
  const message = action === "coach"
    ? document.getElementById("question").value
    : action === "study"
      ? "Create a realistic study split for university Mathematics plus my data career skills today."
      : "What is the single best career-building mission I should complete today?";

  const box = document.getElementById("aiAnswer");
  box.textContent = "Thinking...";
  try {
    const r = await fetch("/api/coach", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({action,message,progress:state})
    });
    const data = await r.json();
    box.textContent = data.answer || data.error;
  } catch(e) {
    box.textContent = "Could not reach the AI coach. Make sure the server is running and your API key is configured.";
  }
}

function resetProgress(){
  if(confirm("Reset all progress?")) { state={xp:0,done:0,road:[],targets:{}}; save(); }
}

render();
