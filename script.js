// ===== Scroll progress indicator (story position) =====
const scrollProgress = document.getElementById('scrollProgress');
let progressTicking = false;

function updateProgress() {
  if (!scrollProgress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  scrollProgress.style.transform = `scaleX(${ratio})`;
  progressTicking = false;
}

window.addEventListener('scroll', () => {
  if (!progressTicking) {
    requestAnimationFrame(updateProgress);
    progressTicking = true;
  }
}, { passive: true });

// ===== Mobile nav toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}



// ===== Scroll reveal system (story-style entrances) =====
const staggerEls = document.querySelectorAll('.stagger-item');
staggerEls.forEach((el) => {
  const group = el.closest('.stagger');
  if (!group) return;
  const idx = Array.prototype.indexOf.call(group.children, el);
  el.style.setProperty('--i', Math.max(idx, 0));
});

const portCards = document.querySelectorAll('.port-card');
portCards.forEach((card, i) => {
  if (!card.hasAttribute('data-reveal')) card.setAttribute('data-reveal', '');
  card.style.setProperty('--i', Math.floor(i / 3));
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

revealEls.forEach((el) => revealObserver.observe(el));

// ===== Portfolio Filtering (replays reveal animation per filter) =====
const filterBtns = document.querySelectorAll('.filter-btn');

function applyFilter(filter) {
  portCards.forEach((card) => {
    const categories = card.getAttribute('data-category') || '';
    const visible = filter === 'all' || categories.includes(filter);
    card.style.display = visible ? 'flex' : 'none';
    if (visible) {
      card.classList.remove('in-view');
      requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('in-view')));
    }
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.getAttribute('data-filter'));
  });
});

// ===== Detailed Project Data for Case Study Modals =====
const projectData = {
  sadaksetu: {
    title: "SadakSetu — AI-Powered Road Health Monitoring Platform",
    badge: "Smart India Hackathon 2026 • Team ExNebula",
    summary: "Crowdsourced, AI-powered system to identify, report, and prioritize municipal road and pothole repairs, with integrated maps and navigation.",
    details: [
      "Built a working prototype on FastAPI and React PWA.",
      "Covers crowdsourced issue reporting and an AI-based repair prioritization workflow.",
      "Integrates real-time geolocation mapping and automated severity scoring."
    ],
    stack: ["FastAPI", "React PWA", "Python", "OpenCV / AI Vision", "Maps API"],
    repo: "https://github.com/AhmedAli-06/SadakSetu",
    images: [
      "assets/projects/sadaksetu/01-login.png",
      "assets/projects/sadaksetu/02-permissions.png",
      "assets/projects/sadaksetu/03-enabling.png",
      "assets/projects/sadaksetu/04-map-home.png",
      "assets/projects/sadaksetu/05-heatmap.png",
      "assets/projects/sadaksetu/06-heat-traffic.png",
      "assets/projects/sadaksetu/07-copilot.png"
    ]
  },
  medrover: {
    title: "MedRover AI — Rural Healthcare Access Platform",
    badge: "TechnoVision-26 (Apr 2026) • Team ExNebula",
    summary: "Full-stack AI-powered healthcare access app designed for rural and under-served communities across India.",
    details: [
      "React Native (Expo) mobile frontend with Node.js/Express backend.",
      "AI features integrated via Groq SDK and OpenAI for medical assistance.",
      "JWT-based secure authentication and cloud-hosted on Vercel.",
      "Presented at the Project Exhibition ('Urban Pulse + MedRover') at TECHNOVISION-26, GNDEC Bidar."
    ],
    stack: ["React Native (Expo)", "Node.js", "Express.js", "Groq SDK", "OpenAI API", "JWT", "Vercel"],
    repo: "https://github.com/AhmedAli-06/Medi-Rover-Pro",
    images: [
      "assets/projects/medrover/01-welcome.png",
      "assets/projects/medrover/02-doctor-dashboard.png",
      "assets/projects/medrover/03-patient-dashboard.png"
    ]
  },
  contextshield: {
    title: "ContextShield — Intent-Aware Physical Asset Security Platform",
    badge: "Individual Project • v0.2.0-alpha",
    summary: "AI-powered access-control platform layering intent verification on top of identity-based security.",
    details: [
      "Powered by a 5-dimensional Trust Score Engine (evaluating identity, temporal data, project context, role, and anomaly parameters).",
      "Features real-time WebSocket event monitoring, ML-based anomaly detection, RBAC, session revocation, and signed audit trails.",
      "Backend built with Python, FastAPI, SQLAlchemy, PostgreSQL, Redis.",
      "Frontend built with React, TypeScript, Vite.",
      "Backed by 45 automated unit and integration tests."
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "React", "TypeScript", "Vite", "WebSockets"],
    repo: "https://github.com/AhmedAli-06/Context-Shield",
    images: [
      "assets/projects/contextshield/01-login.png",
      "assets/projects/contextshield/02-dashboard.png",
      "assets/projects/contextshield/03-assets.png",
      "assets/projects/contextshield/04-live-feed.png"
    ]
  },
  nexora: {
    title: "Nexora (formerly CampusNest) — College Community Platform",
    badge: "Individual Project",
    summary: "Comprehensive product architecture and feature roadmap for a full-stack campus community platform.",
    details: [
      "Designed for student engagement, peer networking, event coordination, and academic resource sharing.",
      "Stack: Flask backend, React frontend, Tailwind CSS, Supabase database, deployed on Vercel."
    ],
    stack: ["Flask", "React", "Tailwind CSS", "Supabase", "Vercel"],
    repo: "https://github.com/AhmedAli-06",
    images: [
      "assets/projects/campusnest/feed.png",
      "assets/projects/campusnest/feed-scrolled.png",
      "assets/projects/campusnest/login.png",
      "assets/projects/campusnest/profile.png"
    ]
  },
  timetable: {
    title: "Intelligent College Timetable Generator",
    badge: "Coursework Mini-Project • BCS401",
    summary: "Automated constraint-solving scheduling engine for college faculty and student timetables.",
    details: [
      "Developed in Java focusing on Data Structures & Algorithms.",
      "Implements backtracking and constraint satisfaction algorithms to prevent room and timing clashes."
    ],
    stack: ["Java", "Data Structures", "Algorithms", "Graph Theory"],
    repo: "https://github.com/AhmedAli-06/TimeTable-generator-",
    images: [
      "assets/projects/timetable/hero.png",
      "assets/projects/timetable/full.png",
      "assets/projects/timetable/generated.png"
    ]
  }
};

// ===== Modal functions =====
function galleryHTML(images) {
  if (!images || !images.length) return '';
  const thumbs = images
    .map((src, i) => `<img src="${src}" data-i="${i}" alt="Screenshot ${i + 1}" class="${i === 0 ? 'active' : ''}">`)
    .join('');
  return `
    <div class="gallery" data-gallery>
      <img class="gallery-main" src="${images[0]}" alt="Project screenshot">
      <div class="gallery-thumbs">${thumbs}</div>
    </div>`;
}

function openProjectModal(key) {
  const data = projectData[key];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');

  const detailsHtml = data.details.map(item => `<li>${item}</li>`).join('');
  const stackHtml = data.stack.map(tech => `<span style="background:#000; color:#fff; padding:0.2rem 0.5rem; font-size:0.75rem; font-weight:700; border-radius:2px;">${tech}</span>`).join(' ');
  const gallery = galleryHTML(data.images);

  modalBody.innerHTML = `
    <span style="background:#000; color:#fff; font-size:0.75rem; font-weight:800; padding:0.2rem 0.6rem; display:inline-block; margin-bottom:0.8rem;">${data.badge}</span>
    <h3 style="font-family:'Montserrat',sans-serif; font-size:1.6rem; font-weight:900; margin-bottom:1rem; text-transform:uppercase;">${data.title}</h3>
    <p style="font-size:1rem; line-height:1.5; margin-bottom:1rem; font-weight:500;">${data.summary}</p>
    ${gallery}
    <h5 style="font-family:'Montserrat',sans-serif; font-size:1.05rem; font-weight:800; margin-top:1.2rem; margin-bottom:0.5rem;">KEY HIGHLIGHTS & ARCHITECTURE</h5>
    <ul style="padding-left:1.2rem; font-size:0.9rem; line-height:1.6; margin-bottom:1.5rem;">
      ${detailsHtml}
    </ul>
    <h5 style="font-family:'Montserrat',sans-serif; font-size:1.05rem; font-weight:800; margin-bottom:0.5rem;">TECHNOLOGY STACK</h5>
    <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.5rem;">
      ${stackHtml}
    </div>
    <a href="${data.repo}" target="_blank" rel="noopener" style="display:inline-block; background:#000; color:#fff; font-weight:800; font-size:0.9rem; padding:0.6rem 1.2rem; border:2px solid #000; text-transform:uppercase; text-decoration:none; transition:transform 160ms cubic-bezier(0.23,1,0.32,1);">VISIT GITHUB REPOSITORY →</a>
  `;

  const thumbs = modalBody.querySelector('.gallery-thumbs');
  if (thumbs) {
    thumbs.addEventListener('click', (e) => {
      const thumb = e.target.closest('img');
      if (!thumb) return;
      const main = modalBody.querySelector('.gallery-main');
      if (!main) return;
      const next = data.images[parseInt(thumb.dataset.i, 10)];
      if (!next || new URL(next, location.href).href === main.src) return;
      main.classList.remove('switching');
      void main.offsetWidth;
      main.classList.add('switching');
      main.src = next;
      thumbs.querySelectorAll('img').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on backdrop click
const modalBackdrop = document.getElementById('projectModal');
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeProjectModal();
  });
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

// ===== Contact Form Handler =====
const FORMSPREE_FORM_ID = 'mjybolyv';
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const setFormStatus = (message, isError) => {
  if (!formStatus) return;
  formStatus.style.color = isError ? '#cc0000' : '#006600';
  formStatus.textContent = message;
};

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (FORMSPREE_FORM_ID === 'YOUR_FORMSPREE_FORM_ID') {
      setFormStatus('Contact form is not configured yet — email me directly at mdahmeda490@gmail.com.', true);
      return;
    }

    formData.append('_subject', `New portfolio message from ${name}`);
    formData.append('_replyto', formData.get('email'));

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'SENDING...';
    }
    setFormStatus('Sending your message...', false);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        setFormStatus(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`, false);
        contactForm.reset();
      } else {
        setFormStatus('Something went wrong — please try again or email me directly at mdahmeda490@gmail.com.', true);
      }
    } catch (err) {
      setFormStatus('Network error — please check your connection and try again, or email mdahmeda490@gmail.com.', true);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'SUBMIT MESSAGE';
      }
    }
  });
}

// ===== 3D Hero Background (three.js — monochrome particle field) =====
function initHero3D() {
  const canvas = document.getElementById('bg-canvas');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero || !window.THREE) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const coarse = !finePointer;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: finePointer });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 9;

  const COUNT = coarse ? 1400 : 2600;
  const positions = new Float32Array(COUNT * 3);
  const base = new Float32Array(COUNT * 3);
  const offsets = new Float32Array(COUNT);
  const colors = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    base[i3] = (Math.random() - 0.5) * 26;
    base[i3 + 1] = (Math.random() - 0.5) * 15;
    base[i3 + 2] = (Math.random() - 0.5) * 6;
    offsets[i] = Math.random() * Math.PI * 2;
    const g = 0.5 + Math.random() * 0.35;
    colors[i3] = g;
    colors[i3 + 1] = g;
    colors[i3 + 2] = g;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Static frame under reduced motion
  if (reduced) {
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = base[i3];
      positions[i3 + 1] = base[i3 + 1];
      positions[i3 + 2] = base[i3 + 2];
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    return;
  }

  let t = 0;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  if (finePointer) {
    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }

  let running = true;
  new IntersectionObserver((entries) => {
    running = entries[0].isIntersecting;
  }, { threshold: 0 }).observe(hero);

  function tick() {
    if (running) {
      t += 0.006;
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        pos[i3] = base[i3];
        pos[i3 + 1] = base[i3 + 1] + Math.sin(t * 1.4 + offsets[i]) * 0.5;
        pos[i3 + 2] = base[i3 + 2];
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = currentX * 0.7;
      points.rotation.x = currentY * 0.5;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

window.addEventListener('load', initHero3D);
