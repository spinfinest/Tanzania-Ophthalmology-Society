// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 50
});

// Services Data
const services = [
    { icon: 'fa-eye', title: 'Cataract Surgery', description: 'Advanced surgical procedures for cataract removal with premium lens implants.' },
    { icon: 'fa-glasses', title: 'Glaucoma Treatment', description: 'Comprehensive management and treatment for glaucoma patients.' },
    { icon: 'fa-eye', title: 'LASIK Surgery', description: 'State-of-the-art laser vision correction for freedom from glasses.' },
    { icon: 'fa-child', title: 'Pediatric Ophthalmology', description: 'Specialized eye care for children of all ages.' },
    { icon: 'fa-eye', title: 'Retina Care', description: 'Expert diagnosis and treatment of retinal conditions.' },
    { icon: 'fa-stethoscope', title: 'Comprehensive Exams', description: 'Complete eye health evaluations and vision testing.' }
];

// Populate Services
function populateServices() {
    const servicesContainer = document.getElementById('servicesContainer');
    if (!servicesContainer) return;
    
    services.forEach((service, index) => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6';
        col.setAttribute('data-aos', 'fade-up');
        col.setAttribute('data-aos-delay', (index + 1) * 100);
        
        col.innerHTML = `
            <div class="service-card" onclick="window.selectService(this)">
                <div class="service-icon">
                    <i class="fas ${service.icon}"></i>
                </div>
                <h4 class="mb-3">${service.title}</h4>
                <p class="text-muted mb-0">${service.description}</p>
            </div>
        `;
        servicesContainer.appendChild(col);
    });
}

// Select Service
window.selectService = function(element) {
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Carousel Progress Bar
function initCarouselProgress() {
    const carousel = document.getElementById('heroCarousel');
    const progressBar = document.getElementById('carouselProgress');
    
    if (!carousel || !progressBar) return;
    
    let progressInterval;
    const slideDuration = 5000;
    
    function startProgress() {
        let width = 0;
        progressBar.style.width = '0%';
        
        progressInterval = setInterval(() => {
            width += 1;
            progressBar.style.width = width + '%';
            
            if (width >= 100) {
                width = 0;
            }
        }, slideDuration / 100);
    }
    
    function resetProgress() {
        clearInterval(progressInterval);
        progressBar.style.width = '0%';
        startProgress();
    }
    
    startProgress();
    
    carousel.addEventListener('slide.bs.carousel', resetProgress);
    
    carousel.addEventListener('mouseenter', () => clearInterval(progressInterval));
    carousel.addEventListener('mouseleave', startProgress);
}

// Show Loading Spinner
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('active');
        setTimeout(() => {
            spinner.classList.remove('active');
        }, 800);
    }
}

// Initialize event listeners
function initEventListeners() {
    // Form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            showLoading();
            
            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                reason: document.getElementById('reason').value
            };
            
            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            appointments.push(formData);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            setTimeout(() => {
                alert('Appointment booked successfully! We will contact you shortly.');
                this.reset();
            }, 800);
        });
    }

    // Set minimum date
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Navbar scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('mainNavbar');
        const backToTop = document.getElementById('backToTop');
        
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                
                // Close mobile menu
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            }
        });
    });

    // Active nav link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) return;
        
        showLoading();
        
        let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers')) || [];
        subscribers.push({
            email: email,
            date: new Date().toISOString()
        });
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        
        setTimeout(() => {
            const toast = document.createElement('div');
            toast.className = 'newsletter-toast';
            toast.innerHTML = `
                <div class="toast-content">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>Thank you for subscribing!</strong>
                        <p>You'll receive our latest updates.</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => toast.classList.add('show'), 100);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 5000);
            
            this.reset();
        }, 800);
    });
}

// Image error handling
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
    }
}, true);

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    populateServices();
    initEventListeners();
    initCarouselProgress();
    
    // Log for debugging
    console.log('Website initialized successfully');
});