// Sample photographers data
const photographersData = [
    {
        id: 1,
        name: "Sarah Johnson",
        specialty: "wedding",
        location: "New York, NY",
        rating: 4.9,
        price: "$2,500",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?ixlib=rb-4.0.3&w=400",
        portfolio: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&w=300",
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&w=300"
        ],
        description: "Specializing in romantic wedding photography with 8+ years of experience."
    },
    {
        id: 2,
        name: "Michael Chen",
        specialty: "portrait",
        location: "Los Angeles, CA",
        rating: 4.7,
        price: "$800",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=400",
        portfolio: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=300",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=300"
        ],
        description: "Professional portrait photographer capturing authentic expressions."
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        specialty: "event",
        location: "Chicago, IL",
        rating: 4.8,
        price: "$1,200",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&w=400",
        portfolio: [
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&w=300",
            "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&w=300"
        ],
        description: "Corporate and social event photography with creative storytelling."
    },
    {
        id: 4,
        name: "David Kim",
        specialty: "fashion",
        location: "Miami, FL",
        rating: 4.6,
        price: "$1,800",
        image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&w=400",
        portfolio: [
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&w=300",
            "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&w=300"
        ],
        description: "High-end fashion and commercial photography with artistic vision."
    },
    {
        id: 5,
        name: "Lisa Thompson",
        specialty: "nature",
        location: "Denver, CO",
        rating: 4.9,
        price: "$950",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=400",
        portfolio: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=300",
            "https://images.unsplash.com/photo-1418065460487-3d7ee9b9b5d4?ixlib=rb-4.0.3&w=300"
        ],
        description: "Nature and landscape photography capturing the beauty of the outdoors."
    },
    {
        id: 6,
        name: "James Wilson",
        specialty: "wedding",
        location: "Austin, TX",
        rating: 4.8,
        price: "$2,200",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=400",
        portfolio: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&w=300",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&w=300"
        ],
        description: "Documentary-style wedding photography with a photojournalistic approach."
    }
];

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');
const photographersGrid = document.getElementById('photographersGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const modal = document.getElementById('photographerModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');

let currentFilter = 'all';
let currentSearch = '';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    displayPhotographers(photographersData);
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(button => button.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            filterAndDisplayPhotographers();
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Modal close
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Contact form
    contactForm.addEventListener('submit', handleContactForm);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });
}

// Display photographers
function displayPhotographers(photographers) {
    photographersGrid.innerHTML = '';
    
    if (photographers.length === 0) {
        photographersGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No photographers found matching your criteria.</p>';
        return;
    }

    photographers.forEach(photographer => {
        const card = createPhotographerCard(photographer);
        photographersGrid.appendChild(card);
    });
}

// Create photographer card
function createPhotographerCard(photographer) {
    const card = document.createElement('div');
    card.className = 'photographer-card';
    card.innerHTML = `
        <img src="${photographer.image}" alt="${photographer.name}" class="photographer-image" 
             onerror="this.src='https://via.placeholder.com/400x250?text=Photo+Not+Available'">
        <div class="photographer-info">
            <h3>${photographer.name}</h3>
            <p class="photographer-specialty">${capitalizeFirst(photographer.specialty)} Photography</p>
            <p class="photographer-location">📍 ${photographer.location}</p>
            <div class="photographer-rating">
                <span class="stars">${generateStars(photographer.rating)}</span>
                <span>(${photographer.rating})</span>
            </div>
            <p class="photographer-price">Starting at ${photographer.price}</p>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(photographer));
    return card;
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '⭐';
    }
    
    return stars;
}

// Capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Filter and display photographers
function filterAndDisplayPhotographers() {
    let filteredPhotographers = photographersData;
    
    // Apply specialty filter
    if (currentFilter !== 'all') {
        filteredPhotographers = filteredPhotographers.filter(photographer => 
            photographer.specialty === currentFilter
        );
    }
    
    // Apply search filter
    if (currentSearch) {
        filteredPhotographers = filteredPhotographers.filter(photographer => 
            photographer.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            photographer.location.toLowerCase().includes(currentSearch.toLowerCase()) ||
            photographer.specialty.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    
    displayPhotographers(filteredPhotographers);
}

// Handle search
function handleSearch() {
    currentSearch = searchInput.value.trim();
    filterAndDisplayPhotographers();
}

// Open modal
function openModal(photographer) {
    modalContent.innerHTML = `
        <h2>${photographer.name}</h2>
        <p><strong>Specialty:</strong> ${capitalizeFirst(photographer.specialty)} Photography</p>
        <p><strong>Location:</strong> ${photographer.location}</p>
        <p><strong>Rating:</strong> ${generateStars(photographer.rating)} (${photographer.rating})</p>
        <p><strong>Starting Price:</strong> ${photographer.price}</p>
        <p><strong>About:</strong> ${photographer.description}</p>
        <div style="margin-top: 2rem;">
            <h3>Portfolio Samples</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                ${photographer.portfolio.map(img => 
                    `<img src="${img}" alt="Portfolio" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px;" 
                          onerror="this.src='https://via.placeholder.com/200x200?text=Image+Not+Available'">`
                ).join('')}
            </div>
        </div>
        <div style="margin-top: 2rem; text-align: center;">
            <button style="padding: 15px 30px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem;" 
                    onclick="bookPhotographer('${photographer.name}')">
                Book Now
            </button>
        </div>
    `;
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Book photographer (placeholder function)
function bookPhotographer(photographerName) {
    alert(`Booking request sent to ${photographerName}! They will contact you shortly.`);
    closeModal();
}

// Handle contact form
function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    alert(`Thank you ${name}! Your message has been sent. We'll get back to you at ${email}.`);
    
    // Reset form
    contactForm.reset();
}

// Add loading animation
function showLoading() {
    photographersGrid.innerHTML = '<div style="text-align: center; grid-column: 1 / -1; padding: 2rem;">Loading photographers...</div>';
}

// Add fade-in animation for cards
function addFadeInAnimation() {
    const cards = document.querySelectorAll('.photographer-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Call animation after displaying photographers
const originalDisplayPhotographers = displayPhotographers;
displayPhotographers = function(photographers) {
    originalDisplayPhotographers(photographers);
    setTimeout(addFadeInAnimation, 100);
};
