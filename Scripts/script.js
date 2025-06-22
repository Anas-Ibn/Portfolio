// Script pour le portfolio d'Anas Ibnouali

// Gestion du défilement fluide pour les liens de navigation
document.querySelectorAll('.navbar a, .footer-links a, .cta-buttons a, .scroll-top button').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Ferme le menu mobile si ouvert
                if (document.getElementById('nav-toggle').checked) {
                    document.getElementById('nav-toggle').checked = false;
                }
            }
        }
    });
});

// Gestion du bouton "retour en haut"
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation des sections au défilement
const animateSections = () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            section.classList.add('animate__fadeIn');
        }
    });
};

window.addEventListener('scroll', animateSections);
window.addEventListener('load', animateSections);

// Navigation fixe au défilement
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajoute la classe 'scrolled' pour changer l'apparence de la navbar
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Cache la navbar lors du défilement vers le bas et l'affiche lors du défilement vers le haut
    if (currentScroll > lastScrollTop && currentScroll > 300) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Gestion des compétences avec animation de chargement
const animateSkills = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        skill.style.width = '0%';
        
        setTimeout(() => {
            skill.style.width = skill.getAttribute('style').split(':')[1];
        }, 300);
    });
};

// Observer pour déclencher l'animation des compétences
const skillsSection = document.querySelector('#competences');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Merci pour votre message ! Je vous répondrai rapidement.");
    contactForm.reset();
  });
}


// Animation de la bannière du header
const animateHeader = () => {
    const header = document.querySelector('header');
    header.classList.add('animate__fadeIn');
};

window.addEventListener('load', animateHeader);

// Filtrage des projets par catégorie (à implémenter si vous ajoutez des filtres)
const setupProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retire la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajoute la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'flex';
                    } else if (!card.classList.contains(filter)) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'flex';
                    }
                });
            });
        });
    }
};

// Mode sombre (optionnel - à implémenter si désiré)
const setupDarkMode = () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Vérifie si l'utilisateur a déjà une préférence
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Applique le mode sombre si c'est activé
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // Gestion du changement
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
};

// Effet parallaxe pour le header (subtil)
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.pageYOffset;
    
    if (header && scrollPosition < header.offsetHeight) {
        header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Initialisation de toutes les fonctionnalités au chargement
document.addEventListener('DOMContentLoaded', function() {
    animateSections();
    setupProjectFilters();
    setupDarkMode();
    
    // Animation de typage pour la page d'accueil (optionnel)
    // Si vous souhaitez ajouter un effet de typage à votre sous-titre ou bio
    
    // Fonction pour initier AOS (Animation On Scroll) si vous décidez de l'utiliser
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});

// Slider d'images générique pour plusieurs sliders sur la même page
function changeSlide(direction, btn) {
  const slider = btn.closest('.image-slider');
  const slides = slider.querySelectorAll('.slide');
  let current = Array.from(slides).findIndex(slide => slide.style.display === 'block');
  slides[current].style.display = 'none';
  let next = (current + direction + slides.length) % slides.length;
  slides[next].style.display = 'block';
}


// Ouvre la lightbox quand on clique sur l'image du slider
document.querySelectorAll('.image-slider .slide img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', function(e) {
    e.stopPropagation();
    openLightbox(this.src, this.alt, this.parentElement.querySelector('p')?.textContent || "");
  });
});

function openLightbox(src, alt, caption) {
  const lightbox = document.getElementById('img-lightbox');
  const img = document.getElementById('img-lightbox-img');
  const captionBox = document.getElementById('img-lightbox-caption');
  img.src = src;
  img.alt = alt;
  captionBox.textContent = caption;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (!e || e.target === document.getElementById('img-lightbox') || e.target.classList.contains('img-lightbox-close')) {
    document.getElementById('img-lightbox').style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Stocke les images du slider pour la navigation lightbox
let currentLightboxIndex = 0;
let lightboxImages = [];

document.querySelectorAll('.image-slider .slide img').forEach((img, idx) => {
  img.style.cursor = 'zoom-in';
  img.setAttribute('data-lightbox-index', idx);
  img.addEventListener('click', function(e) {
    e.stopPropagation();
    // Récupère TOUTES les images du slider parent pour naviguer
    const slides = Array.from(img.closest('.slides').querySelectorAll('img'));
    lightboxImages = slides.map(slideImg => ({
      src: slideImg.src,
      alt: slideImg.alt,
      caption: slideImg.parentElement.querySelector('p')?.textContent || ""
    }));
    currentLightboxIndex = slides.indexOf(img);
    openLightboxImg(currentLightboxIndex);
  });
});

function openLightboxImg(index) {
  const lightbox = document.getElementById('img-lightbox');
  const img = document.getElementById('img-lightbox-img');
  const captionBox = document.getElementById('img-lightbox-caption');
  const {src, alt, caption} = lightboxImages[index];
  img.src = src;
  img.alt = alt;
  captionBox.textContent = caption;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (!e || e.target === document.getElementById('img-lightbox') || e.target.classList.contains('img-lightbox-close')) {
    document.getElementById('img-lightbox').style.display = 'none';
    document.body.style.overflow = '';
  }
}

function lightboxSlide(direction, event) {
  event.stopPropagation();
  currentLightboxIndex = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
  openLightboxImg(currentLightboxIndex);
}

// Fermer la lightbox en cliquant à côté
document.getElementById('img-lightbox').addEventListener('click', function(e){
  if (e.target === this) closeLightbox();
});

