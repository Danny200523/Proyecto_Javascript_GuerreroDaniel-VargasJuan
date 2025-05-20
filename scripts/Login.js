document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const user = document.getElementById("us").value
    const password = document.getElementById("ps").value

    if (user === "Admin" && password === "admin123" ){
        window.location.href = "./html/admin.html";
    } 
    else {
        window.location.href = "./html/dashboard.html";
    }
})