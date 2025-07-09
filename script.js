document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelectorAll('.content');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  content.forEach(section => observer.observe(section));

  // Add scroll-to-top button
  const scrollBtn = document.createElement('button');
  scrollBtn.textContent = '↑ Top';
  scrollBtn.id = 'scrollTop';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #007acc;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: none;
    z-index: 1000;
  `;
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.getElementById('toggleMode')?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('header')?.classList.toggle('dark-mode');
  document.querySelector('footer')?.classList.toggle('dark-mode');
});

// GSAP animation
gsap.from("header img", {
  duration: 1,
  scale: 0,
  ease: "elastic.out(1, 0.5)"
});
gsap.from("header h1", {
  duration: 1,
  y: -50,
  opacity: 0,
  delay: 0.5
});
gsap.from("nav a", {
  duration: 1,
  y: -20,
  opacity: 0,
  stagger: 0.2,
  delay: 0.8
});

// Mouse parallax effect on gallery
document.querySelectorAll(".gallery-images img").forEach(img => {
  img.addEventListener("mousemove", e => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    img.style.transform = `scale(1.05) translate(${(x - rect.width / 2) / 15}px, ${(y - rect.height / 2) / 15}px)`;
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});
