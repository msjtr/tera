/* ========================================================= */
/*                TERA Sidebar System                        */
/* ========================================================= */

(function(){

const menuBtn = document.querySelector(".tera-menu-toggle");
const sidebar = document.querySelector(".tera-sidebar");
const overlay = document.querySelector(".tera-overlay");
const closeBtn = document.querySelector(".tera-close-btn");

if(!menuBtn || !sidebar) return;


/* ========================= */
/* فتح القائمة */
/* ========================= */

function openSidebar(){

sidebar.classList.add("active");
menuBtn.classList.add("active");

if(overlay) overlay.classList.add("active");

document.body.classList.add("sidebar-open");

}


/* ========================= */
/* إغلاق القائمة */
/* ========================= */

function closeSidebar(){

sidebar.classList.remove("active");
menuBtn.classList.remove("active");

if(overlay) overlay.classList.remove("active");

document.body.classList.remove("sidebar-open");


/* إغلاق جميع القوائم الفرعية */

document.querySelectorAll(".tera-has-submenu").forEach(item=>{
item.classList.remove("active");
});

}


/* ========================= */
/* زر القائمة */
/* ========================= */

menuBtn.addEventListener("click",function(e){

e.stopPropagation();

if(sidebar.classList.contains("active")){

closeSidebar();

}else{

openSidebar();

}

});


/* ========================= */
/* زر الإغلاق */
/* ========================= */

if(closeBtn){

closeBtn.addEventListener("click",function(e){

e.stopPropagation();

closeSidebar();

});

}


/* ========================= */
/* الضغط خارج القائمة */
/* ========================= */

if(overlay){

overlay.addEventListener("click",closeSidebar);

}


/* ========================= */
/* منع الإغلاق أثناء التمرير */
/* ========================= */

let isScrolling = false;

const menuContainer = document.querySelector(".tera-sidebar-menu");

if(menuContainer){

menuContainer.addEventListener("touchmove",function(){

isScrolling = true;

});

menuContainer.addEventListener("touchend",function(){

setTimeout(()=>{
isScrolling = false;
},50);

});

}


/* ========================= */
/* القوائم الفرعية */
/* ========================= */

document.querySelectorAll(".tera-has-submenu > .tera-menu-item").forEach(button=>{

button.addEventListener("click",function(e){

if(isScrolling) return;

e.preventDefault();

const parent = this.parentElement;

/* إغلاق باقي القوائم */

document.querySelectorAll(".tera-has-submenu").forEach(item=>{

if(item !== parent){

item.classList.remove("active");

}

});

parent.classList.toggle("active");

});

});


/* ========================= */
/* إغلاق القائمة عند الضغط على رابط */
/* ========================= */

document.querySelectorAll(".tera-submenu a").forEach(link=>{

link.addEventListener("click",function(){

closeSidebar();

});

});


/* ========================= */
/* زر ESC */
/* ========================= */

document.addEventListener("keydown",function(e){

if(e.key === "Escape"){

closeSidebar();

}

});


})();
