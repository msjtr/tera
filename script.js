/* ========================================================= */
/*                                                            */
/*              نظام تفاعل واجهة منصة تيرا (TERA UI JS)       */
/*        إدارة القائمة الجانبية + القوائم الفرعية + التفاعل   */
/*                                                            */
/*        متوافق مع الجوال والتابلت والكمبيوتر                */
/*                                                            */
/* ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

"use strict";

/* ========================================================= */
/*                     تعريف العناصر                          */
/* ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("teraSidebar");
const overlay = document.getElementById("teraOverlay");
const closeBtn = document.getElementById("teraClose");

const submenuParents = document.querySelectorAll(".tera-has-submenu");
const menuLinks = document.querySelectorAll(".tera-menu-link, .tera-submenu a");


/* ========================================================= */
/*                إغلاق جميع القوائم الفرعية                  */
/* ========================================================= */

function closeAllSubmenus(){

submenuParents.forEach(function(item){

item.classList.remove("active");

});

}


/* ========================================================= */
/*                       فتح القائمة                          */
/* ========================================================= */

function openSidebar(){

sidebar.classList.add("active");
overlay.classList.add("active");
menuToggle.classList.add("active");

document.body.classList.add("sidebar-open");

menuToggle.setAttribute("aria-expanded","true");
sidebar.setAttribute("aria-hidden","false");

}


/* ========================================================= */
/*                       إغلاق القائمة                        */
/* ========================================================= */

function closeSidebar(){

sidebar.classList.remove("active");
overlay.classList.remove("active");
menuToggle.classList.remove("active");

document.body.classList.remove("sidebar-open");

menuToggle.setAttribute("aria-expanded","false");
sidebar.setAttribute("aria-hidden","true");

/* إغلاق القوائم الفرعية */

closeAllSubmenus();

}


/* ========================================================= */
/*                     زر فتح القائمة                         */
/* ========================================================= */

if(menuToggle){

menuToggle.addEventListener("click", function(e){

e.stopPropagation();

if(sidebar.classList.contains("active")){

closeSidebar();

}else{

openSidebar();

}

});

}


/* ========================================================= */
/*                      زر الإغلاق                            */
/* ========================================================= */

if(closeBtn){

closeBtn.addEventListener("click", function(e){

e.stopPropagation();
closeSidebar();

});

}


/* ========================================================= */
/*                   الضغط على الخلفية                        */
/* ========================================================= */

if(overlay){

overlay.addEventListener("click", closeSidebar);

}


/* ========================================================= */
/*                      زر ESC                                */
/* ========================================================= */

document.addEventListener("keydown", function(e){

if(e.key === "Escape"){

closeSidebar();

}

});


/* ========================================================= */
/*                     القوائم الفرعية                        */
/* ========================================================= */

submenuParents.forEach(function(parent){

const button = parent.querySelector(".tera-menu-item");

if(!button) return;

button.addEventListener("click", function(e){

e.preventDefault();

parent.classList.toggle("active");

});

});


/* ========================================================= */
/*     التوجيه وإغلاق القائمة عند الضغط على أي رابط           */
/* ========================================================= */

menuLinks.forEach(function(link){

link.addEventListener("click", function(){

closeSidebar();

});

});


/* ========================================================= */
/*                تحسين اللمس في الجوال                       */
/* ========================================================= */

const touchTargets = document.querySelectorAll(
".tera-menu-link, .tera-menu-item, .tera-login-link, .tera-logo-box, .tera-close-btn"
);

touchTargets.forEach(function(el){

el.addEventListener("touchstart", function(){

this.classList.add("touch-active");

});

el.addEventListener("touchend", function(){

setTimeout(()=>{
this.classList.remove("touch-active");
},150);

});

});


/* ========================================================= */
/*                  تحسين أداء الجوال                         */
/* ========================================================= */

if("ontouchstart" in window){

document.body.classList.add("tera-touch-device");

}


/* ========================================================= */
/*               إغلاق القائمة عند تغيير حجم الشاشة           */
/* ========================================================= */

window.addEventListener("resize", function(){

if(window.innerWidth > 1024){

closeSidebar();

}

});


});


/* ========================================================= */
/*                                                            */
/*                 نهاية ملف JavaScript لمنصة تيرا            */
/*                        TERA UI JS                          */
/*                                                            */
/* ========================================================= */
