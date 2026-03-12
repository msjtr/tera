/* ========================================================= */
/*            نظام تفاعل منصة تيرا - TERA UI JS               */
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
/*       إغلاق القائمة عند الضغط على رابط وتوجيه العميل      */
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
".tera-menu-link, .tera-menu-item, .tera-login-link"
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

});
