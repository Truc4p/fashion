# LUXE Fashion Website

A professional, modern fashion e-commerce website inspired by Zara's design principles.

## Features

- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Product Grid**: Clean product display with hover effects and quick actions
- **Shopping Cart**: Slide-out cart with add/remove items and quantity control
- **Category Filtering**: Filter products by Woman, Man, Accessories, and New Arrivals
- **Sorting Options**: Sort by featured, price (low to high, high to low), and newest
- **Newsletter Signup**: Email subscription form
- **Professional UI**: Clean typography, modern layout, and smooth animations
- **Local Storage**: Cart persists across browser sessions

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)
- Unsplash Images

## File Structure

```
fashion/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
└── README.md          # Documentation
```

## Getting Started

1. Open `index.html` in a modern web browser
2. No build process or dependencies required
3. Works directly with file:// protocol or any web server

## Features Breakdown

### Header
- Sticky navigation bar
- Logo and main navigation links
- Search, account, and shopping cart icons
- Mobile-responsive hamburger menu

### Hero Section
- Full-width banner with call-to-action
- Professional imagery
- Overlay text with shop button

### Products Section
- Grid layout with 16 sample products
- Product images with hover effects
- Quick add to cart and quick view buttons
- Price display with sale prices
- Category and "New" badges

### Shopping Cart
- Slide-out sidebar cart
- Add/remove items
- Quantity controls
- Real-time total calculation
- Cart count badge in header
- Persistent storage using localStorage

### Footer
- Multi-column layout
- Links to shop categories
- Customer service links
- Social media icons
- Copyright information

### Newsletter
- Email subscription form
- Centered layout with call-to-action

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --text-color: #333333;
    --text-light: #666666;
    --border-color: #e0e0e0;
}
```

### Products
Edit the products array in `script.js`:
```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        category: "woman",
        price: 89.90,
        image: "image-url.jpg",
        badge: "new"
    },
    // Add more products...
];
```

### Typography
Change font in the Google Fonts link and CSS:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Product detail pages
- User authentication
- Checkout process
- Payment integration
- Product search functionality
- Wishlist feature
- Product reviews
- Size selection
- Color variants
- Backend integration

## License

Free to use for personal and commercial projects.

## Credits

- Images: Unsplash
- Icons: Custom SVG icons
- Font: Google Fonts (Inter)
