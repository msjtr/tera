/* ========================================================= */
/*                     نظام TERA Core                        */
/*                 النسخة المحسنة للجوال                    */
/* ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

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

if(!sidebar || !overlay || !menuToggle) return;

sidebar.classList.add("active");
overlay.classList.add("active");
menuToggle.classList.add("active");

document.body.classList.add("sidebar-open");

sidebar.setAttribute("aria-hidden","false");
menuToggle.setAttribute("aria-expanded","true");

}

/* ===================================================== */
/*                 إغلاق القائمة الجانبية                 */
/* ===================================================== */

function closeSidebar() {

if(!sidebar || !overlay || !menuToggle) return;

sidebar.classList.remove("active");
overlay.classList.remove("active");
menuToggle.classList.remove("active");

document.body.classList.remove("sidebar-open");

sidebar.setAttribute("aria-hidden","true");
menuToggle.setAttribute("aria-expanded","false");

/* إغلاق القوائم الفرعية */

document.querySelectorAll(".tera-has-submenu")
.forEach(item => item.classList.remove("active"));

}

/* ===================================================== */
/*              تبديل حالة القائمة (فتح / إغلاق)         */
/* ===================================================== */

function toggleSidebar(e){

e.preventDefault();

if(sidebar.classList.contains("active")){
closeSidebar();
}else{
openSidebar();
}

}

/* ===================================================== */
/*                     زر القائمة                         */
/* ===================================================== */

if(menuToggle && sidebar){

menuToggle.addEventListener("click", toggleSidebar);
menuToggle.addEventListener("touchstart", toggleSidebar);

}

/* ===================================================== */
/*                    زر الإغلاق                         */
/* ===================================================== */

if(closeBtn){

closeBtn.addEventListener("click", closeSidebar);
closeBtn.addEventListener("touchstart", closeSidebar);

}

/* ===================================================== */
/*                 إغلاق بالضغط على الخلفية               */
/* ===================================================== */

if(overlay){

overlay.addEventListener("click", closeSidebar);
overlay.addEventListener("touchstart", closeSidebar);

}

/* ===================================================== */
/*                     زر ESC                             */
/* ===================================================== */

document.addEventListener("keydown", function(e){

if(e.key === "Escape" && sidebar && sidebar.classList.contains("active")){
closeSidebar();
}

});

/* ===================================================== */
/*                   القوائم الفرعية                      */
/* ===================================================== */

document.querySelectorAll(".tera-has-submenu > .tera-menu-item")
.forEach(button => {

button.addEventListener("click", toggleSubmenu);
button.addEventListener("touchstart", toggleSubmenu);

function toggleSubmenu(e){

e.preventDefault();

const parent = button.parentElement;

document.querySelectorAll(".tera-has-submenu")
.forEach(item => {

if(item !== parent){
item.classList.remove("active");
}

});

parent.classList.toggle("active");

}

});

/* ===================================================== */
/*        إغلاق القائمة عند الضغط على أي رابط             */
/* ===================================================== */

document.querySelectorAll(
".tera-menu-link, .tera-submenu a, .tera-login-link"
).forEach(link => {

link.addEventListener("click", closeSidebar);
link.addEventListener("touchstart", closeSidebar);

});

/* ===================================================== */
/*              قراءة ارتفاع الهيدر تلقائياً              */
/* ===================================================== */

function updateHeaderHeight(){

if(!header) return;

document.documentElement.style.setProperty(
"--header-height",
header.offsetHeight + "px"
);

}

window.addEventListener("load", updateHeaderHeight);
window.addEventListener("resize", updateHeaderHeight);

/* ===================================================== */
/*                 تقليص الهيدر عند النزول                 */
/* ===================================================== */

window.addEventListener("scroll", function(){

if(!header) return;

if(window.scrollY > 40){
header.classList.add("scrolled");
}else{
header.classList.remove("scrolled");
}

});

/* ===================================================== */
/*             تفعيل نظام اللمس للجوال بالكامل             */
/* ===================================================== */

document.addEventListener("touchstart", function(){}, true);

});

/* ========================================================= */
/*                 نهاية نظام TERA JavaScript               */
/* ========================================================= */
