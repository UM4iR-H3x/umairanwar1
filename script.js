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

  // Enhanced contact form handling with Formspree
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
      e.preventDefault();
      
      // Add loading state
      const submitBtn = form.querySelector('.submit');
      const originalText = submitBtn.value;
      submitBtn.value = 'Sending...';
      submitBtn.disabled = true;
      
      // Submit to Formspree
      fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
              'Accept': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              msg.innerHTML = "✨ Message sent successfully! I'll get back to you soon.";
              msg.classList.add('show');
              form.reset();
          } else {
              throw new Error('Form submission failed');
          }
      })
      .catch(error => {
          msg.innerHTML = "❌ Oops! Something went wrong. Please try again.";
          msg.classList.add('show');
      })
      .finally(() => {
          submitBtn.value = originalText;
          submitBtn.disabled = false;
          setTimeout(function () {
              msg.innerHTML = "";
              msg.classList.remove('show');
          }, 5000);
      });
  });
    
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
  

 