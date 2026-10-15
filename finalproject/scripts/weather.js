
export function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('primary-nav');
    
    if (menuBtn && navMenu) {
        const hamburgerIcon = menuBtn.querySelector('.icon-hamburger');
        const closeIcon = menuBtn.querySelector('.icon-close');
        
        menuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            if (isOpen) {
                if (hamburgerIcon) hamburgerIcon.style.display = 'none';
                if (closeIcon) closeIcon.style.display = 'block';
            } else {
                if (hamburgerIcon) hamburgerIcon.style.display = 'block';
                if (closeIcon) closeIcon.style.display = 'none';
            }
        });
    }
}




// Ejecución controlada al iniciar
document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    apiFetch();
});
