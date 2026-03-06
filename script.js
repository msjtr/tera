/* ========================================================= */
/*                     نظام TERA Core                        */
/* ========================================================= */
/* يحتوي على:                                                */
/* 1- تشغيل القائمة الجانبية                                */
/* 2- القوائم الفرعية                                       */
/* 3- دعم زر ESC                                            */
/* 4- طبقة التعتيم                                          */
/* 5- قراءة ارتفاع الهيدر تلقائياً                          */
/* 6- تقليص الهيدر عند النزول                               */
/* ========================================================= */

(function () {

  /* ===================================================== */
  /*                  عناصر النظام الأساسية                */
  /* ===================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("teraSidebar");
  const overlay = document.getElementById("teraOverlay");
  const closeBtn = document.getElementById("teraClose");
  const header = document.querySelector(".tera-header");


  /* ===================================================== */
  /*                 فتح القائمة الجانبية                   */
  /* ===================================================== */

  function openSidebar() {

    sidebar.classList.add("active");
    overlay.classList.add("active");
    menuToggle.classList.add("active");

    document.body.classList.add("sidebar-open");

    sidebar.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");

    sidebar.focus();

  }


  /* ===================================================== */
  /*                 إغلاق القائمة الجانبية                 */
  /* ===================================================== */

  function closeSidebar() {

    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.classList.remove("active");

    document.body.classList.remove("sidebar-open");

    sidebar.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");

    document.querySelectorAll(".tera-has-submenu")
      .forEach(item => item.classList.remove("active"));

  }


  /* ===================================================== */
  /*                     زر القائمة                         */
  /* ===================================================== */

  if (menuToggle) {

    menuToggle.addEventListener("click", function () {

      if (sidebar.classList.contains("active")) {
        closeSidebar();
      } else {
        openSidebar();
      }

    });

  }


  /* ===================================================== */
  /*                    زر الإغلاق                         */
  /* ===================================================== */

  if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
  }


  /* ===================================================== */
  /*                 إغلاق بالضغط على الخلفية               */
  /* ===================================================== */

  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }


  /* ===================================================== */
  /*                     زر ESC                             */
  /* ===================================================== */

  document.addEventListener("keydown", function (e) {

    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar();
    }

  });


  /* ===================================================== */
  /*                   القوائم الفرعية                      */
  /* ===================================================== */

  document
    .querySelectorAll(".tera-has-submenu > .tera-menu-item")
    .forEach(button => {

      button.addEventListener("click", function () {

        const parent = this.parentElement;

        document
          .querySelectorAll(".tera-has-submenu")
          .forEach(item => {

            if (item !== parent) {
              item.classList.remove("active");
            }

          });

        parent.classList.toggle("active");

      });

    });


  /* ===================================================== */
  /*              إغلاق القائمة عند الضغط على رابط          */
  /* ===================================================== */

  document
    .querySelectorAll(
      ".tera-menu-link, .tera-submenu a, .tera-login-link"
    )
    .forEach(link => {

      link.addEventListener("click", closeSidebar);

    });


  /* ===================================================== */
  /*              قراءة ارتفاع الهيدر تلقائياً              */
  /* ===================================================== */

  function updateHeaderHeight() {

    if (!header) return;

    const root = document.documentElement;

    root.style.setProperty(
      "--header-height",
      header.offsetHeight + "px"
    );

  }

  window.addEventListener("load", updateHeaderHeight);
  window.addEventListener("resize", updateHeaderHeight);
  window.addEventListener("scroll", updateHeaderHeight);


  /* ===================================================== */
  /*                 تقليص الهيدر عند النزول                 */
  /* ===================================================== */

  window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  });


})();

/* ========================================================= */
/*                نهاية نظام TERA Core                       */
/* ========================================================= */
