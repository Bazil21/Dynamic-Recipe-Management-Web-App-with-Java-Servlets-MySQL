document.getElementById('resetPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (newPassword === "" || confirmPassword === "") {
        errorMessage.textContent = "Please fill out all fields.";
        errorMessage.style.display = "block";
    } else if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.style.display = "block";
    } else{
        errorMessage.style.display = "none";
        alert("Password reset successful!");
        document.getElementById('resetPasswordForm').reset();
        window.location.href = "login_signup.html";
    }
});