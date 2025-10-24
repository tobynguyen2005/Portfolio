// Scroll reveal for experiences
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Fade-in từng section
  gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Pin header trong 1.5 viewport đầu
  ScrollTrigger.create({
    trigger: "header",
    start: "top top",
    end: "+=150%",
    pin: true,
    pinSpacing: false,
  });

  const items = document.querySelectorAll(".experience-item");
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.9;
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < trigger)
        item.classList.add("visible");
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // Lightbox functionality
  const overlay = document.getElementById("lightboxOverlay");
  const overlayImg = overlay.querySelector("img");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  const closeBtn = document.getElementById("lightboxClose");
  const imgs = Array.from(document.querySelectorAll(".experience-item img"));
  let currentIndex = 0;

  function showLightbox(index) {
    currentIndex = index;
    overlayImg.src = imgs[index].src;
    overlay.style.display = "flex";
  }

  imgs.forEach((img, i) => {
    img.parentElement.addEventListener("click", () => showLightbox(i));
  });
  prevBtn.addEventListener("click", () => {
    showLightbox((currentIndex - 1 + imgs.length) % imgs.length);
  });
  nextBtn.addEventListener("click", () => {
    showLightbox((currentIndex + 1) % imgs.length);
  });
  closeBtn.addEventListener("click", () => (overlay.style.display = "none"));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  });
});
(function () {
  const imgs = document.querySelectorAll(".parallax-3d");
  const speed = 0.25; // điều chỉnh độ sâu 3D

  function updateParallax() {
    const viewportTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    imgs.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const imgTop = rect.top + viewportTop;
      const imgCenter = imgTop + rect.height / 2;

      // tỉ lệ giữa tâm ảnh và viewport center (-1 .. 1)
      const viewportCenter = viewportTop + viewportHeight / 2;
      const distance = imgCenter - viewportCenter;
      const ratio = distance / (viewportHeight / 2);

      // tính góc xoay và dịch Z
      const rotateY = ratio * 15; // xoay tối đa 15°
      const translateZ = -Math.abs(ratio) * 100; // dịch sâu tối đa 100px

      img.style.transform = `perspective(800px) 
           translateZ(${translateZ}px) 
           rotateY(${rotateY}deg)`;
    });
  }

  // update liên tục khi scroll và resize
  window.addEventListener("scroll", updateParallax, { passive: true });
  window.addEventListener("resize", updateParallax);

  // khởi chạy 1 lần
  updateParallax();
})();
(function () {
  const items = document.querySelectorAll(".hobby-item");
  const windowHeight = window.innerHeight;

  function onScroll() {
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      // Khi top của item <= 80% chiều cao viewport, show
      if (rect.top < windowHeight * 0.8) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
      // Ngoài ra, cập nhật 3D depth tuỳ theo vị trí
      const ratio = (rect.top - windowHeight / 2) / (windowHeight / 2);
      const rotateY = ratio * 20; // xoay tối đa 20°
      const translateZ = -Math.abs(ratio) * 150; // dịch sâu tối đa 150px
      item.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // Khởi chạy 1 lần
  onScroll();
})();
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const volumeSlider = document.getElementById("volume");

  // Set initial volume value
  audio.volume = volumeSlider.value;

  // Update volume when the slider is changed
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
  });

  // Other existing code (play, pause, etc.)
});
