
import { initFooterDates } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
    initFooterDates();

    const displayContainer = document.getElementById("formDataDisplay");
    if (!displayContainer) return;

    const urlParams = new URLSearchParams(window.location.search);

    const requiredFields = [
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "email", label: "Email Address" },
        { key: "phone", label: "Mobile Phone" },
        { key: "organization", label: "Business/Organization" },
        { key: "membership", label: "Selected Membership" },
        { key: "timestamp", label: "Submission Timestamp" }
    ];

    let htmlContent = "<dl class='form-results-list'>";

    requiredFields.forEach(field => {
        let value = urlParams.get(field.key);
        
        if (value) {
            value = decodeURIComponent(value.replace(/\+/g, " "));
            if (field.key === "membership") {
                value = value.toUpperCase();
            }

            htmlContent += `
                <dt><strong>${field.label}:</strong></dt>
                <dd>${value}</dd>
            `;
        } else {
            htmlContent += `
                <dt><strong>${field.label}:</strong></dt>
                <dd class='not-provided'>Not provided</dd>
            `;
        }
    });

    htmlContent += "</dl>";
    displayContainer.innerHTML = htmlContent;
});
