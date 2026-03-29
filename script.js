/* ========================================
   CHIFA D'SALÓN CHINO - JavaScript
   Enhanced Parallax & Interaction System
   Inspired by Syncfusion Parallax View concepts:
   - Multi-layer parallax with variable speeds
   - Scroll-bound content animations
   - Depth-aware interactive elements
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // === PERFORMANCE: Detect reduced motion preference ===
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // === LOADER ===
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initAnimations();
        initParallaxSystem();
        initTilt3D();
        initMagneticButtons();
        initCursorGlow();
        initScrollProgress();
    }, 2000);
    document.body.style.overflow = 'hidden';

    // === NAVBAR ===
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link based on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // === BACK TO TOP ===
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === COUNTER ANIMATION ===
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const startTime = Date.now();

            function update() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                if (target >= 1000) {
                    counter.textContent = current.toLocaleString() + '+';
                } else {
                    counter.textContent = current + '+';
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            update();
        });
    }

    // === MENU DATA ===
    const menuData = {
        menus: {
            image: 'images/Menus.webp',
            imageAlt: 'Menús al estilo Salón Chino',
            items: [
                { name: 'Menú con Chaufa', price: 'S/. 18', desc: 'Menú completo al estilo del salón con arroz chaufa' },
                { name: 'Menú con Aeropuerto', price: 'S/. 20', desc: 'Menú completo con aeropuerto de pollo' },
                { name: 'Menú con Combinado', price: 'S/. 20', desc: 'Menú completo con combinado de pollo' },
            ]
        },
        caldos_sopas: {
            image: 'images/CaldoDeGallina.webp',
            imageAlt: 'Caldo de Gallina',
            items: [
                { name: 'Caldo de Gallina Solo', price: 'S/. 8', desc: 'Caldo reconfortante de gallina' },
                { name: 'Caldo de Gallina', price: 'S/. 12', desc: 'Caldo de gallina con presa y acompañamientos' },
                { name: 'Caldo de Gallina Acevichado', price: 'S/. 17', desc: 'Caldo de gallina con toque acevichado' },
                { name: 'Sopa de Kion', price: 'S/. 14', desc: 'Sopa aromática con jengibre fresco y fideos', tags: ['Especialidad'] },
                { name: 'Sopa de Kion Especial', price: 'S/. 17', desc: 'Versión premium con ingredientes extra' },
                { name: 'Sopa de Dieta', price: 'S/. 14', desc: 'Sopa ligera con verduras frescas' },
            ]
        },
        chaufas: {
            image: 'images/Chaufa.webp',
            imageAlt: 'Chaufa',
            items: [
                { name: 'Chaufa de Pollo', price: 'S/. 13', desc: 'Arroz salteado al wok con pollo y huevo' },
                { name: 'Chaufa de Champiñones', price: 'S/. 18', desc: 'Arroz al wok con champiñones frescos' },
                { name: 'Chaufa Especial', price: 'S/. 23', desc: 'Arroz al wok con mix de carnes y verduras' },
                { name: 'Chaufa de Chancho', price: 'S/. 23', desc: 'Arroz salteado con cerdo y vegetales' },
                { name: 'Chaufa de Langostino', price: 'S/. 26', desc: 'Arroz al wok con langostinos frescos', tags: ['Premium'] },
            ]
        },
        combinados: {
            image: 'images/CombinadoDePollo.webp',
            imageAlt: 'Combinado de Pollo',
            items: [
                { name: 'Combinado de Pollo', price: 'S/. 15', desc: 'Arroz chaufa con tallarín y pollo al wok', tags: ['Especialidad'] },
                { name: 'Combinado de Champiñones', price: 'S/. 19', desc: 'Arroz chaufa con tallarín y champiñones' },
                { name: 'Combinado Especial', price: 'S/. 24', desc: 'Mix de carnes con chaufa y tallarín' },
                { name: 'Combinado de Chancho', price: 'S/. 24', desc: 'Cerdo salteado con chaufa y tallarín' },
                { name: 'Combinado de Langostino', price: 'S/. 27', desc: 'Langostinos con chaufa y tallarín', tags: ['Premium'] },
            ]
        },
        aeropuertos: {
            image: 'images/Aeropuerto.webp',
            imageAlt: 'Aeropuerto',
            items: [
                { name: 'Aeropuerto de Pollo', price: 'S/. 15', desc: 'Arroz con fideos, pollo y huevo al wok' },
                { name: 'Aeropuerto de Champiñones', price: 'S/. 19', desc: 'Preparación al wok con champiñones frescos' },
                { name: 'Aeropuerto de Chancho', price: 'S/. 24', desc: 'Cerdo salteado al wok con arroz y fideos' },
                { name: 'Aeropuerto Especial', price: 'S/. 24', desc: 'Mix de carnes con arroz y fideos al wok' },
                { name: 'Aeropuerto de Langostino', price: 'S/. 27', desc: 'Langostinos frescos con arroz y fideos', tags: ['Premium'] },
            ]
        },
        tallarines: {
            image: 'images/TallarinDePollo.webp',
            imageAlt: 'Tallarín de Pollo',
            items: [
                { name: 'Tallarín de Pollo', price: 'S/. 19', desc: 'Fideos salteados al wok con pollo y verduras', tags: ['Especialidad'] },
                { name: 'Tallarín de Champiñones', price: 'S/. 20', desc: 'Fideos al wok con champiñones frescos' },
                { name: 'Tallarín de Chancho', price: 'S/. 24', desc: 'Fideos gruesos con cerdo salteado al wok' },
                { name: 'Tallarín de Langostino', price: 'S/. 27', desc: 'Fideos con langostinos frescos al wok', tags: ['Premium'] },
            ]
        },
        tortillas: {
            image: 'images/TortillaDePollo.webp',
            imageAlt: 'Tortilla de Pollo',
            items: [
                { name: 'Tortilla de Pollo', price: 'S/. 19', desc: 'Tortilla esponjosa con trozos de pollo' },
                { name: 'Tortilla de Champiñones', price: 'S/. 21', desc: 'Tortilla con champiñones frescos salteados' },
                { name: 'Tortilla de Chancho', price: 'S/. 23', desc: 'Tortilla generosa con cerdo sazonado' },
                { name: 'Tortilla de Tres Sabores', price: 'S/. 23', desc: 'Tortilla con pollo, chancho y champiñones' },
                { name: 'Tortilla de Langostino', price: 'S/. 24', desc: 'Tortilla premium con langostinos', tags: ['Premium'] },
            ]
        },
        pollos: {
            image: 'images/PolloBroaster.webp',
            imageAlt: 'Pollo Broaster',
            items: [
                { name: '1/8 Pollo Broster', price: 'S/. 16', desc: 'Pieza de pollo crujiente estilo broster' },
                { name: '1/4 Pollo Broster', price: 'S/. 22', desc: 'Cuarto de pollo crujiente con guarnición' },
                { name: 'Tipakay', price: 'S/. 24', desc: 'Pollo crocante en salsa especial agridulce' },
                { name: 'Chijaukay', price: 'S/. 24', desc: 'Pollo con salsa de ostión y jengibre al wok', tags: ['Especialidad'] },
                { name: 'Limonkay', price: 'S/. 26', desc: 'Pollo en salsa de limón especial del chef' },
                { name: 'Chicharrón de Pollo', price: 'S/. 27', desc: 'Pollo deshuesado de pierna, frito crocante' },
            ]
        },
        chancho_pollo: {
            image: 'images/ChanchoAsadoConPiña.webp',
            imageAlt: 'Chancho Asado con Piña',
            items: [
                { name: 'Chancho Asado con Piña', price: 'S/. 24', desc: 'Cerdo asado tierno con piña caramelizada' },
                { name: 'Chancho Asado con Durazno', price: 'S/. 24', desc: 'Cerdo asado con duraznos en almíbar' },
                { name: 'Chancho Asado con Piña y Durazno', price: 'S/. 26', desc: 'La combinación completa de frutas con cerdo' },
                { name: 'Pollo en Trozos con Piña', price: 'S/. 24', desc: 'Pollo en trozos crujientes con piña' },
                { name: 'Pollo en Trozos con Durazno', price: 'S/. 24', desc: 'Pollo crujiente con duraznos en almíbar' },
                { name: 'Pollo en Trozos con Piña y Durazno', price: 'S/. 26', desc: 'Pollo con la mezcla de frutas' },
                { name: 'Pollo en Trozos con Verdura', price: 'S/. 24', desc: 'Pollo al wok con vegetales frescos' },
                { name: 'Pollo en Trozos con Tallarín Chino', price: 'S/. 24', desc: 'Pollo crujiente sobre fideos chinos' },
            ]
        },
        alitas: {
            image: 'images/AlitasBBQ.webp',
            imageAlt: 'Alitas BBQ',
            items: [
                { name: 'Alitas Picante con Chaufa o Papa', price: 'S/. 26', desc: 'Alitas bañadas en salsa picante' },
                { name: 'Alitas BBQ con Chaufa o Papa', price: 'S/. 26', desc: 'Alitas crujientes con salsa BBQ', tags: ['Especialidad'] },
                { name: 'Alitas Broster', price: 'S/. 26', desc: 'Alitas fritas estilo broster crocantes' },
                { name: 'Alitas BBQ Picante con Chaufa o Papa', price: 'S/. 26', desc: 'Alitas con mezcla de BBQ y picante' },
                { name: 'Chicharrón de Alitas con Piña', price: 'S/. 24', desc: 'Alitas crocantes con piña caramelizada' },
                { name: 'Chicharrón de Alitas con Durazno', price: 'S/. 24', desc: 'Alitas crocantes con duraznos' },
                { name: 'Chicharrón de Alitas con Piña y Durazno', price: 'S/. 26', desc: 'Alitas con la mezcla completa de frutas' },
                { name: 'Chicharrón de Alitas c/ Salsa Limonkay (7 pzas)', price: 'S/. 26', desc: 'Alitas con salsa de limón especial' },
                { name: 'Chicharrón de Alitas c/ Salsa Tamarindo (7 pzas)', price: 'S/. 24', desc: 'Alitas con salsa agridulce de tamarindo' },
                { name: 'Chicharrón de Alitas c/ Salsa Champiñones (7 pzas)', price: 'S/. 24', desc: 'Alitas con cremosa salsa de champiñones' },
                { name: 'Chicharrón de Alitas con Tallarín Chino', price: 'S/. 25', desc: 'Alitas crujientes servidas sobre fideos chinos' },
            ]
        },
        porciones: {
            image: 'images/KamLuWantan.webp',
            imageAlt: 'Kam Lu Wantan',
            items: [
                { name: 'Kam Lu Wantan (porción)', price: 'S/. 36', desc: 'Wantan fritos bañados en salsa agridulce con frutas', tags: ['Familiar'] },
                { name: 'Tallarín Criollo', price: 'S/. 36', desc: 'Porción familiar de tallarín criollo', tags: ['Familiar'] },
                { name: '1/2 Porción de Wantan Frito', price: 'S/. 6', desc: 'Media porción de wantan crocante para picar' },
                { name: '1 Porción de Wantan Frito', price: 'S/. 12', desc: 'Porción completa de wantan frito crocante' },
                { name: '1/2 Porción de Cancha', price: 'S/. 6', desc: 'Cancha crujiente para acompañar' },
                { name: '1 Porción de Cancha', price: 'S/. 12', desc: 'Porción completa de cancha serrana' },
                { name: '1/2 Porción de Chaufa', price: 'S/. 5', desc: 'Media porción de arroz chaufa' },
                { name: '1 Porción de Wantan Rellenos', price: 'S/. 16', desc: 'Wantan rellenos de chancho, pollo y hotdog' },
            ]
        },
        bebidas: {
            image: 'images/JarrasDeRefresco.webp',
            imageAlt: 'Jarras de Refresco',
            items: [
                { name: 'Jarra de Chicha Morada', price: 'S/. 12', desc: 'Jarra de chicha morada natural' },
                { name: 'Jarra de Muña', price: 'S/. 12', desc: 'Jarra de infusión de muña andina' },
                { name: 'Personal (Inka, Coca, Fanta)', price: 'S/. 5', desc: 'Gaseosa personal de tu preferencia' },
                { name: 'Agua Mineral', price: 'S/. 4', desc: 'Agua mineral pura' },
                { name: '1L Inka', price: 'S/. 10', desc: 'Inka Kola de 1 litro' },
                { name: '1.5L (Inka, Coca)', price: 'S/. 12', desc: 'Gaseosa de 1.5 litros' },
                { name: '3L Inka', price: 'S/. 17', desc: 'Inka Kola de 3 litros para compartir' },
                { name: 'Anís', price: 'S/. 4', desc: 'Infusión caliente de anís' },
                { name: 'Manzanilla', price: 'S/. 4', desc: 'Infusión de manzanilla' },
                { name: 'Hierba Luisa', price: 'S/. 4', desc: 'Infusión de hierba luisa' },
                { name: 'Té + Clavo', price: 'S/. 4', desc: 'Té caliente con clavo de olor' },
                { name: 'Café', price: 'S/. 6', desc: 'Café caliente servido al momento' },
                { name: 'Té Verde', price: 'S/. 4', desc: 'Té verde natural' },
            ]
        },
    };

    // === RENDER MENU ===
    const menuGrid = document.getElementById('menu-grid');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const categoryImg = document.getElementById('category-img');

    function renderMenu(category) {
        const cat = menuData[category];
        menuGrid.innerHTML = '';

        // Update category image
        if (categoryImg && cat.image) {
            categoryImg.src = cat.image;
            categoryImg.alt = cat.imageAlt || 'Categoría del menú';
        }

        cat.items.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'menu-item';
            el.style.animationDelay = `${index * 0.05}s`;
            const tags = item.tags ? item.tags.map(t => `<span class="menu-item-tag">${t}</span>`).join('') : '';
            el.innerHTML = `
                <div class="menu-item-info">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-desc">${item.desc}</div>
                    ${tags ? `<div class="menu-item-tags">${tags}</div>` : ''}
                </div>
                <div class="menu-item-price">${item.price}</div>
            `;
            menuGrid.appendChild(el);
        });
    }

    // Initial render
    renderMenu('menus');

    // Tab switching
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            renderMenu(tab.dataset.category);

            // Scroll tabs into view on mobile
            tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // === TESTIMONIAL SLIDER ===
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('slider-dots');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;
    const totalSlides = cards.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.slider-dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    });

    // Auto-slide
    let autoSlide = setInterval(() => {
        goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
    }, 5000);

    // Pause auto-slide on hover
    document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
        }, 5000);
    });

    // === SCROLL REVEAL (Enhanced with stagger) ===
    function initAnimations() {
        // Animate counters when hero is visible
        animateCounters();

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe specialty cards with stagger
        document.querySelectorAll('.specialty-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.1}s`;
            observer.observe(card);
        });

        // Observe sections for general reveal
        document.querySelectorAll('.feature, .info-card, .gallery-item').forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 4) * 0.1}s`;
            observer.observe(el);
        });

        // Observe section headers for parallax-reveal
        document.querySelectorAll('.section-header, .about-text-col, .about-image-col').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ENHANCED PARALLAX & INTERACTION SYSTEM
    // Adapted from Syncfusion Parallax View concepts:
    // - Multi-layer depth with variable scroll speeds
    // - Content-Source binding (scroll ↔ background)
    // - Speed property (0.0–1.0) for layer control
    // ============================================

    function initParallaxSystem() {
        // Layer definitions: each layer has a CSS selector, speed (0-1), and axis
        const parallaxLayers = [
            { selector: '.float-char', speed: 0.15, axis: 'y', scale: false },
            { selector: '.hero-bg-overlay', speed: 0.05, axis: 'y', scale: true },
            { selector: '.hero-image-wrapper', speed: 0.08, axis: 'y', scale: false },
            { selector: '.parallax-bg', speed: 0.4, axis: 'y', scale: false },
            { selector: '.about-image-wrapper', speed: 0.06, axis: 'y', scale: false },
            { selector: '.experience-badge', speed: 0.12, axis: 'y', scale: false },
        ];

        // Gallery depth parallax (each gallery item gets progressive depth)
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, i) => {
            item.setAttribute('data-parallax-speed', (0.03 + (i * 0.015)).toFixed(3));
        });

        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;

            // Multi-layer parallax
            parallaxLayers.forEach(layer => {
                const elements = document.querySelectorAll(layer.selector);
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    // Only animate elements near viewport
                    if (rect.top < vh + 200 && rect.bottom > -200) {
                        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
                        const translateY = centerOffset * layer.speed * -100;

                        if (layer.scale) {
                            const scaleFactor = 1 + Math.abs(centerOffset) * 0.02;
                            el.style.transform = `translateY(${translateY}px) scale(${scaleFactor})`;
                        } else {
                            el.style.transform = `translateY(${translateY}px)`;
                        }
                    }
                });
            });

            // Gallery depth parallax
            galleryItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < vh + 100 && rect.bottom > -100) {
                    const speed = parseFloat(item.getAttribute('data-parallax-speed'));
                    const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
                    const translateY = centerOffset * speed * -80;
                    item.style.transform = `translateY(${translateY}px)`;
                }
            });

            // Parallax quote section – enhanced depth
            const parallaxQuote = document.querySelector('.parallax-quote');
            if (parallaxQuote) {
                const rect = parallaxQuote.getBoundingClientRect();
                if (rect.top < vh && rect.bottom > 0) {
                    const bg = parallaxQuote.querySelector('.parallax-bg');
                    const content = parallaxQuote.querySelector('.parallax-content');
                    const progress = (vh - rect.top) / (vh + rect.height);

                    if (bg) {
                        // Background moves at 0.4x speed (slow layer)
                        bg.style.transform = `translateY(${(progress - 0.5) * -120}px) scale(1.1)`;
                    }
                    if (content) {
                        // Content moves at 0.7x speed (medium layer)
                        content.style.transform = `translateY(${(progress - 0.5) * -30}px)`;
                        content.style.opacity = Math.min(1, Math.max(0, 1 - Math.abs(progress - 0.5) * 2.5));
                    }
                }
            }

            // Parallax divider sections – same multi-layer concept
            document.querySelectorAll('.parallax-divider').forEach(divider => {
                const rect = divider.getBoundingClientRect();
                if (rect.top < vh && rect.bottom > 0) {
                    const bg = divider.querySelector('.parallax-divider-bg');
                    const content = divider.querySelector('.parallax-divider-content');
                    const progress = (vh - rect.top) / (vh + rect.height);

                    if (bg) {
                        // Background at 0.35x speed
                        bg.style.transform = `translateY(${(progress - 0.5) * -100}px) scale(1.15)`;
                    }
                    if (content) {
                        // Content at 0.6x speed with fade
                        content.style.transform = `translateY(${(progress - 0.5) * -25}px)`;
                        content.style.opacity = Math.min(1, Math.max(0, 1 - Math.abs(progress - 0.5) * 2));
                    }
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });

        // Initial call
        updateParallax();
    }

    // === 3D TILT EFFECT ON CARDS ===
    function initTilt3D() {
        const tiltElements = document.querySelectorAll('.specialty-card, .testimonial-card, .info-card');

        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                el.style.transition = 'transform 0.1s ease-out';

                // Dynamic shine effect
                const shine = el.querySelector('.card-shine');
                if (shine) {
                    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,168,83,0.15) 0%, transparent 60%)`;
                }
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            // Add shine overlay
            const shine = document.createElement('div');
            shine.className = 'card-shine';
            el.style.position = 'relative';
            el.appendChild(shine);
        });
    }

    // === MAGNETIC BUTTON EFFECT ===
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .nav-btn, .social-link, .slider-btn');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                btn.style.transition = 'transform 0.15s ease-out';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    // === CURSOR GLOW EFFECT ===
    function initCursorGlow() {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            // Smooth follow with easing
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;

            glow.style.left = `${glowX}px`;
            glow.style.top = `${glowY}px`;

            requestAnimationFrame(animateGlow);
        }

        animateGlow();

        // Hide on touch devices
        if ('ontouchstart' in window) {
            glow.style.display = 'none';
        }
    }

    // === SCROLL PROGRESS BAR ===
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
        document.body.appendChild(progressBar);

        const fill = progressBar.querySelector('.scroll-progress-fill');

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            fill.style.width = `${progress}%`;
        }, { passive: true });
    }
});
