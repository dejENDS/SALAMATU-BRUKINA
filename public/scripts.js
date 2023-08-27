var burger = document.querySelector(".burger");
var navs = document.querySelector(".mobile_navs");
var image1 = document.querySelector(".compress");
var image2 = document.querySelector(".close");


burger.addEventListener("click", function(){
    image1.classList.toggle("display");
    image2.classList.toggle("display");
    navs.classList.toggle("display");
})
