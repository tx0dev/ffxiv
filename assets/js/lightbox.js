const initLightbox = () => {
  document.querySelectorAll(".js-zoomable").forEach((img) => {
    let zoom = 1;
    let currentX = 0;
    let currentY = 0;
    let lastTouchDistance = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Constants for better control
    const MIN_ZOOM = 1;
    const MAX_ZOOM = 4;
    const WHEEL_ZOOM_SPEED = 0.002;
    const PINCH_ZOOM_SPEED = 0.01;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function updateTransform() {
      // Ensure values are finite and numbers
      if (
        !Number.isFinite(currentX) ||
        !Number.isFinite(currentY) ||
        !Number.isFinite(zoom)
      ) {
        console.warn("Invalid transform values detected, resetting...");
        currentX = 0;
        currentY = 0;
        zoom = 1;
      }

      img.style.transform = `translate(${currentX}px, ${currentY}px) scale(${zoom})`;
    }

    function reset() {
      zoom = 1;
      currentX = 0;
      currentY = 0;
      isDragging = false;
      lastTouchDistance = 0;
      updateTransform();
    }

    // Navigation function
    function handleNavigation(direction) {
      const currentIndex = parseInt(img.dataset.galleryIndex);
      const total = parseInt(img.dataset.galleryTotal);

      if (isNaN(currentIndex) || isNaN(total)) return;

      let nextIndex = currentIndex + direction;
      if (nextIndex < 0) nextIndex = total - 1;
      if (nextIndex >= total) nextIndex = 0;

      // Find the next gallery item
      const nextImg = document.querySelector(
        `.gallery__item:nth-child(${nextIndex + 1}) .lightbox__image.js-zoomable`,
      );

      if (nextImg) {
        reset();
        img.src = nextImg.src;
        img.alt = nextImg.alt;
        img.dataset.galleryIndex = nextIndex;
      }
    }

    // Mouse wheel zoom with debounce
    let wheelTimeout;
    img.addEventListener("wheel", (e) => {
      e.preventDefault();

      // Clear previous timeout
      clearTimeout(wheelTimeout);

      const delta = e.deltaY * -WHEEL_ZOOM_SPEED;
      const oldZoom = zoom;
      const newZoom = clamp(zoom + delta, MIN_ZOOM, MAX_ZOOM);

      if (newZoom !== zoom) {
        try {
          const rect = img.getBoundingClientRect();

          // Get mouse position relative to image center
          const imgCenterX = rect.left + rect.width / 2;
          const imgCenterY = rect.top + rect.height / 2;
          const mouseX = e.clientX - imgCenterX;
          const mouseY = e.clientY - imgCenterY;

          // Calculate new position
          const zoomFactor = newZoom / oldZoom;
          currentX = mouseX - (mouseX - currentX) * zoomFactor;
          currentY = mouseY - (mouseY - currentY) * zoomFactor;

          zoom = newZoom;
          updateTransform();
        } catch (error) {
          console.error("Error during zoom:", error);
          reset();
        }
      }

      // Set a timeout to handle the end of zooming
      wheelTimeout = setTimeout(() => {
        if (zoom === MIN_ZOOM) {
          reset();
        }
      }, 150);
    });

    // Touch events with error handling
    img.addEventListener("touchstart", (e) => {
      try {
        if (e.touches.length === 2) {
          e.preventDefault();
          lastTouchDistance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY,
          );
        } else if (e.touches.length === 1) {
          isDragging = true;
          startX = e.touches[0].clientX - currentX;
          startY = e.touches[0].clientY - currentY;
        }
      } catch (error) {
        console.error("Error during touch start:", error);
        reset();
      }
    });

    img.addEventListener("touchmove", (e) => {
      try {
        e.preventDefault();
        if (e.touches.length === 2) {
          const distance = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY,
          );
          const delta = distance - lastTouchDistance;
          lastTouchDistance = distance;

          const oldZoom = zoom;
          zoom = clamp(zoom + delta * PINCH_ZOOM_SPEED, MIN_ZOOM, MAX_ZOOM);

          if (zoom !== oldZoom) {
            const rect = img.getBoundingClientRect();
            const imgCenterX = rect.left + rect.width / 2;
            const imgCenterY = rect.top + rect.height / 2;

            const pinchX =
              (e.touches[0].clientX + e.touches[1].clientX) / 2 - imgCenterX;
            const pinchY =
              (e.touches[0].clientY + e.touches[1].clientY) / 2 - imgCenterY;

            const zoomFactor = zoom / oldZoom;
            currentX = pinchX - (pinchX - currentX) * zoomFactor;
            currentY = pinchY - (pinchY - currentY) * zoomFactor;
          }

          updateTransform();
        } else if (e.touches.length === 1 && isDragging) {
          currentX = e.touches[0].clientX - startX;
          currentY = e.touches[0].clientY - startY;
          updateTransform();
        }
      } catch (error) {
        console.error("Error during touch move:", error);
        reset();
      }
    });

    // Add passive: false to prevent scrolling during touch events
    img.addEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false,
    });

    // Mouse drag with bounds checking
    img.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      img.style.cursor = "grabbing";
      e.preventDefault();
    });

    img.addEventListener("mousemove", (e) => {
      if (isDragging) {
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        updateTransform();
        e.preventDefault();
      }
    });

    // Cleanup handlers
    const cleanup = () => {
      isDragging = false;
      img.style.cursor = "grab";
    };

    img.addEventListener("mouseup", cleanup);
    img.addEventListener("mouseleave", cleanup);
    img.addEventListener("touchend", () => {
      cleanup();
      lastTouchDistance = 0;
    });

    // Double click/tap to reset with debounce
    let dblClickTimeout;
    img.addEventListener("dblclick", () => {
      clearTimeout(dblClickTimeout);
      dblClickTimeout = setTimeout(reset, 0);
    });

    // Navigation event listeners
    const dialog = img.closest("dialog");
    if (dialog) {
      const prevBtn = dialog.querySelector(".lightbox__nav--prev");
      const nextBtn = dialog.querySelector(".lightbox__nav--next");

      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.preventDefault();
          handleNavigation(-1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.preventDefault();
          handleNavigation(1);
        });
      }

      // Add keyboard navigation
      dialog.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handleNavigation(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNavigation(1);
        }
      });

      // Reset transform when dialog closes
      dialog.addEventListener("close", reset);
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(reset, 150);
    });
  });
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLightbox);
} else {
  initLightbox();
}
