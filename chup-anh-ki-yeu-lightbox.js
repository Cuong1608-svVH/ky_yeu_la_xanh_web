// Lightbox riêng cho trang Chup_anh_ki_yeu

(function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
  
    if (!lightbox || !lightboxImg || !lightboxClose) return;
  
    // Gỡ mọi listener cũ bằng cách dùng addEventListener mới cho tất cả link
    document.querySelectorAll('a.js-lightbox').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault(); // không chuyển sang trang ảnh
  
        const src = a.getAttribute('href');
        if (!src) return;
  
        lightboxImg.src = src;
        lightbox.classList.add('show');   // dùng CSS .lightbox.show đang có
        document.body.style.overflow = 'hidden';
      });
    });
  
    function closeLightbox() {
      lightbox.classList.remove('show');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }
  
    lightboxClose.addEventListener('click', closeLightbox);
  
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  })();
  