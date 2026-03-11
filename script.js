/* ========================================================= */
/*           نظام القائمة الجانبية - TERA Sidebar            */
/* ========================================================= */

(function(){

const menuBtn = document.querySelector(".tera-menu-toggle");
const sidebar = document.querySelector(".tera-sidebar");
const overlay = document.querySelector(".tera-overlay");
const closeBtn = document.querySelector(".tera-close-btn");

if(!menuBtn || !sidebar) return;


/* فتح القائمة */

function openSidebar(){

sidebar.classList.add("active");

if(overlay) overlay.classList.add("active");

menuBtn.classList.add("active");

document.body.classList.add("sidebar-open");

}


/* إغلاق القائمة */

function closeSidebar(){

sidebar.classList.remove("active");

if(overlay) overlay.classList.remove("active");

menuBtn.classList.remove("active");

document.body.classList.remove("sidebar-open");

}


/* زر القائمة */

menuBtn.addEventListener("click",function(){

if(sidebar.classList.contains("active")){

closeSidebar();

}else{

openSidebar();

}

});


/* زر الإغلاق */

if(closeBtn){

closeBtn.addEventListener("click",closeSidebar);

}


/* الضغط خارج القائمة */

if(overlay){

overlay.addEventListener("click",closeSidebar);

}


/* إغلاق عند اختيار رابط */

document.querySelectorAll(".tera-menu-link").forEach(link=>{

link.addEventListener("click",closeSidebar);

});


/* القوائم الفرعية */

document.querySelectorAll(".tera-has-submenu").forEach(item=>{

item.addEventListener("click",function(){

this.classList.toggle("active");

});

});


/* زر ESC للإغلاق */

document.addEventListener("keydown",function(e){

if(e.key === "Escape"){

closeSidebar();

}

});


})();
