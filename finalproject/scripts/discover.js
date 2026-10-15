
import { initFooterDates } from './main.js';
import { initMobileMenu } from './weather.js';

let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
    // Reutilización segura y limpia de tus funciones globales
    initMobileMenu();
    initFooterDates();

    const jsonURL = "data/places.json";
    loadProducts(jsonURL);
});

async function loadProducts(url) {
    const galleryContainer = document.querySelector(".gallery-container");
    if (!galleryContainer) return;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        allProducts = await response.json();
        
        if (allProducts && allProducts.length > 0) {
            displayProducts(allProducts, galleryContainer);
        } else {
            galleryContainer.innerHTML = `<p class="error-msg">The equipment database is empty.</p>`;
        }
    } catch (error) {
        console.error("Failed to fetch dynamic data:", error);
        galleryContainer.innerHTML = `<p class="error-msg">Error loading products. Please try again later.</p>`;
    }
}

function displayProducts(products, container) {
    container.innerHTML = "";
    
    products.forEach(place => {
        const cardSection = document.createElement("section");
        cardSection.className = "gallery-item"; 

        
        cardSection.innerHTML = `
            <h2>${place.name}</h2>
            <div class="img-wrapper">
                <img src="images/placeholder.webp" 
                     data-src="images/${place.image}" 
                     alt="Visual layout of ${place.name}" 
                     class="lazy-load" 
                     width="300" 
                     height="200" 
                     onerror="this.src='https://placehold.co{encodeURIComponent(place.name)}'">
            </div>
            <figcaption>
                <p class="address">📍 Category: ${place.address}</p>
                <p class="price-tag"><strong>Price:</strong> $${place.price} USD</p>
                <p class="description">${place.description}</p>
                <button type="button" class="learn-more-btn" data-id="${place.id}">More Info</button>
            </figcaption>
        `;
        container.appendChild(cardSection);
    });

    initLazyLoading();
    setupDynamicModals();
}

function setupDynamicModals() {
    const detailButtons = document.querySelectorAll(".learn-more-btn");
    const modal = document.getElementById("productModal"); 
    if (!modal) return;

    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-id"), 10);
            const product = allProducts.find(p => p.id === productId);

            if (product) {
                const modalBody = modal.querySelector(".modal-content");
                if (modalBody) {
                    modalBody.innerHTML = `
                        <h2>${product.name}</h2>
                        <p><strong>Department:</strong> ${product.address}</p>
                        <p><strong>Equipment Code:</strong> PR-00${product.id}</p>
                        <p>${product.description}</p>
                        <p style="font-size: 1.2rem; color: var(--primary-color); margin-top: 15px;">
                            <strong>Direct Investment:</strong> $${product.price} USD
                        </p>
                    `;
                }
                modal.showModal(); 
            }
        });
    });
}

function initLazyLoading() {
    const imagesToLoad = document.querySelectorAll("img.lazy-load");

    if ("IntersectionObserver" in window) {
        const imgObserver = new IntersectionObserver((items, observer) => {
            items.forEach(item => {
                if (item.isIntersecting) {
                    const img = item.target;
                    const srcAttr = img.getAttribute("data-src");
                    if (srcAttr) {
                        img.src = srcAttr;
                        img.onload = () => {
                            img.classList.remove("lazy-load");
                            img.classList.add("loaded");
                        };
                    }
                    imgObserver.unobserve(img); 
                }
            });
        }, { rootMargin: "0px 0px 50px 0px" }); 

        imagesToLoad.forEach(img => imgObserver.observe(img));
    } else {
        imagesToLoad.forEach(img => {
            const srcAttr = img.getAttribute("data-src");
            if (srcAttr) img.src = srcAttr;
        });
    }
}
