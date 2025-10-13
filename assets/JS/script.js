
   document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('.nav-link, .menu-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active state animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    /* ========================================
       ========== Start Statistics Counter Animation ==========
       ======================================== */
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Function to animate counter
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 1000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
    /* ========================================
       ========== Start Button Click Effects ==========
       ======================================== */
    
    const buttons = document.querySelectorAll('.btn-visit, .btn-dashboard, .btn-login');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    /* ========================================
       ========== Start Sidebar Menu Active State ==========
       ======================================== */
    
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    /* ========================================
       ========== Start Store Card Interactions ==========
       ======================================== */
    
    const visitButton = document.querySelector('.btn-visit');
    const dashboardButton = document.querySelector('.btn-dashboard');
    
    if (visitButton) {
        visitButton.addEventListener('click', function() {
            // Simulate visiting store
            console.log('زيارة الموقع');
            showNotification('جاري فتح الموقع...', 'success');
        });
    }
    
    if (dashboardButton) {
        dashboardButton.addEventListener('click', function() {
            // Simulate dashboard login
            console.log('سجل دخول لصفحة التحكم');
        });
    }
 
    /* ========================================
       ========== Start Notification System ==========
       ======================================== */
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#5a9367' : '#3498db'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
  
    /* ========================================
       ========== Start Responsive Menu Toggle ==========
       ======================================== */
    
    const createMobileMenu = () => {
        if (window.innerWidth <= 992) {
            const header = document.querySelector('.header-top');
            const mainNav = document.querySelector('.main-nav');
            
            if (!document.querySelector('.menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'menu-toggle';
                menuToggle.innerHTML = '<i class="bi bi-list"></i>';
                menuToggle.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: var(--primary-green);
                    cursor: pointer;
                    display: block;
                `;
                
                header.querySelector('.container-fluid > .d-flex').insertBefore(
                    menuToggle,
                    mainNav
                );
                
                menuToggle.addEventListener('click', function() {
                    mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
                    mainNav.style.position = 'absolute';
                    mainNav.style.top = '100%';
                    mainNav.style.left = '0';
                    mainNav.style.right = '0';
                    mainNav.style.background = 'white';
                    mainNav.style.padding = '1rem';
                    mainNav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                    
                    const navList = mainNav.querySelector('.nav-list');
                    navList.style.flexDirection = 'column';
                    navList.style.gap = '0.5rem';
                });
            }
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    /* ========================================
       ========== Start Loading Animation ==========
       ======================================== */
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });
  
    /* ========================================
       ========== Start Hover Effects for Cards ==========
       ======================================== */
    
    const cards = document.querySelectorAll('.stat-card, .store-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
  
    /* ========================================
       ========== Start Table Row Hover Effect ==========
       ======================================== */
    
    const tableRows = document.querySelectorAll('.orders-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
  
    /* ========================================
       ========== Start Logout Confirmation ==========
       ======================================== */
    
    const logoutLink = document.querySelector('.logout-link');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmed = confirm('هل أنت متأكد من تسجيل الخروج؟');
            if (confirmed) {
                showNotification('جاري تسجيل الخروج...', 'info');
                setTimeout(() => {
                    console.log('تم تسجيل الخروج');
                }, 1500);
            }
        });
    }
    /* ========================================
       ========== Start Dynamic Time Display ==========
       ======================================== */
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ar-EG');
        console.log('الوقت الحالي:', timeString);
    }
    
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
    
    /* ========================================
       ========== Start Scroll to Top Button ==========
       ======================================== */
    
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #5a9367, #8fb896);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 4px 15px rgba(90, 147, 103, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
      /*  ========== Start Add CSS Animations ==========*/
    
    const style = document.createElement('style');
    style.textContent = `
        /* Slide In Animation */
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        /* Slide Out Animation */
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        /* Ripple Effect */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Log success message
    console.log('✅ لوحة التحكم جاهزة ومفعلة بالكامل!');
    
}); // End DOMContentLoaded


/* ========================================
   ========== Start Service Worker (Optional) ==========
   ======================================== */

// Service Worker for PWA (Progressive Web App)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

