/* ════════════════════════════════════════════════════════════
   RELOADUX — Interactive Behaviors
   ════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Theme Toggle Logic ───
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ─── Header Scroll Effect ───
    const header = document.getElementById('header');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ─── Mobile Menu Toggle ───
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ─── Accordion ───
    const accordionHeaders = document.querySelectorAll('.accordion__header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion__header--active');
            const currentlyOpen = document.querySelector('.accordion__body--open');

            // Close currently open
            if (currentlyActive && currentlyActive !== header) {
                currentlyActive.classList.remove('accordion__header--active');
            }
            if (currentlyOpen) {
                currentlyOpen.classList.remove('accordion__body--open');
            }

            // Toggle clicked
            header.classList.toggle('accordion__header--active');
            const accordionId = header.getAttribute('data-accordion');
            const panel = document.getElementById(`panel-${accordionId}`);
            if (panel) {
                panel.classList.toggle('accordion__body--open');
            }
        });
    });

    // ─── Scroll Animations ───
    const animateElements = document.querySelectorAll('.animate-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all
        animateElements.forEach(el => el.classList.add('visible'));
    }

    // ─── Section Reveal Animations ───
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(section => {
        // Skip hero (it should be visible immediately)
        if (section.id === 'hero') return;
        section.style.opacity = '0';
        section.style.transform = 'translateY(24px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });

    // ─── Smooth Scroll for Nav Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Blog Card Hover Effect ───
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // ─── Industry Card Tilt Effect ───
    const industryCards = document.querySelectorAll('.industry__card');
    industryCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(600px) rotateX(0deg) rotateY(0deg)';
        });
    });

    // ─── Dashboard Counter Animation ───
    const dashboardDonutValue = document.querySelector('.dashboard__donut-value');
    if (dashboardDonutValue) {
        const targetValue = 3054;
        let counted = false;

        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    let current = 0;
                    const step = targetValue / 60;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= targetValue) {
                            current = targetValue;
                            clearInterval(timer);
                        }
                        dashboardDonutValue.textContent = Math.round(current);
                    }, 16);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        countObserver.observe(dashboardDonutValue);
    }

    // ─── Parallax on CTA Section ───
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        window.addEventListener('scroll', () => {
            const rect = ctaSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = 1 - (rect.bottom / (window.innerHeight + rect.height));
                const beforeEl = ctaSection.querySelector('::before');
                ctaSection.style.backgroundPosition = `center ${progress * 30}%`;
            }
        }, { passive: true });
    }

    // ─── Trust Bar Infinite Scroll Feel (subtle) ───
    const trustLogos = document.querySelectorAll('.trust-bar__logo');
    trustLogos.forEach((logo, i) => {
        logo.style.animationDelay = `${i * 0.1}s`;
    });

});
