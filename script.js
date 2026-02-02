$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });

  // Mobile menu toggle
  $('.menu_icon').click(function() {
    $('.header ul').toggleClass('show');
    $(this).toggleClass('active');
  });

  // Close mobile menu when clicking on a link
  $('.header ul li a').click(function() {
    $('.header ul').removeClass('show');
    $('.menu_icon').removeClass('active');
  });

  // Enhanced scroll reveal animations - DISABLED
    /*
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animation elements
    $('.fade-in, .slide-in-left, .slide-in-right, .scale-in').each(function() {
      observer.observe(this);
    });

    // Add animation classes to elements
    $('.profile-photo').addClass('scale-in');
    $('.profile-text').addClass('slide-in-right');
    $('.about-content').addClass('slide-in-left');
    $('.about-skills').addClass('slide-in-right');
    $('.education').addClass('fade-in');
    $('.internship').addClass('fade-in');
    $('.tech-card').addClass('scale-in');
    $('.tech-category').addClass('fade-in');
    $('.contact-title').addClass('fade-in');
    $('.contact form').addClass('scale-in');
    */

    // Make all text visible immediately - ENSURE TEXT IS ALWAYS VISIBLE
    $('.profile-text h5, .profile-text h1, .profile-text p').css({'opacity': '1', 'visibility': 'visible'});
    $('.about-content h4, .about-content ul li').css({'opacity': '1', 'visibility': 'visible'});
    $('.about-skills ul li').css({'opacity': '1', 'visibility': 'visible'});
    $('.education-content .timeline-title, .education-content .timeline-text').css({'opacity': '1', 'visibility': 'visible'});
    $('.tech-card h4, .tech-card p').css({'opacity': '1', 'visibility': 'visible'});
    $('.contact-content .contact-title h4, .contact-content .contact-title p').css({'opacity': '1', 'visibility': 'visible'});
  
    //Initial content revealing js - DISABLED
    /*
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship, .tech-category", {
      origin: "right"
    });
    ScrollReveal().reveal(".tech-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".tech-grid, .contact", {
      origin: "bottom"
    });
    */

  // Enhanced typing effect for hero section
  const typedTextSpan = document.querySelector(".profile-text h1");
  if (typedTextSpan) {
    const textArray = ["Umair Anwari", "Software Engineer", "Web Developer", "Security Researcher"];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentText = textArray[textArrayIndex];
      
      if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 30 : 80;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typeSpeed = 800;
      }

      setTimeout(type, typeSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);
  }

  // Technology cards animation on scroll - DISABLED
    /*
    const techCards = document.querySelectorAll('.tech-card');
    const techObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });

    techCards.forEach(card => {
      techObserver.observe(card);
    });

    // Add custom animation for tech cards
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    */

  // Enhanced contact form handling with EmailJS
  (function() {
    // Initialize EmailJS with your public key
    emailjs.init("CGr65u1Wf3sXn7DTp");
    
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusMessage = document.getElementById('status-message');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Form validation
    function validateForm() {
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      let isValid = true;
      
      // Reset error messages
      document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
      });
      
      // Validate name
      if (name.value.trim().length < 2) {
        document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Validate message
      if (message.value.trim().length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
        isValid = false;
      }
      
      return isValid;
    }
    
    // Show status message
    function showStatus(message, type) {
      statusMessage.textContent = message;
      statusMessage.className = `status-message ${type}`;
      statusMessage.style.display = 'block';
      
      // Auto-hide after 5 seconds for success messages
      if (type === 'success') {
        setTimeout(() => {
          statusMessage.style.display = 'none';
        }, 5000);
      }
    }
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validate form
      if (!validateForm()) {
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-block';
      showStatus('Sending...', 'loading');
      
      try {
        // Send email using EmailJS
        const result = await emailjs.sendForm(
          'service_vov0zgn',    // SERVICE_ID
          'template_musk8vb',    // TEMPLATE_ID
          form
        );
        
        if (result.status === 200) {
          showStatus('Message sent successfully ✅', 'success');
          form.reset();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('EmailJS error:', error);
        showStatus('Failed to send message ❌ Please try again.', 'error');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        
        // Clear loading message after 2 seconds
        setTimeout(() => {
          if (statusMessage.textContent === 'Sending...') {
            statusMessage.style.display = 'none';
          }
        }, 2000);
      }
    });
    
    // Real-time validation
    document.getElementById('name').addEventListener('blur', function() {
      const error = document.getElementById('name-error');
      if (this.value.trim().length < 2) {
        error.textContent = 'Name must be at least 2 characters';
      } else {
        error.textContent = '';
      }
    });
    
    document.getElementById('email').addEventListener('blur', function() {
      const error = document.getElementById('email-error');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
        error.textContent = 'Please enter a valid email address';
      } else {
        error.textContent = '';
      }
    });
    
    document.getElementById('message').addEventListener('blur', function() {
      const error = document.getElementById('message-error');
      if (this.value.trim().length < 10) {
        error.textContent = 'Message must be at least 10 characters';
      } else {
        error.textContent = '';
      }
    });
    
  })();
    
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
  

 