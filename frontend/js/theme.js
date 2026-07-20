/*Theme Switcher */

const themeButton = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){

    document.body.classList.add("light");

}

themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("theme","light");

    }else{

        localStorage.setItem("theme","dark");

    }

});