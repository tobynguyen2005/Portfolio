document.addEventListener("DOMContentLoaded", () => {
  // --- GSAP ScrollTrigger Setup ---
  gsap.registerPlugin(ScrollTrigger); // Fade-in từng section

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
  }); // Pin header

  ScrollTrigger.create({
    trigger: "header",
    start: "top top",
    end: "+=150%",
    pin: true,
    pinSpacing: false,
  }); // Scroll reveal cho experience-item (dùng class 'visible' trong CSS)

  const experienceItems = document.querySelectorAll(".experience-item");
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.9;
    experienceItems.forEach((item) => {
      if (item.getBoundingClientRect().top < trigger)
        item.classList.add("visible");
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // --- Lightbox Functionality (ĐÃ GỘP) ---

  const overlay = document.getElementById("lightboxOverlay");
  const overlayImg = overlay.querySelector("img");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  const closeBtn = document.getElementById("lightboxClose"); // Lấy TẤT CẢ các ảnh có thể click vào

  const allLightboxImages = Array.from(
    document.querySelectorAll(
      ".experience-item img, .project-images img, .certificate-item img, .more-certificates img"
    )
  );

  let activeGallery = [];
  let currentIndex = 0;

  function showMainLightbox(gallery, index) {
    activeGallery = gallery;
    currentIndex = index;

    if (index < 0 || index >= gallery.length) return;

    overlayImg.src = gallery[index].src;
    overlay.style.display = "flex";
  } // Gán sự kiện click cho TẤT CẢ ảnh

  allLightboxImages.forEach((img) => {
    img.addEventListener("click", () => {
      let groupImages; // Xác định nhóm ảnh (Experience, Project, hay Certificate)

      if (img.closest(".experience-item")) {
        groupImages = Array.from(
          document.querySelectorAll(".experience-item img")
        );
      } else if (img.closest(".project-images")) {
        groupImages = Array.from(
          img.closest(".project-images").querySelectorAll("img")
        );
      } // Logic cho 2 nhóm chứng chỉ
      else if (img.closest(".certificate-item")) {
        groupImages = Array.from(
          document.querySelectorAll(".certificate-item img")
        );
      } else if (img.closest(".more-certificates")) {
        groupImages = Array.from(
          document.querySelectorAll(".more-certificates img")
        );
      } else {
        return; // Không thuộc nhóm nào thì bỏ qua
      }

      const initialIndex = groupImages.indexOf(img);
      showMainLightbox(groupImages, initialIndex);
    });
  }); // Logic cho nút Next/Prev của Lightbox chính

  prevBtn.addEventListener("click", () => {
    let newIndex =
      (currentIndex - 1 + activeGallery.length) % activeGallery.length;
    showMainLightbox(activeGallery, newIndex);
  });

  nextBtn.addEventListener("click", () => {
    let newIndex = (currentIndex + 1) % activeGallery.length;
    showMainLightbox(activeGallery, newIndex);
  }); // Nút đóng Lightbox chính

  closeBtn.addEventListener("click", () => (overlay.style.display = "none"));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  }); // --- Music Player Controls ---

  const audio = document.getElementById("bg-music");
  const volumeSlider = document.getElementById("volume");
  const playBtn = document.getElementById("play-btn");
  const prevMusicBtn = document.getElementById("prev-btn");
  const nextMusicBtn = document.getElementById("next-btn"); // Volume Control

  audio.volume = volumeSlider.value;
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
  }); // Play/Pause Control

  playBtn.addEventListener("click", () => {
    audio.muted = false;
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
  }); // Seek Control (10s)

  prevMusicBtn.addEventListener("click", () => {
    audio.currentTime -= 10;
  });

  nextMusicBtn.addEventListener("click", () => {
    audio.currentTime += 10;
  }); // --- Zalo Popup Script ---

  const zaloBtn = document.getElementById("zalo-btn");
  const popup = document.getElementById("zaloPopup");
  const closePopupBtn = document.getElementById("closePopup");

  zaloBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("hidden");
  });

  closePopupBtn?.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  popup?.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.add("hidden");
  });
});

// --- Parallax 3D for Projects/Elements (Tên hàm tự gọi) ---
(function () {
  // Thêm class 'project-images img' vào bộ chọn để áp dụng 3D cho ảnh Project
  const imgs = document.querySelectorAll(".parallax-3d, .project-images img");
  const speed = 0.25;

  function updateParallax() {
    const viewportTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    imgs.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const imgTop = rect.top + viewportTop;
      const imgCenter = imgTop + rect.height / 2;

      const viewportCenter = viewportTop + viewportHeight / 2;
      const distance = imgCenter - viewportCenter;
      const ratio = distance / (viewportHeight / 2); // tính góc xoay và dịch Z

      const rotateY = ratio * 15;
      const translateZ = -Math.abs(ratio) * 100;

      img.style.transform = `perspective(800px) 
                                   translateZ(${translateZ}px) 
                                   rotateY(${rotateY}deg)`;
    });
  }

  window.addEventListener("scroll", updateParallax, { passive: true });
  window.addEventListener("resize", updateParallax);
  updateParallax();
})();

// --- Hobbies Scroll Effect (Tên hàm tự gọi) ---
(function () {
  const items = document.querySelectorAll(".hobby-item");
  const windowHeight = window.innerHeight;

  function onScroll() {
    items.forEach((item) => {
      const rect = item.getBoundingClientRect(); // Fade-in effect

      if (rect.top < windowHeight * 0.8) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      } // 3D depth effect

      const ratio = (rect.top - windowHeight / 2) / (windowHeight / 2);
      const rotateY = ratio * 20;
      const translateZ = -Math.abs(ratio) * 150;
      item.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
