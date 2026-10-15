
export function initFooterDates() {
    const yearSpan = document.getElementById("currentYear");
    const lastModifiedParagraph = document.getElementById("lastModified");

    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }
    if (lastModifiedParagraph) { lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`; }
}


export function initFormTimestamp() {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toLocaleString();
    }
}


export function initStaticModals() {
    const openButtons = document.querySelectorAll(".open-modal-btn");
    const closeButtons = document.querySelectorAll(".close-modal-btn");

    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) { modal.showModal(); } 
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) { modal.close(); } 
        });
    });
}


export function initVisitorCounter() {
    const visitorDisplay = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastChamberVisit");
    const currentTimestamp = Date.now(); 

    if (visitorDisplay) {
        if (!lastVisit) {
            visitorDisplay.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitTimestamp = parseInt(lastVisit, 10);
            const timeDifference = currentTimestamp - lastVisitTimestamp;
            const daysDifference = Math.floor(timeDifference / 86400000);

            if (timeDifference < 86400000) {
                visitorDisplay.textContent = "You're back! Great!";
            } else {
                visitorDisplay.textContent = daysDifference === 1 
                    ? "You last visited 1 day ago." 
                    : `You last visited ${daysDifference} days ago.`;
            }
        }
        localStorage.setItem("lastChamberVisit", currentTimestamp.toString());
    }
}


document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("currentYear") || document.getElementById("lastModified")) {
        initFooterDates();
    }
    if (document.getElementById("timestamp")) {
        initFormTimestamp();
    }
    if (document.querySelectorAll(".open-modal-btn").length > 0) {
        initStaticModals();
    }
    if (document.getElementById("visitor-message")) {
        initVisitorCounter();
    }
});
