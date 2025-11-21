// Select the container where the trail images will appear
const trailer = document.querySelector(".image-trailer");

// Select all images inside the hidden gallery (these will be cloned)
const images = document.querySelectorAll(".image-item");

// Track which image to use next (loops through the gallery)
let currentImageIndex = 0;

// Track the last mouse position to measure how far the cursor moved
let lastMousePos = { x: 0, y: 0 };

// Track the last time an image was created (prevents too many spawns)
let lastImageTime = Date.now();

// SETTINGS: easy to tweak
const movementThreshold = 100; // minimum pixels mouse must move before creating a new image
const delayBetween = 70;       // minimum time (ms) between creating new images

// Main function: creates one trail image at the mouse position
function createImageTrail(e) {
  // Calculate distance from last spawned image
  const dx = e.clientX - lastMousePos.x;
  const dy = e.clientY - lastMousePos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Don't spawn a new image if mouse hasn’t moved far enough
  if (distance < movementThreshold) return;

  // Don't spawn a new image if not enough time has passed
  const now = Date.now();
  if (now - lastImageTime < delayBetween) return;

  // Clone one of the gallery images
  const image = images[currentImageIndex].cloneNode();

  // Update index to use the next image next time (loops around)
  currentImageIndex = (currentImageIndex + 1) % images.length;

  // Position the image centered on the cursor
  image.style.left = `${e.clientX - 90}px`;
  image.style.top = `${e.clientY - 75}px`;

  // Add the cloned image to the trailer container
  trailer.appendChild(image);

  // Animate the image appearing: scale from 0 → 1, no opacity change
  gsap.fromTo(image, 
    { 
      opacity: 1,             // set to 0 if you want fade in
      scale: 0,               // start scaled down
      rotation: gsap.utils.random(-20, 20) // small random tilt
    },
    { 
      opacity: 1,             // remain fully visible
      scale: 1,               // grow to full size
      duration: 0.6,          // animation duration
      ease: "back.out(2)"     // bouncy entrance
    }
  );

  // Animate the image shrinking out (scale → 0), opacity stays 1
  gsap.to(image, {
    opacity: 1,    // set to 0 if you want the fade out animation
    scale: 0,      // shrink to nothing
    duration: 0.6, // animation duration
    delay: 0.6,    // wait before starting shrink
    ease: "power2.in", // smooth shrinking
    onComplete: () => image.remove() // remove from DOM after animation
  });

  // Save current mouse position & time for next calculation
  lastMousePos = { x: e.clientX, y: e.clientY };
  lastImageTime = now;
}

// Listen for mouse movement and trigger the trail function
document.addEventListener("mousemove", createImageTrail);
