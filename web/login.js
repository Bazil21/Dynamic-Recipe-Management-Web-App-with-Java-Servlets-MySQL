let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});


function goToLoginPage(){
    window.location.href = "login.html";
}
function goToForgotPassword() {
    window.location.href = "forgotPassword.html";
}
function goToMainPage() {
    window.location.href = "homepage.html";
}