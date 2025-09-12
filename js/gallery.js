document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.image-grid a');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const imageCounter = document.getElementById('image-counter');

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX;
    let startY;

    function applyTransform() {
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransform();
    }

    galleryImages.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            showImage(currentIndex);
            lightbox.style.display = 'flex';
            resetZoom();
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryImages.length - 1;
        showImage(currentIndex);
        resetZoom();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
        resetZoom();
    });

    function showImage(index) {
        const imageUrl = galleryImages[index].getAttribute('href');
        lightboxImg.setAttribute('src', imageUrl);
        imageCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    }

    lightboxImg.addEventListener('click', function(e) {
        if (!isDragging) {
            const zoomFactor = 1.5;
            if (scale === 1) {
                scale = zoomFactor;
            } else {
                scale = 1;
            }
            applyTransform();
            lightboxImg.style.cursor = (scale > 1) ? 'grab' : 'zoom-in';
        }
    });

    lightboxImg.addEventListener('mousedown', function(e) {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            lightboxImg.style.cursor = 'grabbing';
        }
    });

    lightboxImg.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
    });

    lightboxImg.addEventListener('mouseup', function() {
        isDragging = false;
        lightboxImg.style.cursor = (scale > 1) ? 'grab' : 'zoom-in';
    });

    lightboxImg.addEventListener('mouseleave', function() {
        isDragging = false;
        lightboxImg.style.cursor = (scale > 1) ? 'grab' : 'zoom-in';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            resetZoom();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            resetZoom();
        }
    });
});
