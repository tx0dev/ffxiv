const initLightbox = () => {
  document.querySelectorAll(".js-zoomable").forEach((img) => {
    let zoom = 1;
    let currentX = 0;
    let currentY = 0;
    let lastTouchDistance = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function updateTransform() {
      img.style.transform = `translate(${currentX}px, ${currentY}px) scale(${zoom})`;
    }

    // Mouse wheel zoom
    img.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY * -0.002;
      const newZoom = Math.min(Math.max(zoom + delta, 1), 4);

      if (newZoom !== zoom) {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scale = newZoom / zoom;
        zoom = newZoom;
        currentX = x - (x - currentX) * scale;
        currentY = y - (y - currentY) * scale;

        updateTransform();
      }
    });

    // Mouse drag
    img.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
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

    img.addEventListener("mouseup", () => {
      isDragging = false;
    });

    img.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    // Touch events
    img.addEventListener("touchstart", (e) => {
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
    });

    img.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const distance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY,
        );
        const delta = distance - lastTouchDistance;
        lastTouchDistance = distance;

        const oldZoom = zoom;
        zoom = Math.min(Math.max(zoom + delta * 0.01, 1), 4);

        if (zoom !== oldZoom) {
          const rect = img.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          currentX = centerX - (centerX - currentX) * (zoom / oldZoom);
          currentY = centerY - (centerY - currentY) * (zoom / oldZoom);
        }

        updateTransform();
      } else if (e.touches.length === 1 && isDragging) {
        currentX = e.touches[0].clientX - startX;
        currentY = e.touches[0].clientY - startY;
        updateTransform();
      }
    });

    img.addEventListener("touchend", () => {
      isDragging = false;
      lastTouchDistance = 0;
    });

    // Double click/tap to reset
    img.addEventListener("dblclick", () => {
      zoom = 1;
      currentX = 0;
      currentY = 0;
      updateTransform();
    });

    // Reset transform when dialog closes
    img.closest("dialog").addEventListener("close", () => {
      zoom = 1;
      currentX = 0;
      currentY = 0;
      updateTransform();
    });
  });
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLightbox);
} else {
  initLightbox();
}
