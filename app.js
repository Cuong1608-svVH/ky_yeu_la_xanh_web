const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("navbar-menu");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
    overlay.classList.toggle("show");
    hamburger.classList.toggle("is-open");
});

overlay.addEventListener("click", () => {
    menu.classList.remove("show");
    overlay.classList.remove("show");
    hamburger.classList.remove("is-open");
});

// Submenu trong mobile: click mũi tên
const dropdownIcons = document.querySelectorAll(".dropdown-toggle-icon");

dropdownIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            e.stopPropagation(); // tránh trigger click lên <a>

            const li = icon.closest(".dropdown");
            li.classList.toggle("open");

            // Đổi hướng mũi tên
            icon.classList.toggle("fa-chevron-down");
            icon.classList.toggle("fa-chevron-up");
        }
    });
});
// ===== SLIDER =====
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');
if (slider && slides.length && prevBtn && nextBtn && dotsContainer){
let currentIndex = 1;   // đang dùng cấu trúc: [clone3, 1, 2, 3, clone1]
const totalSlides = 3;  // số slide GỐC (1,2,3)
const intervalTime = 9000;
let slideInterval;
let dots = [];

// tạo dot = số slide gốc
function createDots() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active'); // slide 1 ban đầu

    dot.dataset.index = i + 1; // index thực của slide gốc (1..3)
    dotsContainer.appendChild(dot);
    dots.push(dot);

    // click dot để nhảy tới slide tương ứng
    dot.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(Number(dot.dataset.index), true);
      startAutoSlide();
    });
  }
}

// index logic 1..3 từ currentIndex (0..4)
function getLogicalIndex(idx) {
  if (idx === 0) return totalSlides;          // clone3
  if (idx === totalSlides + 1) return 1;      // clone1
  return idx;                                 // 1,2,3
}

function updateDots() {
  const logical = getLogicalIndex(currentIndex);  // 1..3
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i + 1 === logical);
  });
}

function showSlide(index, withTransition = true) {
  slider.style.transition = withTransition ? 'transform 0.5s ease' : 'none';
  currentIndex = index;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

function nextSlide() {
  currentIndex++;
  showSlide(currentIndex, true);

  // tới clone slide 1 (index 4) -> nhảy về slide 1 (index 1)
  if (currentIndex === totalSlides + 1) {
    setTimeout(() => {
      showSlide(1, false);
    }, 500);
  }
}

function prevSlide() {
  currentIndex--;
  showSlide(currentIndex, true);

  // tới clone slide 3 (index 0) -> nhảy về slide 3 (index 3)
  if (currentIndex === 0) {
    setTimeout(() => {
      showSlide(totalSlides, false);
    }, 500);
  }
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, intervalTime);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});
// khởi tạo
createDots();
showSlide(1, false);    // đảm bảo hiển thị slide 1 thật, không phải clone3
startAutoSlide();
}

// ===== TABS DỊCH VỤ =====
const tabLinks = document.querySelectorAll('.tab-link');
const tabPanels = document.querySelectorAll('.tab-panel');
if(tabLinks.length && tabPanels.length){
tabLinks.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;

    // bỏ active cũ
    tabLinks.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    // set active mới
    btn.classList.add('active');
    document.getElementById(targetId).classList.add('active');
  });
});
}

// lightbox cho phần xem ảnh album nổi bật 
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
if(lightbox && lightboxImg && lightboxClose) {
document.querySelectorAll('a.js-lightbox').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const src = a.getAttribute('href');

    lightboxImg.src = src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox(){
  lightbox.classList.remove('show');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

// click ra ngoài ảnh để đóng
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// nhấn ESC để đóng
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
});

}

//  chuyển width của map thành 500 để full trong mode mobile 
const fb = document.getElementById("fbPage");
const mq = window.matchMedia("(max-width: 900px)");

function updateFbWidth() {
  if (!fb) return;

  const targetWidth = mq.matches ? 500 : 340;

  const url = new URL(fb.src);
  const currentWidth = url.searchParams.get("width");

  // Không reload iframe nếu width không đổi (đỡ nhấp nháy)
  if (currentWidth === String(targetWidth)) return;

  url.searchParams.set("width", String(targetWidth));
  fb.src = url.toString();
}

// chạy 1 lần lúc load
updateFbWidth();

// chạy lại khi đổi breakpoint (PC <-> mobile)
if (mq.addEventListener) {
  mq.addEventListener("change", updateFbWidth);
} else if (mq.addListener) {
  // fallback cho Safari cũ
  mq.addListener(updateFbWidth);
}

// ---- 
const navbar = document.getElementById("navbar");

let lastY = window.scrollY;
const THRESHOLD = 200;
const DELTA = 6;

function applyTopState() {
  navbar.classList.remove("navbar--floating", "navbar--compact", "navbar--hidden");
  navbar.classList.add("navbar--hero");
  document.body.style.paddingTop = "0px";
}

function applyScrolledState() {
  navbar.classList.remove("navbar--hero");
  navbar.classList.add("navbar--floating", "navbar--compact");
  document.body.style.paddingTop = navbar.offsetHeight + "px";
}

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const diff = y - lastY;

  if (y <= THRESHOLD) {
    applyTopState();
    lastY = y;
    return;
  }

  applyScrolledState();

  if (diff > DELTA) navbar.classList.add("navbar--hidden");
  else if (diff < -DELTA) navbar.classList.remove("navbar--hidden");

  lastY = y;
}, { passive: true });


// album concept (fixed + smooth wrap)
(function () {
  const carousel = document.getElementById('albumCarousel');
  if (!carousel) return;

  const track = document.getElementById('carTrack');
  if (!track) return;

  // Chống init 2 lần
  if (track.dataset.albumInited === '1') return;
  track.dataset.albumInited = '1';

  const prevBtn = carousel.querySelector('.car-btn.prev');
  const nextBtn = carousel.querySelector('.car-btn.next');
  const viewport = carousel.querySelector('.car-viewport');
  if (!prevBtn || !nextBtn || !viewport) return;

  // Viewer
  const viewer = document.getElementById('galleryViewer');
  const gvImg = document.getElementById('gvImg');
  const gvCounter = document.getElementById('gvCounter');
  const gvClose = document.getElementById('gvClose');
  const gvPrev = document.getElementById('gvPrev');
  const gvNext = document.getElementById('gvNext');

  const originalSlides = Array.from(track.querySelectorAll('.car-slide'));
  const total = originalSlides.length;
  if (total < 3) return;

  const CLONE = 3;

  // clone 3 ảnh mỗi đầu
  const headClones = originalSlides.slice(0, CLONE).map(s => s.cloneNode(true));
  const tailClones = originalSlides.slice(-CLONE).map(s => s.cloneNode(true));

  // FIX mất ảnh: dùng prepend để giữ đúng thứ tự 8,9,10 [web:671]
  track.prepend(...tailClones);
  track.append(...headClones);

  let slides = Array.from(track.querySelectorAll('.car-slide'));

  // Mặc định thấy 1-2-3 => center là ảnh thật #2
  let centerIndex = CLONE + 1;
  let isAnimating = false;

  function setCenterClass() {
    slides.forEach(s => s.classList.remove('is-center'));
    slides[centerIndex]?.classList.add('is-center');
  }

  function translateToCenter(animate = true) {
    track.style.transition = animate ? 'transform 420ms ease' : 'none';

    const leftIndex = centerIndex - 1;
    const left = slides[leftIndex]?.offsetLeft ?? 0;

    // round để tránh sai số pixel tích luỹ
    track.style.transform = `translate3d(-${Math.round(left)}px, 0, 0)`;
    setCenterClass();
  }

  function snapToCurrent() {
    // Tắt transition đúng 1 nhịp để teleport không bị giật
    carousel.classList.add('is-snapping');
    translateToCenter(false);

    // Force reflow để browser "chốt" trạng thái no-transition [web:425]
    track.getBoundingClientRect();

    carousel.classList.remove('is-snapping');
  }

  function toRealNumber(idx) {
    let n = (idx - CLONE) + 1;
    while (n < 1) n += total;
    while (n > total) n -= total;
    return n;
  }

  function goNext() {
    if (isAnimating) return;
    isAnimating = true;
    centerIndex += 1;
    translateToCenter(true);
  }

  function goPrev() {
    if (isAnimating) return;
    isAnimating = true;
    centerIndex -= 1;
    translateToCenter(true);
  }

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  // wrap + snap ngay trong transitionend để không "lộ 1 frame" => không giật [web:526]
  track.addEventListener('transitionend', (e) => {
    // transitionend có thể bubble + nhiều property => lọc chặt [web:526][web:538]
    if (e.target !== track) return;
    if (e.propertyName !== 'transform') return;

    if (centerIndex < CLONE) centerIndex += total;
    else if (centerIndex >= slides.length - CLONE) centerIndex -= total;

    snapToCurrent();
    isAnimating = false;
  });

  // init sau khi ảnh load để layout ổn định
  function init() { snapToCurrent(); }

  const imgs = Array.from(track.querySelectorAll('img'));
  let pending = imgs.length;

  if (pending === 0) init();
  else imgs.forEach(img => {
    if (img.complete) {
      if (--pending === 0) init();
    } else {
      img.addEventListener('load', () => { if (--pending === 0) init(); }, { once: true });
      img.addEventListener('error', () => { if (--pending === 0) init(); }, { once: true });
    }
  });

  window.addEventListener('resize', init);

  // (Tuỳ chọn) Swipe mobile – nếu bạn muốn giữ
  let startX = 0, startY = 0, dragging = false;
  viewport.addEventListener('touchstart', (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    dragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    if (!dragging) return;
    dragging = false;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = endX - startX;
    const dy = endY - startY;

    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  }, { passive: true });

  // ===== Viewer =====
  if (viewer && gvImg && gvCounter && gvClose && gvPrev && gvNext) {
    let viewerIndex = 1;

    function renderViewer() {
      const slide = originalSlides[viewerIndex - 1];
      const img = slide.querySelector('img');
      const href = slide.getAttribute('href') || img?.getAttribute('src');
      gvImg.src = href;
      gvImg.alt = img?.alt || `Ảnh ${viewerIndex}`;
      gvCounter.textContent = `${viewerIndex}/${total}`;
    }

    function openViewer(n) {
      viewerIndex = n;
      viewer.classList.add('show');
      viewer.setAttribute('aria-hidden', 'false');
      renderViewer();
    }

    function closeViewer() {
      viewer.classList.remove('show');
      viewer.setAttribute('aria-hidden', 'true');
    }

    function viewerNext() {
      viewerIndex = viewerIndex >= total ? 1 : viewerIndex + 1;
      renderViewer();
    }

    function viewerPrev() {
      viewerIndex = viewerIndex <= 1 ? total : viewerIndex - 1;
      renderViewer();
    }

    track.addEventListener('click', (e) => {
      const a = e.target.closest('a.car-slide');
      if (!a) return;
      e.preventDefault();

      const href = a.getAttribute('href');
      const realIdx = originalSlides.findIndex(s => s.getAttribute('href') === href);
      openViewer(realIdx >= 0 ? realIdx + 1 : toRealNumber(centerIndex));
    });

    gvClose.addEventListener('click', closeViewer);
    gvNext.addEventListener('click', viewerNext);
    gvPrev.addEventListener('click', viewerPrev);

    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) closeViewer();
    });

    document.addEventListener('keydown', (e) => {
      if (!viewer.classList.contains('show')) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') viewerNext();
      if (e.key === 'ArrowLeft') viewerPrev();
    });
  }
})();


// chạy 1 lần lúc load (để refresh trang ở giữa vẫn đúng trạng thái)
if (window.scrollY <= THRESHOLD) applyTopState();
else applyScrolledState();



