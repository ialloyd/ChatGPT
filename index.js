document.querySelector('input[type="submit"]').addEventListener('click', (event) => {
    const email = document.querySelector('input[type="email"]');
    const password = document.querySelector('input[type="password"]');
    
    if(email.checkValidity() && password.checkValidity()) {
        event.preventDefault();
        document.getElementById("spinner").style.display = "";
        setTimeout(() => {
            document.getElementById("spinner").style.display = "none";
            window.location.href = 'gpt.html'
        }, 2000);
    }
});