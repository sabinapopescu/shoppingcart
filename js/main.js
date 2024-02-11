(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

// Define your products list (replace this with your actual data)
const products = [
    { name: "Product 1", price: 10.99 },
    { name: "Product 2", price: 15.99 },
    { name: "Product 3", price: 7.99 },
    // Add more products as needed
];

// Function to perform search
function performSearch(query) {
    const searchResultsElement = document.getElementById('searchResults');
    searchResultsElement.innerHTML = ''; // Clear previous search results

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(query.toLowerCase());
    });

    filteredProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price.toFixed(2)}</span>
        `;
        searchResultsElement.appendChild(listItem);
    });

    if (filteredProducts.length === 0) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'text-muted');
        listItem.textContent = 'No results found';
        searchResultsElement.appendChild(listItem);
    }
}

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query !== '') {
        performSearch(query);
    }
});


// Function to render the shopping cart items dynamically
function renderShoppingCartItems() {
    const cartItemsElement = document.getElementById('cartItems');

    // Clear existing items
    cartItemsElement.innerHTML = '';

    // Loop through each item in the shopping cart and create list item for each
    shoppingCartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItemsElement.appendChild(listItem);
    });
}

// Call the function to render the shopping cart items when the page loads
window.addEventListener('DOMContentLoaded', renderShoppingCartItems);