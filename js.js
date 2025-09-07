  // ==== Loading animation ====

      // ==== Mobile menu toggle ====
      const mobileToggle = document.getElementById("mobile-toggle");
      const navMenu = document.getElementById("nav-menu");

      function toggleMenu() {
        const isOpen = navMenu.style.display === "flex";
        navMenu.style.display = isOpen ? "none" : "flex";
        navMenu.style.flexDirection = "column";
        navMenu.style.position = "absolute";
        navMenu.style.top = "100%";
        navMenu.style.left = "0";
        navMenu.style.right = "0";
        navMenu.style.background = "white";
        navMenu.style.padding = "1rem";
        navMenu.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
        mobileToggle.setAttribute("aria-expanded", String(!isOpen));
      }
      mobileToggle.addEventListener("click", toggleMenu);

      // Close mobile menu on link click (better UX/SEO crawlable anchors remain)
      navMenu.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", () => {
          if (getComputedStyle(mobileToggle).display !== "none") {
            navMenu.style.display = "none";
            mobileToggle.setAttribute("aria-expanded", "false");
          }
        });
      });

      // Mobil CTA gomb megjelenítése csak mobil nézetben
      function handleMobileCTA() {
        const mobileCTA = document.querySelector(".mobile-cta");
        const mobileToggle = document.getElementById("mobile-toggle");
        if (window.innerWidth <= 920) {
          mobileCTA.style.display = "block";
        } else {
          mobileCTA.style.display = "none";
        }
      }
      window.addEventListener("resize", handleMobileCTA);
      window.addEventListener("load", handleMobileCTA);

      // ==== Navbar scroll effect ====
      window.addEventListener("scroll", function () {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
          navbar.style.background = "rgba(255, 255, 255, 0.98)";
          navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
        } else {
          navbar.style.background = "rgba(255, 255, 255, 0.95)";
          navbar.style.boxShadow = "none";
        }
      });

      // ==== Scroll animations ====
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top <
          (window.innerHeight || document.documentElement.clientHeight) - 60
        );
      }
      function handleScrollAnimations() {
        const fadeElements = document.querySelectorAll(".fade-in");
        fadeElements.forEach((el) => {
          if (isInViewport(el)) el.classList.add("visible");
        });
      }
      window.addEventListener("scroll", handleScrollAnimations, {
        passive: true,
      });
      window.addEventListener("load", handleScrollAnimations);

      // ==== Smooth scrolling is handled by CSS scroll-behavior ====

      // ==== Pricing card hover effects ====
      document.querySelectorAll(".pricing-card").forEach((card) => {
        card.addEventListener("mouseenter", function () {
          if (!this.style.transform.includes("scale(")) {
            this.style.transform = "translateY(-8px)";
            this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
          }
        });
        card.addEventListener("mouseleave", function () {
          if (!this.style.transform.includes("scale(1.03)")) {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "none";
          }
        });
      });

      // ==== Demo analytics pulse ====
      setInterval(() => {
        const analyticsBar = document.querySelector(".analytics-fill");
        if (analyticsBar) {
          const randomWidth = Math.floor(Math.random() * 20) + 70; // 70–90%
          analyticsBar.style.width = randomWidth + "%";
        }
      }, 3000);



      // ==== Prefetch internal anchors for faster nav (where supported) ====
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("mouseenter", () => {
          try {
            a.relList.add("prefetch");
          } catch (e) {}
        });
      });


      console.log("JS loaded");