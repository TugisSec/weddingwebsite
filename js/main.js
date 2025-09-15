// Image Modal Functionality
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const closeModal = document.getElementById('closeModal');
        const body = document.body;

        // Open modal when clicking on gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const imageUrl = this.getAttribute('data-image');
                if (imageUrl) {
                    modalImage.src = imageUrl;
                    imageModal.classList.add('active');
                    body.classList.add('modal-open');
                }
            });
        });

        // Close modal functions
        function closeImageModal() {
            imageModal.classList.remove('active');
            body.classList.remove('modal-open');
            setTimeout(() => {
                modalImage.src = '';
            }, 300);
        }

        // Close modal on X button click
        closeModal.addEventListener('click', closeImageModal);

        // Close modal on background click
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                closeImageModal();
            }
        });

        // Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // Auto-changing Hero Image Slider
        const heroSlides = document.querySelectorAll('.hero-image-slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlideIndex = 0;

        function showSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            heroSlides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
            showSlide(currentSlideIndex);
        }

        setInterval(nextSlide, 2000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideIndex = index;
                showSlide(currentSlideIndex);
            });
        });

        // Scroll-triggered animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (entry.target.classList.contains('gallery-section')) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        } else if (entry.target.classList.contains('gallery-item')) {
                            entry.target.classList.add('animate');
                        } else if (entry.target.classList.contains('detail-card')) {
                            entry.target.classList.add('animate');
                        } else if (entry.target.tagName === 'H2') {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        } else if (entry.target.classList.contains('gallery-description')) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        } else if (entry.target.classList.contains('wedding-details')) {
                            entry.target.style.opacity = '1';
                        }
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });

        // Enhanced gallery item animations with staggered delays
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const galleryItems = entry.target.querySelectorAll('.gallery-item');
                    galleryItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe gallery containers
        document.querySelectorAll('.indoor-gallery, .outdoor-gallery, .couple-gallery, .ceremony-gallery').forEach(gallery => {
            galleryObserver.observe(gallery);
        });

        // Detail cards observer
        const detailCardsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.detail-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.1 });

        document.querySelector('.details-grid').addEventListener('mouseenter', function() {
            detailCardsObserver.observe(this);
        }, { once: true });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });

        // Prevent scrolling when menu is open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        