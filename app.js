
// Slide-in page animation
window.addEventListener("load", () => {
  const page = document.getElementById("page");
  requestAnimationFrame(() => page.classList.add("slide-in"));
});

// 3D tilt + glow follow
document.querySelectorAll(".tilt").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = ((y / r.height) - 0.5) * -8;
    const ry = ((x / r.width) - 0.5) * 10;

    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${(x / r.width) * 100}%`);
    el.style.setProperty("--my", `${(y / r.height) * 100}%`);
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

// Modal
const backdrop = document.getElementById("backdrop");
const mTitle = document.getElementById("mTitle");
const mMeta = document.getElementById("mMeta");
const mBody = document.getElementById("mBody");
const mClose = document.getElementById("mClose");

function openModal({ title, meta, full }) {
  mTitle.textContent = title || "";
  mMeta.textContent = meta || "";
  mBody.textContent = full || "";
  backdrop.classList.remove("hidden");
  backdrop.classList.add("flex");
}

function closeModal() {
  backdrop.classList.add("hidden");
  backdrop.classList.remove("flex");
}

if (mClose) mClose.addEventListener("click", closeModal);
if (backdrop) backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});

// Bind modal buttons/cards
document.querySelectorAll("[data-modal-title]").forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal({
      title: btn.getAttribute("data-modal-title"),
      meta: btn.getAttribute("data-modal-meta"),
      full: btn.getAttribute("data-modal-full"),
    });
  });
});

// Profile popup + typing
const profileCard = document.getElementById("profileCard");
if (profileCard) {
  profileCard.addEventListener("click", () => {
    openModal({
      title: "Sampath Busha",
      meta: "Python Developer • Software Developer • Hyderabad, India",
      full: ""
    });

    // Custom modal body: portrait + typing
    mBody.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div class="rounded-3xl overflow-hidden border border-violet-100 shadow-lg">
          <img src="assets/portrait.png" alt="Portrait" class="w-full h-auto object-cover" />
        </div>
        <div>
          <div class="text-sm font-extrabold text-slate-900">About Me</div>
          <div id="typeBox" class="mt-2 text-slate-700 font-semibold leading-relaxed"></div>
          <div class="mt-4 flex flex-wrap gap-2">
            <a class="px-4 py-2 rounded-full bg-violet-600 text-white font-extrabold" href="assets/Sampath_Busha_Resume.pdf" target="_blank">Open Resume</a>
            <a class="px-4 py-2 rounded-full bg-white border border-violet-200 text-slate-800 font-extrabold" href="https://github.com/sampath-2147" target="_blank">GitHub</a>
            <a class="px-4 py-2 rounded-full bg-white border border-violet-200 text-slate-800 font-extrabold" href="https://linkedin.com/in/sampath-busha" target="_blank">LinkedIn</a>
          </div>
        </div>
      </div>
    `;

    const text = "Final-year B.Tech CSBS student with hands-on experience in Python development, backend systems, and AI-powered applications. Skilled in Flask, Streamlit, databases, and modern APIs. Strong in problem-solving, data handling, and GitHub collaboration. Actively seeking entry-level Software Developer or Python Developer roles.";
    const box = document.getElementById("typeBox");
    let i = 0;

    function type() {
      if (!box) return;
      box.innerHTML = text.slice(0, i) + '<span class="cursor">|</span>';
      i++;
      if (i <= text.length) setTimeout(type, 18);
    }
    type();
  });
}

// Flip on mobile tap
document.querySelectorAll(".flip").forEach((flip) => {
  flip.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      const inner = flip.querySelector(".flip-inner");
      if (!inner) return;
      const current = inner.style.transform;
      inner.style.transform = current.includes("rotateY(180deg)") ? "" : "rotateY(180deg)";
    }
  });
});
