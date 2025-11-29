gsap.registerPlugin(ScrollTrigger);

function revealToSpan() {
  document.querySelectorAll('.reveal').forEach(function (elem) {
    var parent = document.createElement('span');
    var child = document.createElement('span');

    parent.classList.add('parent');
    child.classList.add('child');

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function valueSetters() {
  gsap.set("#home .parent .child", { y: "100%" });
  gsap.set("#home .row img", { opacity: 0 });

  document.querySelectorAll("#Visual path").forEach(function (p) {
    var len = p.getTotalLength();
    p.style.strokeDasharray = len + "px";
    p.style.strokeDashoffset = len + "px";
    gsap.set(p, { opacity: 0 });
  });
}

function animateSvg() {
  gsap.to("#Visual path", {
    strokeDashoffset: 0,
    duration: 2,
    opacity: 1,
    ease: "expo.inOut",
    delay: 0.5
  });
}

function animateHomepage() {
  var t1 = gsap.timeline();

  t1
    .to("#nav", {
      opacity: 1,
      duration: 0.1
    })
    .to("#nav a", {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "expo.inOut",
      delay: -0.1
    })
    .to("#home .parent .child", {
      y: 0,
      stagger: 0.1,
      duration: 2,
      ease: "expo.inOut",
    })
    .to("#home .row img", {
      opacity: 1,
      delay: -0.5,
      ease: "expo.inOut",
      onComplete: function () {
        animateSvg();
      }
    });
}

function initScrollAnimations() {

  gsap.from("#about .section-heading, #about .about-content", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2
  });

  gsap.from("#skills .section-heading", {
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out"
  });

  gsap.from("#skills .skill-card", {
    scrollTrigger: {
      trigger: "#skills",
      start: "top 70%",
    },
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12
  });

  gsap.from("#projects .section-heading", {
    scrollTrigger: {
      trigger: "#projects",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out"
  });

  gsap.from("#projects .project-card", {
    scrollTrigger: {
      trigger: "#projects",
      start: "top 70%",
    },
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.15
  });

  gsap.from("#contact .section-heading, #contact .contact-wrapper", {
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.2
  });
}

function loaderAnimation() {
  var tl = gsap.timeline();

  tl
    .from("#loader .child span", {
      x: 100,
      duration: 1.4,
      stagger: 0.2,
      opacity: 0,
      delay: 1,
      ease: "power3.inOut"
    })
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 1,
      ease: "circ.inOut"
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: "circ.inOut"
    })
    .to("#green", {
      height: "100%",
      duration: 1,
      top: 0,
      delay: -0.5,
      ease: "circ.inOut"
    })
    .to("#green", {
      height: "0%",
      delay: -0.5,
      duration: 1,
      ease: "circ.inOut",
      onComplete: function () {
       
        animateHomepage();
        initScrollAnimations();
      }
    });
}

revealToSpan();
valueSetters();
loaderAnimation();

const time = new Date();
const localTime = time.toLocaleTimeString();
document.getElementById('time').innerHTML = localTime;

const contactForm = document.querySelector('.contact-form');
const contactError = document.getElementById('contact-error');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactError.textContent = "";
    contactError.classList.remove('show');
    contactSuccess.classList.remove('show');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      contactError.textContent = "Please fill in all the fields.";
      contactError.classList.add('show');
      return;
    }

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      contactError.textContent = "Please enter a valid email address.";
      contactError.classList.add('show');
      return;
    }

    const formData = new FormData(contactForm);
    const actionUrl = contactForm.getAttribute('action');

    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactSuccess.classList.add('show');
        contactError.classList.remove('show');

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        setTimeout(() => {
          contactSuccess.classList.remove('show');
        }, 4000);
      } else {
        contactError.textContent = "Something went wrong. Please try again later.";
        contactError.classList.add('show');
      }
    } catch (err) {
      contactError.textContent = "Network error. Please check your connection.";
      contactError.classList.add('show');
    }
  });
}
