const filter_btns = document.querySelectorAll(".filter-btn");
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const footer_input = document.querySelector(".footer-input");
const hamburger_menu = document.querySelector(".hamburger-menu");
const navbar = document.querySelector("header nav");
const links = document.querySelectorAll(".links a");

footer_input.addEventListener("focus", () => {
  footer_input.classList.add("focus");
});

footer_input.addEventListener("blur", () => {
  if (footer_input.value != "") return;
  footer_input.classList.remove("focus");
});

function closeMenu() {
  navbar.classList.remove("open");
  document.body.classList.remove("stop-scrolling");
}

hamburger_menu.addEventListener("click", () => {
  if (!navbar.classList.contains("open")) {
    navbar.classList.add("open");
    document.body.classList.add("stop-scrolling");
  } else {
    closeMenu();
  }
});

links.forEach((link) => link.addEventListener("click", () => closeMenu()));

filter_btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter_btns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    let filterValue = btn.dataset.filter;

    $(".grid").isotope({ filter: filterValue });
  })
);

$(".grid").isotope({
  itemSelector: ".grid-item",
  layoutMode: "fitRows",
  transitionDuration: "0.6s",
});

window.addEventListener("scroll", () => {
  skillsEffect();
  countUp();
});

function checkScroll(el) {
  let rect = el.getBoundingClientRect();
  if (window.innerHeight >= rect.top + el.offsetHeight) return true;
  return false;
}

function skillsEffect() {
  if (!checkScroll(skills_wrap)) return;
  skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

function countUp() {
  if (!checkScroll(records_wrap)) return;
  records_numbers.forEach((numb) => {
    const updateCount = () => {
      let currentNum = +numb.innerText;
      let maxNum = +numb.dataset.num;
      let speed = 100;
      const increment = Math.ceil(maxNum / speed);

      if (currentNum < maxNum) {
        numb.innerText = currentNum + increment;
        setTimeout(updateCount, 1);
      } else {
        numb.innerText = maxNum;
      }
    };

    setTimeout(updateCount, 400);
  });
}

var mySwiper = new Swiper(".swiper-container", {
  speed: 1100,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});

// Handle project iframes and source code links
document.addEventListener('DOMContentLoaded', function() {
  // Get all project iframes
  const projectIframes = document.querySelectorAll('.project-image iframe');
  
  // Add loading indicator for iframes
  projectIframes.forEach(iframe => {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'iframe-loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div><p>Loading live demo...</p>';
    
    // Insert overlay before iframe
    iframe.parentNode.insertBefore(loadingOverlay, iframe);
    
    // Hide overlay when iframe loads
    iframe.addEventListener('load', function() {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        loadingOverlay.remove();
      }, 500);
    });
  });
  
  // Get all source code links
  const sourceCodeLinks = document.querySelectorAll('.project-links a:nth-child(2)');
  
  // Add click event listener to source code links
  sourceCodeLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Check if the link has a valid href (not #)
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Source code repository is not yet available. Please check back later!');
      }
    });
  });
});

// Add interactive effect to the About section image
document.addEventListener('DOMContentLoaded', function() {
  const aboutSection = document.querySelector('.about');
  const aboutImage = document.querySelector('.about .column-2.image');
  const imageWrapper = document.querySelector('.about .image-wrapper');
  const profileImg = document.querySelector('.about .profile-img');
  
  if (aboutSection && aboutImage && imageWrapper && profileImg) {
    // Store initial properties for reset
    const initialTransform = 'translate(0, 0)';
    
    // Parallax effect on mouse move
    aboutSection.addEventListener('mousemove', function(e) {
      // Only apply effect if screen is large enough
      if (window.innerWidth > 768) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Get section boundaries
        const rect = aboutSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate displacement based on mouse position relative to center
        const displacementX = (mouseX - centerX) / 30;
        const displacementY = (mouseY - centerY) / 30;
        
        // Apply transformations for parallax effect
        aboutImage.style.transform = `translate(${displacementX * 0.3}px, ${displacementY * 0.3}px)`;
        imageWrapper.style.transform = `translate(${displacementX * 0.5}px, ${displacementY * 0.5}px)`;
        profileImg.style.transform = `translate(${displacementX * 0.2}px, ${displacementY * 0.2}px)`;
        
        // Use CSS variables to control the pseudo-element positions
        aboutImage.style.setProperty('--moveX', `${-displacementX * 1.5}px`);
        aboutImage.style.setProperty('--moveY', `${-displacementY * 1.5}px`);
      }
    });
    
    // Reset position when mouse leaves the section
    aboutSection.addEventListener('mouseleave', function() {
      aboutImage.style.transform = initialTransform;
      imageWrapper.style.transform = initialTransform;
      profileImg.style.transform = initialTransform;
      aboutImage.style.setProperty('--moveX', '0px');
      aboutImage.style.setProperty('--moveY', '0px');
    });
  }
});

// Handle contact form submission and EmailJS integration
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  emailjs.init("fufK2NJQ92bvpbrYy");
  
  // Log EmailJS initialization for debugging
  console.log("EmailJS initialized with public key");
  
  // Add test button for direct debugging
  const contactSection = document.querySelector('.contact-form');
  if (contactSection) {
    const testButton = document.createElement('button');
    testButton.type = 'button';
    testButton.className = 'btn';
    testButton.style.marginTop = '10px';
    testButton.style.backgroundColor = '#555';
    testButton.innerHTML = 'Test EmailJS Connection';
    testButton.onclick = function() {
      testEmailJSConnection();
    };
    contactSection.appendChild(testButton);
  }
  
  // Get form elements
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;
      
      // Get form values
      const firstName = document.getElementById('from_name').value.trim();
      const lastName = document.getElementById('last_name').value.trim();
      const email = document.getElementById('from_email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Validate required fields
      if (!firstName || !lastName || !email || !message) {
        formStatus.innerHTML = 'Please fill in all required fields.';
        formStatus.className = 'error';
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        return;
      }
      
      // Prepare email parameters - simplify to ensure delivery
      const templateParams = {
        to_name: "Ayush",
        from_name: firstName + " " + lastName,
        from_email: email,
        phone: phone || "Not provided",
        message: message,
        reply_to: email,
        email_to: "ayushjaiswal0971@gmail.com"
      };
      
      console.log("Attempting to send email with parameters:", JSON.stringify(templateParams));
      
      // Show alert to verify the function is being called
      console.log("Sending to: " + templateParams.email_to + " using template: template_qiwpnkf");
      
      // Send email using EmailJS - using correct template and service IDs
      emailjs.send('service_wevfrbj', 'template_qiwpnkf', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          
          // Show success message
          formStatus.innerHTML = 'Thank you! Your message has been sent successfully.';
          formStatus.className = 'success';
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          
          // Hide success message after 5 seconds
          setTimeout(function() {
            formStatus.className = '';
          }, 5000);
        }, function(error) {
          console.error('FAILED...', error);
          
          // Show error message with more details
          formStatus.innerHTML = 'Oops! Something went wrong. Please try again later. Error: ' + error.text;
          formStatus.className = 'error';
          
          // Reset button
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
          
          // Hide error message after 8 seconds
          setTimeout(function() {
            formStatus.className = '';
          }, 8000);
        });
    });
  }
});

// Function to test EmailJS connection
function testEmailJSConnection() {
  // Show feedback in the UI
  const formStatus = document.getElementById('form-status');
  if (formStatus) {
    formStatus.innerHTML = 'Testing EmailJS connection...';
    formStatus.className = 'success';
    formStatus.style.display = 'block';
  }
  
  const testParams = {
    to_name: "Ayush",
    from_name: "Test User",
    from_email: "test@example.com",
    phone: "1234567890",
    message: "This is a test message to verify EmailJS connection. Sent at: " + new Date().toLocaleString(),
    reply_to: "test@example.com",
    email_to: "ayushjaiswal0971@gmail.com"
  };
  
  console.log("Testing EmailJS connection with parameters:", JSON.stringify(testParams));
  console.log("Service ID: service_wevfrbj, Template ID: template_qiwpnkf");
  
  emailjs.send('service_wevfrbj', 'template_qiwpnkf', testParams)
    .then(function(response) {
      console.log('TEST SUCCESS!', response.status, response.text);
      alert('EmailJS test successful! Check your email inbox for ayushjaiswal0971@gmail.com. Response status: ' + response.status);
      
      if (formStatus) {
        formStatus.innerHTML = 'Test email sent successfully! Check your inbox at ayushjaiswal0971@gmail.com';
        formStatus.className = 'success';
        
        // Hide message after 10 seconds
        setTimeout(function() {
          formStatus.className = '';
        }, 10000);
      }
    }, function(error) {
      console.error('TEST FAILED...', error);
      alert('EmailJS test failed! Error: ' + error.text);
      
      if (formStatus) {
        formStatus.innerHTML = 'Test failed! Error: ' + error.text;
        formStatus.className = 'error';
        
        // Hide message after 10 seconds
        setTimeout(function() {
          formStatus.className = '';
        }, 10000);
      }
    });
}

// Parallax effect for images and shapes
const parallaxElements = document.querySelectorAll('.parallax');
const shapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });

    shapes.forEach(shape => {
        const speed = 0.2;
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Image hover effect with cursor tracking
document.querySelectorAll('.gallery-image').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Progressive image loading
function loadImage(img) {
    const lowQuality = img.dataset.lowres;
    const highQuality = img.dataset.src;

    if (lowQuality && highQuality) {
        // Load low quality image first
        const tempImage = new Image();
        tempImage.src = lowQuality;
        tempImage.onload = () => {
            img.src = lowQuality;
            img.classList.add('blur');

            // Then load high quality image
            const highQualityImage = new Image();
            highQualityImage.src = highQuality;
            highQualityImage.onload = () => {
                img.src = highQuality;
                img.classList.remove('blur');
            };
        };
    }
}

// Scroll progress indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.transform = `scaleX(${scrolled / 100})`;
});

// Smooth section reveal on scroll
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                transitionElement.classList.add('active');
                
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        transitionElement.classList.remove('active');
                    }, 500);
                }, 300);
            }
        });
    });
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add proper ARIA labels to interactive elements
    const interactiveElements = document.querySelectorAll('.interactive');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
            const label = element.textContent.trim() || element.getAttribute('title');
            if (label) {
                element.setAttribute('aria-label', label);
            }
        }
    });

    // Handle responsive navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'navigation');
        nav.setAttribute('id', 'navigation');
        
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });

        // Close menu on escape key
        nav.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                menuToggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
            }
        });
    }

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function updateAnimationPreference(e) {
        document.body.classList.toggle('reduce-motion', e.matches);
        
        // Update scroll behavior
        document.documentElement.style.scrollBehavior = e.matches ? 'auto' : 'smooth';
        
        // Update transition durations
        const animatedElements = document.querySelectorAll('.section, .interactive');
        animatedElements.forEach(element => {
            element.style.transitionDuration = e.matches ? '0.01ms' : '0.3s';
        });
    }
    
    prefersReducedMotion.addEventListener('change', updateAnimationPreference);
    updateAnimationPreference(prefersReducedMotion);

    // Responsive image handling
    const updateImageQuality = () => {
        const images = document.querySelectorAll('img[data-src]');
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isSaveData = connection ? connection.saveData : false;
        
        images.forEach(img => {
            if (isSaveData || connection?.type === 'cellular') {
                // Load lower quality images for slow connections or save-data
                img.src = img.dataset.lowres || img.dataset.src;
            } else {
                // Load high quality images for fast connections
                img.src = img.dataset.src;
            }
        });
    };

    // Update image quality when network conditions change
    if ('connection' in navigator) {
        navigator.connection.addEventListener('change', updateImageQuality);
    }
    updateImageQuality();
});

