const EMAIL = "iheanachodavid@outlook.com";

document.querySelectorAll(".year").forEach((el) => {
  el.textContent = `© ${new Date().getFullYear()} Iheanacho. All rights reserved.`;
});

const nav = document.getElementById("nav");
const menuBtn = document.querySelector("[data-menu]");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open")),
  );
}

const typedEl = document.getElementById("typed");
if (typedEl) {
  const messages = [
    "buildSomethingGreat();",
    "solveRealProblems();",
    "keepLearning();",
    "createUsefulThings();",
  ];
  let mi = 0;
  let ci = 0;
  let deleting = false;
  const tick = () => {
    const current = messages[mi];
    ci += deleting ? -1 : 1;
    typedEl.textContent = current.slice(0, ci);
    let speed = deleting ? 45 : 80;
    if (!deleting && ci === current.length) {
      speed = 1800;
      deleting = true;
    }
    if (deleting && ci === 0) {
      deleting = false;
      mi = (mi + 1) % messages.length;
      speed = 400;
    }
    setTimeout(tick, speed);
  };
  setTimeout(tick, 800);
}

const visual = document.getElementById("heroVisual");
const terminal = document.getElementById("terminal");
if (visual && terminal) {
  visual.addEventListener("mousemove", (e) => {
    const r = visual.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rotateX = ((y - r.height / 2) / (r.height / 2)) * -3;
    const rotateY = ((x - r.width / 2) / (r.width / 2)) * 3;
    terminal.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  visual.addEventListener("mouseleave", () => {
    terminal.style.transform = "rotate(2deg)";
  });
}

let topic = "Website";
document.querySelectorAll("#topics .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll("#topics .chip").forEach((c) => c.classList.remove("on"));
    chip.classList.add("on");
    topic = chip.dataset.topic;
  });
});

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`${topic} project from ${data.get("name") || "a visitor"}`);
    const body = encodeURIComponent(
      `Hi David,\n\n${data.get("message")}\n\n— ${data.get("name")}\n${data.get("email")}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  });
}

const copyBtn = document.getElementById("copyEmail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(EMAIL);
    copyBtn.textContent = "Copied";
    setTimeout(() => (copyBtn.textContent = "Copy email"), 1600);
  });
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.97)";
    setTimeout(() => (button.style.transform = ""), 150);
  });
});

const naira = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

function monthKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function demoLedger() {
  const p = monthKey();
  return [
    { id: "1", type: "in", amount: 180000, category: "Freelance", note: "Landing page", date: `${p}-03` },
    { id: "2", type: "out", amount: 42000, category: "Food", note: "Groceries", date: `${p}-05` },
    { id: "3", type: "out", amount: 18500, category: "Transport", note: "Buses", date: `${p}-07` },
    { id: "4", type: "out", amount: 8000, category: "Airtime", note: "Data", date: `${p}-09` },
    { id: "5", type: "in", amount: 25000, category: "Support", note: "Family", date: `${p}-12` },
    { id: "6", type: "out", amount: 35000, category: "Bills", note: "Electricity", date: `${p}-14` },
    { id: "7", type: "out", amount: 15000, category: "School", note: "Materials", date: `${p}-18` },
  ];
}

function initLedger(root) {
  const KEY = "pocket-ledger.v1";
  let entries = [];
  try {
    entries = JSON.parse(localStorage.getItem(KEY)) || demoLedger();
  } catch {
    entries = demoLedger();
  }
  let month = monthKey();

  const save = () => localStorage.setItem(KEY, JSON.stringify(entries));

  const render = () => {
    const monthEntries = entries
      .filter((e) => e.date.startsWith(month))
      .sort((a, b) => b.date.localeCompare(a.date));
    const income = monthEntries.filter((e) => e.type === "in").reduce((s, e) => s + e.amount, 0);
    const spent = monthEntries.filter((e) => e.type === "out").reduce((s, e) => s + e.amount, 0);
    const cats = {};
    monthEntries.filter((e) => e.type === "out").forEach((e) => {
      cats[e.category] = (cats[e.category] || 0) + e.amount;
    });
    const max = Math.max(...Object.values(cats), 1);
    const [y, m] = month.split("-").map(Number);
    const label = new Date(y, m - 1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

    root.innerHTML = `
      <div class="skills">
        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <button class="btn btn-ghost" data-shift="-1">←</button>
            <span class="mono">${label.toUpperCase()}</span>
            <button class="btn btn-ghost" data-shift="1">→</button>
          </div>
          <p class="mono">REMAINING THIS MONTH</p>
          <p style="font-size:42px;font-weight:800">${naira(income - spent)}</p>
          <div class="work-grid" style="margin-top:20px">
            <div class="kpi"><span class="mono">IN</span><b style="color:var(--green)">${naira(income)}</b></div>
            <div class="kpi"><span class="mono">OUT</span><b>${naira(spent)}</b></div>
          </div>
          <h3 style="margin:28px 0 12px">Where the money went</h3>
          ${
            Object.keys(cats).length
              ? Object.entries(cats)
                  .sort((a, b) => b[1] - a[1])
                  .map(
                    ([name, v]) =>
                      `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${name}</span><b>${naira(v)}</b></div><div style="height:8px;background:var(--surface-light);border-radius:99px;overflow:hidden"><div style="height:100%;width:${(v / max) * 100}%;background:var(--primary)"></div></div></div>`,
                  )
                  .join("")
              : `<p class="lede">No spending this month.</p>`
          }
        </div>
        <div>
          <form class="panel" id="txForm">
            <h3>Add a transaction</h3>
            <div class="chips" style="margin:12px 0">
              <button type="button" class="chip on" data-type="out">Spend</button>
              <button type="button" class="chip" data-type="in">Income</button>
            </div>
            <label><span>Amount (₦)</span><input name="amount" inputmode="numeric" required placeholder="15000" /></label>
            <div style="height:12px"></div>
            <label><span>Category</span>
              <select name="category">
                <option>Food</option><option>Transport</option><option>Bills</option>
                <option>Airtime</option><option>School</option><option>Rent</option>
                <option>Freelance</option><option>Support</option><option>Other</option>
              </select>
            </label>
            <div style="height:12px"></div>
            <label><span>Date</span><input type="date" name="date" required value="${new Date().toISOString().slice(0, 10)}" /></label>
            <div style="height:12px"></div>
            <label><span>Note</span><input name="note" placeholder="Optional" /></label>
            <div style="height:16px"></div>
            <button class="btn btn-fg" type="submit" style="width:100%">Save transaction</button>
          </form>
          <div class="panel" style="margin-top:16px">
            <div style="display:flex;justify-content:space-between"><h3>This month</h3>
              <button class="btn btn-ghost" id="resetDemo" type="button">Reset demo</button></div>
            ${monthEntries
              .map(
                (e) =>
                  `<div class="tx"><div style="flex:1"><b>${e.note || e.category}</b><div class="mono">${e.category} · ${e.date}</div></div><b class="${e.type}">${e.type === "in" ? "+" : "−"}${naira(e.amount)}</b><button class="btn btn-ghost" data-del="${e.id}">✕</button></div>`,
              )
              .join("") || `<p class="lede">Nothing here yet.</p>`}
          </div>
        </div>
      </div>`;

    let type = "out";
    root.querySelectorAll("[data-type]").forEach((btn) => {
      btn.addEventListener("click", () => {
        type = btn.dataset.type;
        root.querySelectorAll("[data-type]").forEach((b) => b.classList.toggle("on", b === btn));
      });
    });
    root.querySelectorAll("[data-shift]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [yy, mm] = month.split("-").map(Number);
        const d = new Date(yy, mm - 1 + Number(btn.dataset.shift), 1);
        month = monthKey(d);
        render();
      });
    });
    root.querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        entries = entries.filter((e) => e.id !== btn.dataset.del);
        save();
        render();
      });
    });
    root.querySelector("#resetDemo")?.addEventListener("click", () => {
      entries = demoLedger();
      month = monthKey();
      save();
      render();
    });
    root.querySelector("#txForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const amount = Number(fd.get("amount"));
      if (!amount || amount <= 0) return;
      entries.unshift({
        id: String(Date.now()),
        type,
        amount: Math.round(amount),
        category: fd.get("category"),
        note: String(fd.get("note") || "").trim(),
        date: fd.get("date"),
      });
      month = String(fd.get("date")).slice(0, 7);
      save();
      render();
    });
  };
  render();
}

const HIV_STATES = [
  ["Rivers", "South South", 208767], ["Benue", "North Central", 202346],
  ["Akwa Ibom", "South South", 161597], ["Lagos", "South West", 108649],
  ["Anambra", "South East", 100429], ["FCT", "North Central", 83333],
  ["Delta", "South South", 68170], ["Imo", "South East", 67944],
  ["Enugu", "South East", 61028], ["Edo", "South South", 60095],
  ["Taraba", "North East", 58460], ["Abia", "South East", 54655],
  ["Kaduna", "North West", 54458], ["Kano", "North West", 53972],
  ["Plateau", "North Central", 51736], ["Borno", "North East", 50433],
  ["Oyo", "South West", 50063], ["Nasarawa", "North Central", 44993],
  ["Cross River", "South South", 43452], ["Ogun", "South West", 43348],
  ["Adamawa", "North East", 40059], ["Gombe", "North East", 31825],
  ["Jigawa", "North West", 31409], ["Osun", "South West", 30714],
  ["Niger", "North Central", 29756], ["Bauchi", "North East", 28698],
  ["Kogi", "North Central", 28421], ["Ondo", "South West", 27150],
  ["Katsina", "North West", 26788], ["Bayelsa", "South South", 25339],
  ["Kwara", "North Central", 20259], ["Kebbi", "North West", 19339],
  ["Ekiti", "South West", 18857], ["Sokoto", "North West", 15223],
  ["Ebonyi", "South East", 14151], ["Zamfara", "North West", 13253],
  ["Yobe", "North East", 11956],
];

function initHiv(root) {
  let zone = "All";
  let q = "";
  const zones = ["All", "North Central", "North East", "North West", "South East", "South South", "South West"];
  const fmt = (n) => n.toLocaleString("en-NG");

  const draw = () => {
    const rows = HIV_STATES.filter(([s, z]) => {
      const zok = zone === "All" || z === zone;
      const qok = !q || s.toLowerCase().includes(q.toLowerCase());
      return zok && qok;
    });
    const total = rows.reduce((s, r) => s + r[2], 0);
    const max = Math.max(...rows.map((r) => r[2]), 1);
    root.innerHTML = `
      <div class="kpis">
        <div class="kpi"><span class="mono">PEOPLE LIVING WITH HIV</span><b>1.89m</b></div>
        <div class="kpi"><span class="mono">ADULT PREVALENCE</span><b>1.4%</b></div>
        <div class="kpi"><span class="mono">ON TREATMENT</span><b>1.74m</b></div>
        <div class="kpi"><span class="mono">NEW INFECTIONS, DECADE</span><b>−46%</b></div>
      </div>
      <div class="panel" style="margin-bottom:16px">
        <h3>The care cascade</h3>
        <p class="lede" style="margin:8px 0 16px">Nigeria is at 87–98–95 versus the UNAIDS 95–95–95 target. Treatment and suppression are on target. Diagnosis is the lag.</p>
        <div class="cards-3">
          ${[
            ["Know their status", "87%"],
            ["On treatment", "98%"],
            ["Virally suppressed", "95%"],
          ]
            .map(
              ([t, v]) =>
                `<div class="kpi"><span class="mono">${t}</span><b>${v}</b><div style="height:6px;background:var(--surface-light);border-radius:99px;margin-top:10px"><div style="height:100%;width:${v};background:var(--primary);border-radius:99px"></div></div></div>`,
            )
            .join("")}
        </div>
      </div>
      <div class="panel">
        <h3>Where people live with HIV</h3>
        <p class="lede">Rivers, Benue and Akwa Ibom carry the largest counts. Filter by zone. Source: NACA 2024 Spectrum (reported 2025).</p>
        <div class="zone-btns">${zones
          .map(
            (z) =>
              `<button class="chip ${z === zone ? "on" : ""}" data-zone="${z}">${z}</button>`,
          )
          .join("")}</div>
        <input id="stateQ" placeholder="Search a state" value="${q}" style="max-width:280px;margin-bottom:16px" />
        <p class="mono">Showing ${rows.length} · ${fmt(total)} people</p>
        ${rows
          .slice(0, 12)
          .map(
            ([s, , n]) =>
              `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${s}</span><b>${fmt(n)}</b></div><div style="height:8px;background:var(--surface-light);border-radius:99px;overflow:hidden"><div style="width:${(n / max) * 100}%;height:100%;background:var(--primary)"></div></div></div>`,
          )
          .join("")}
        <div style="overflow:auto;margin-top:16px">
          <table><thead><tr><th>State</th><th>Zone</th><th style="text-align:right">People living with HIV</th></tr></thead>
          <tbody>${rows.map(([s, z, n]) => `<tr><td><b>${s}</b></td><td>${z}</td><td style="text-align:right">${fmt(n)}</td></tr>`).join("")}</tbody></table>
        </div>
      </div>
      <div class="panel" style="margin-top:16px;border-color:rgba(139,92,246,.3)">
        <p class="eyebrow">HOW I READ THIS</p>
        <ol class="lede" style="padding-left:18px;display:flex;flex-direction:column;gap:10px">
          <li><strong style="color:var(--fg)">Treatment is working.</strong> New infections have fallen for a decade. The unfinished job is diagnosis (87%).</li>
          <li><strong style="color:var(--fg)">Place still matters.</strong> National averages hide Rivers, Benue and Akwa Ibom.</li>
          <li><strong style="color:var(--fg)">Women and pregnancy are the gap to watch.</strong> Among those identified as needing PMTCT treatment, only about 33% received it.</li>
        </ol>
      </div>
      <p class="lede" style="margin-top:16px">Sources: NACA World AIDS Day 2025; NACA 2024 Spectrum estimates; FMOH State of the Health of the Nation 2025; NASCP July 2025.</p>
    `;
    root.querySelectorAll("[data-zone]").forEach((b) =>
      b.addEventListener("click", () => {
        zone = b.dataset.zone;
        draw();
      }),
    );
    root.querySelector("#stateQ")?.addEventListener("input", (e) => {
      q = e.target.value;
      draw();
    });
  };
  draw();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (q && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else q = !q;
    } else if ((c === "," && !q) || ((c === "\n" || c === "\r") && !q)) {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell.trim());
      cell = "";
      if (c !== ",") {
        if (row.some((x) => x)) rows.push(row);
        row = [];
      }
    } else cell += c;
  }
  row.push(cell.trim());
  if (row.some((x) => x)) rows.push(row);
  return rows;
}

function initCsv(root) {
  const missing = (v) => ["", "-", "na", "n/a", "null", "none", "."].includes(v.toLowerCase());
  let sheet = null;

  const hivSample = () =>
    ["state,zone,people_living_with_hiv"]
      .concat(HIV_STATES.map((r) => r.join(",")))
      .join("\n");

  const spendSample = `date,category,amount,note,paid
2026-09-01,Food,18500,Market run,yes
2026-09-02,Transport,2500,Bus to work,yes
2026-09-04,Food,NA,Street food,yes
2026-09-05,Bills,35000,Electricity,yes
2026-09-07,School,15000,Printouts,no
2026-09-09,Other,-,Gift,no
2026-09-12,Transport,NA,Late trip,yes`;

  const load = (text, name) => {
    const table = parseCsv(text);
    if (table.length < 2) throw new Error("Need a header and at least one row.");
    const headers = table[0].map((h, i) => h || `column_${i + 1}`);
    const rows = table.slice(1).map((r) => headers.map((_, i) => r[i] || ""));
    sheet = { name, headers, rows };
    draw();
  };

  const draw = () => {
    root.innerHTML = `
      <div class="drop" id="drop">
        <p style="font-size:20px;font-weight:800">Drop a CSV here</p>
        <p class="lede">It stays in this browser. Max 2 MB.</p>
        <div class="hero-actions" style="justify-content:center;margin:20px 0 0">
          <button class="btn btn-fg" id="pick">Choose file</button>
          <button class="btn btn-ghost" id="sHiv">Sample: HIV states</button>
          <button class="btn btn-ghost" id="sSpend">Sample: monthly spend</button>
        </div>
        <input id="file" type="file" accept=".csv,text/csv" hidden />
        <p class="lede" id="csvErr" style="color:var(--primary);margin-top:12px"></p>
      </div>
      <div id="csvOut"></div>`;

    const err = root.querySelector("#csvErr");
    const file = root.querySelector("#file");
    root.querySelector("#pick").onclick = () => file.click();
    root.querySelector("#sHiv").onclick = () => load(hivSample(), "hiv-nigeria-states.csv");
    root.querySelector("#sSpend").onclick = () => load(spendSample, "september-spend.csv");
    file.onchange = () => {
      const f = file.files[0];
      if (!f) return;
      if (f.size > 2_000_000) {
        err.textContent = "Keep the file under 2 MB.";
        return;
      }
      f.text().then((t) => load(t, f.name)).catch((e) => (err.textContent = e.message));
    };
    const drop = root.querySelector("#drop");
    drop.ondragover = (e) => {
      e.preventDefault();
      drop.style.borderColor = "var(--primary)";
    };
    drop.ondragleave = () => (drop.style.borderColor = "");
    drop.ondrop = (e) => {
      e.preventDefault();
      drop.style.borderColor = "";
      const f = e.dataTransfer.files[0];
      if (f) f.text().then((t) => load(t, f.name));
    };

    if (!sheet) return;
    const profiles = sheet.headers.map((h, i) => {
      const vals = sheet.rows.map((r) => r[i]);
      const filled = vals.filter((v) => !missing(v));
      const nums = filled.map((v) => Number(String(v).replace(/,/g, "")));
      const numeric = filled.length && nums.every((n) => Number.isFinite(n));
      return { h, missing: vals.length - filled.length, filled: filled.length, numeric };
    });
    const out = root.querySelector("#csvOut");
    out.innerHTML = `
      <div class="kpis">
        <div class="kpi"><span class="mono">FILE</span><b style="font-size:16px">${sheet.name}</b></div>
        <div class="kpi"><span class="mono">ROWS</span><b>${sheet.rows.length}</b></div>
        <div class="kpi"><span class="mono">COLUMNS</span><b>${sheet.headers.length}</b></div>
        <div class="kpi"><span class="mono">EMPTY CELLS</span><b>${profiles.reduce((s, p) => s + p.missing, 0)}</b></div>
      </div>
      <div class="panel">
        <h3>Columns</h3>
        <table><thead><tr><th>Name</th><th>Type</th><th>Filled</th><th>Missing</th></tr></thead>
        <tbody>${profiles.map((p) => `<tr><td><b>${p.h}</b></td><td>${p.numeric ? "number" : "text"}</td><td>${p.filled}</td><td>${p.missing}</td></tr>`).join("")}</tbody></table>
      </div>
      <div class="panel" style="margin-top:16px;overflow:auto">
        <h3>Preview</h3>
        <table><thead><tr>${sheet.headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${sheet.rows.slice(0, 40).map((r) => `<tr>${r.map((c) => `<td>${c || "—"}</td>`).join("")}</tr>`).join("")}</tbody></table>
      </div>`;
  };
  draw();
}

const ledgerRoot = document.getElementById("ledgerApp");
if (ledgerRoot) initLedger(ledgerRoot);
const hivRoot = document.getElementById("hivApp");
if (hivRoot) initHiv(hivRoot);
const csvRoot = document.getElementById("csvApp");
if (csvRoot) initCsv(csvRoot);
const SCAM_ITEMS = [
  {
    channel: "SMS",
    from: "BVN-CENTRE",
    body: "Your BVN will be DEACTIVATED in 2 hours. Verify now: http://bvn-verify-ng.xyz/update",
    scam: true,
    tell: "NIMC/CBN will not kill your BVN by SMS, and they will not send a random .xyz link. Open the official app yourself.",
  },
  {
    channel: "SMS",
    from: "GTBank",
    body: "Debit NGN2,500.00 at SHOPRITE IKEJA on 09-SEP. Bal: NGN48,220.00. If you did not authorize this, call 0700 448 8338.",
    scam: false,
    tell: "No link, a real merchant. Debit alerts are normal. Don't call a number from a second text that follows this one.",
  },
  {
    channel: "WhatsApp",
    from: "Mum (new number)",
    body: "My phone fell inside water. This is my new line. Please send N45,000 to 2104487732 (Wema) now.",
    scam: true,
    tell: "Family emergency + new number + send money now. Call the old number first.",
  },
  {
    channel: "Email",
    from: "hr@remote-jobs-hire.com",
    body: "You have been selected for the Data Assistant role. Pay a N15,000 laptop logistics fee to our agent today.",
    scam: true,
    tell: "Real employers do not ask you to pay for the laptop.",
  },
  {
    channel: "Email",
    from: "billing@ikejaelectric.com",
    body: "Your August bill for meter 31002XXXX is N18,450. Pay in the Ikeja Electric app or at a listed bank. This mail will not ask for your password.",
    scam: false,
    tell: "Known domain, no countdown, no password. Pay inside the official app, not a link in the mail.",
  },
  {
    channel: "SMS",
    from: "+12025550182",
    body: "NIMC: Your NIN is flagged. Update records at https://nimc-portal.co/login to avoid arrest.",
    scam: true,
    tell: "Fear + arrest + a lookalike site. Official NIMC is nimc.gov.ng.",
  },
  {
    channel: "SMS",
    from: "Palmpay-Win",
    body: "Congratulations! You won N500,000 airtime. Click https://claim-palmpay.gift to receive it in 10 minutes.",
    scam: true,
    tell: "You did not enter a raffle. Prize + deadline + odd domain. Delete.",
  },
  {
    channel: "Email",
    from: "ada.okeke@sterling.ng",
    body: "Hi David — confirming Thursday 10:00 for the intern conversation on Zoom. No fee. If the time is bad, reply on this thread.",
    scam: false,
    tell: "Named person, company domain, a time, no payment. Join Zoom from your calendar.",
  },
];

function initScam(root) {
  let i = 0;
  let score = 0;
  const answers = [];
  let locked = false;
  const draw = () => {
    if (i >= SCAM_ITEMS.length) {
      const missed = answers.filter((a) => !a.ok);
      root.innerHTML =
        '<div class="msg-card"><p class="eyebrow">RESULT</p><p style="font-size:48px;font-weight:800">' +
        score +
        " / " +
        SCAM_ITEMS.length +
        '</p>' +
        missed
          .map(
            (a) =>
              '<div class="tell"><b>' +
              a.item.from +
              "</b> — it was " +
              (a.item.scam ? "a scam" : "safe") +
              ". " +
              a.item.tell +
              "</div>",
          )
          .join("") +
        '<button class="btn btn-fg" id="scamAgain" style="margin-top:24px;width:100%">Try again</button></div>';
      root.querySelector("#scamAgain").onclick = () => {
        i = 0;
        score = 0;
        answers.length = 0;
        locked = false;
        draw();
      };
      return;
    }
    const item = SCAM_ITEMS[i];
    root.innerHTML =
      '<div class="msg-card"><div class="msg-meta"><span>' +
      item.channel +
      " · " +
      item.from +
      "</span><span>" +
      (i + 1) +
      " / " +
      SCAM_ITEMS.length +
      '</span></div><p style="font-size:18px;line-height:1.55">' +
      item.body +
      '</p><div class="choice"><button class="btn btn-fg" data-pick="safe">Safe</button><button class="btn btn-ghost" data-pick="scam">Scam</button></div><div id="scamTell"></div></div>';
    root.querySelectorAll("[data-pick]").forEach((btn) => {
      btn.onclick = () => {
        if (locked) return;
        locked = true;
        const saidScam = btn.dataset.pick === "scam";
        const ok = saidScam === item.scam;
        if (ok) score += 1;
        answers.push({ item, ok });
        root.querySelector("#scamTell").innerHTML =
          '<div class="tell"><b>' +
          (ok ? "Correct." : "Not quite.") +
          "</b> This one is " +
          (item.scam ? "a scam" : "safe") +
          ". " +
          item.tell +
          '</div><button class="btn btn-fg" id="scamNext" style="margin-top:16px;width:100%">' +
          (i === SCAM_ITEMS.length - 1 ? "See score" : "Next message") +
          "</button>";
        root.querySelector("#scamNext").onclick = () => {
          i += 1;
          locked = false;
          draw();
        };
      };
    });
  };
  draw();
}

function initInvoice(root) {
  const KEY = "naira-invoice.v1";
  let data = {
    business: "David Iheanacho",
    bizEmail: "iheanachodavid@outlook.com",
    bizNote: "Web, data & security",
    client: "",
    clientEmail: "",
    number: "INV-001",
    date: new Date().toISOString().slice(0, 10),
    due: "",
    vat: true,
    notes: "Thank you. Payment in naira after you confirm.",
    lines: [
      { desc: "Website landing page", qty: 1, price: 150000 },
      { desc: "Revisions (2 rounds)", qty: 1, price: 35000 },
    ],
  };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) data = Object.assign(data, saved);
  } catch (e) {}
  const money = (n) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n || 0);
  const persist = () => localStorage.setItem(KEY, JSON.stringify(data));
  const totals = () => {
    const sub = data.lines.reduce((s, l) => s + Number(l.qty || 0) * Number(l.price || 0), 0);
    const vat = data.vat ? Math.round(sub * 0.075) : 0;
    return { sub: sub, vat: vat, total: sub + vat };
  };
  const draw = () => {
    const t = totals();
    const linesHtml = data.lines
      .map(
        (l, idx) =>
          '<div class="line-row"><input data-k="desc" data-i="' +
          idx +
          '" value="' +
          l.desc +
          '" /><input data-k="qty" data-i="' +
          idx +
          '" value="' +
          l.qty +
          '" /><input data-k="price" data-i="' +
          idx +
          '" value="' +
          l.price +
          '" /><button type="button" class="btn btn-ghost" data-del="' +
          idx +
          '">X</button></div>',
      )
      .join("");
    const paperLines = data.lines
      .map(
        (l) =>
          "<tr><td>" +
          (l.desc || "—") +
          "</td><td>" +
          l.qty +
          '</td><td style="text-align:right">' +
          money(Number(l.qty) * Number(l.price)) +
          "</td></tr>",
      )
      .join("");
    root.innerHTML =
      '<div class="invoice-grid"><form class="panel no-print" id="invForm"><h3>Details</h3>' +
      '<label><span>Your name</span><input name="business" value="' +
      data.business +
      '" /></label><div style="height:10px"></div>' +
      '<label><span>Your email</span><input name="bizEmail" value="' +
      data.bizEmail +
      '" /></label><div style="height:10px"></div>' +
      '<label><span>Client</span><input name="client" value="' +
      data.client +
      '" /></label><div style="height:10px"></div>' +
      '<label><span>Client email</span><input name="clientEmail" value="' +
      data.clientEmail +
      '" /></label><div style="height:10px"></div>' +
      '<label><span>Invoice no.</span><input name="number" value="' +
      data.number +
      '" /></label><div style="height:10px"></div>' +
      '<label><span>Date</span><input type="date" name="date" value="' +
      data.date +
      '" /></label><div style="height:10px"></div>' +
      '<label><span>Due</span><input type="date" name="due" value="' +
      data.due +
      '" /></label><div style="height:16px"></div><h3>Line items</h3><div style="margin:12px 0">' +
      linesHtml +
      '</div><button type="button" class="btn btn-ghost" id="addLine">Add line</button><div style="height:16px"></div>' +
      '<label style="display:flex;align-items:center;gap:10px"><input type="checkbox" name="vat" ' +
      (data.vat ? "checked" : "") +
      ' style="width:18px;min-height:18px;box-shadow:none" /><span style="margin:0;text-transform:none;font-family:Manrope,sans-serif;color:var(--fg)">Add 7.5% VAT</span></label><div style="height:10px"></div>' +
      '<label><span>Note</span><textarea name="notes" rows="3">' +
      data.notes +
      '</textarea></label><div style="height:16px"></div>' +
      '<button type="button" class="btn btn-fg" id="printInv" style="width:100%">Print / Save as PDF</button></form>' +
      '<div class="paper"><p class="muted" style="font-size:11px;letter-spacing:0.2em">INVOICE</p><h2>' +
      (data.business || "Your name") +
      '</h2><p class="muted">' +
      data.bizEmail +
      '</p><div style="display:flex;justify-content:space-between;margin:28px 0"><div><p class="muted">BILL TO</p><p><b>' +
      (data.client || "Client name") +
      "</b></p><p class=\"muted\">" +
      data.clientEmail +
      '</p></div><div style="text-align:right"><p><b>' +
      data.number +
      '</b></p><p class="muted">Date ' +
      (data.date || "—") +
      '</p><p class="muted">Due ' +
      (data.due || "—") +
      "</p></div></div><table><thead><tr><th>Description</th><th>Qty</th><th style=\"text-align:right\">Amount</th></tr></thead><tbody>" +
      paperLines +
      '</tbody></table><p style="text-align:right;margin-top:16px" class="muted">Subtotal ' +
      money(t.sub) +
      "</p>" +
      (data.vat
        ? '<p style="text-align:right" class="muted">VAT 7.5% ' + money(t.vat) + "</p>"
        : "") +
      '<p style="text-align:right;font-size:24px;font-weight:800">' +
      money(t.total) +
      '</p><p class="muted" style="margin-top:32px">' +
      data.notes +
      "</p></div></div>";
    const form = root.querySelector("#invForm");
    const grab = () => {
      const fd = new FormData(form);
      data.business = fd.get("business") || "";
      data.bizEmail = fd.get("bizEmail") || "";
      data.client = fd.get("client") || "";
      data.clientEmail = fd.get("clientEmail") || "";
      data.number = fd.get("number") || "INV-001";
      data.date = fd.get("date") || "";
      data.due = fd.get("due") || "";
      data.notes = fd.get("notes") || "";
      data.vat = form.querySelector('[name="vat"]').checked;
      persist();
      draw();
    };
    form.querySelectorAll("input, textarea").forEach((el) => el.addEventListener("change", grab));
    root.querySelectorAll("[data-k]").forEach((el) => {
      el.addEventListener("change", () => {
        const idx = Number(el.dataset.i);
        const k = el.dataset.k;
        data.lines[idx][k] = k === "desc" ? el.value : Number(el.value) || 0;
        persist();
        draw();
      });
    });
    root.querySelectorAll("[data-del]").forEach((btn) => {
      btn.onclick = () => {
        data.lines.splice(Number(btn.dataset.del), 1);
        if (!data.lines.length) data.lines.push({ desc: "", qty: 1, price: 0 });
        persist();
        draw();
      };
    });
    root.querySelector("#addLine").onclick = () => {
      data.lines.push({ desc: "", qty: 1, price: 0 });
      persist();
      draw();
    };
    root.querySelector("#printInv").onclick = () => window.print();
  };
  draw();
}

const scamRoot = document.getElementById("scamApp");
if (scamRoot) initScam(scamRoot);
const invoiceRoot = document.getElementById("invoiceApp");
if (invoiceRoot) initInvoice(invoiceRoot);