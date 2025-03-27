function toggleSubmenu() {
    const submenu = document.getElementById("submenu");
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    const submenu = document.getElementById("submenu");
    if (!event.target.matches('.menu-button')) {
        if (submenu.style.display === "block") {
            submenu.style.display = "none";
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {

    function toggleSubmenu() {
        const submenu = document.getElementById("recipes-submenu");
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    }

    window.onclick = function (event) {
        const submenu = document.getElementById("recipes-submenu");
        if (!event.target.matches('.menu-button')) {
            if (submenu && submenu.style.display === "block") {
                submenu.style.display = "none";
            }
        }
    };
});





function submithtml() {
    const submenu = document.getElementById("submenu");
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}



document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const searchQuery = searchInput.value.trim();

        if (searchQuery) {
            window.location.href = `search_ing.html?ingredient=${encodeURIComponent(searchQuery)}`;
        } else {
            alert('Please enter an ingredient!');
        }
    });
});




document.getElementById('newsletter-inline').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('newsletter-email-inline').value;
    const password = document.getElementById('newsletter-password-inline').value;

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    localStorage.setItem('userEmail', email);

    alert('Successfully signed up!');
    //window.location.href = 'submit_recipe.html'; 
});
 


document.getElementById('logout-button').addEventListener('click', async function () {
    const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include'
    });

    if (response.ok) {
        alert('Logged out successfully!');
        localStorage.removeItem('userEmail');
        window.location.href = 'cleaned_main.html';
    } else {
        alert('Failed to logout. Please try again.');
    }
});
