# AllStore

AllStore is a front-end online store built for the JavaScript Frameworks course assignment. The application uses the Noroff Online Shop API to display products. Users can browse the catalog, search and sort products, view product details, manage a persistent shopping cart, complete a simulated checkout flow, and submit a validated contact form.

The project is built with Next.js, React, TypeScript and Tailwind CSS.

## Live Site

The project is ready for deployment.

Production link:

```
https://js-frameworks-five.vercel.app/
```

## Features

- Browse products from the Noroff Online Shop API.
- Search products by title.
- Sort products by current price or rating.
- View a single product page with pricing, tags and reviews.
- Show discounted and original prices when a product is on sale.
- Add products to a shopping cart.
- Increase, decrease and remove cart items.
- Keep the cart after a page refresh with localStorage.
- Show the total price based on the current cart state.
- Complete a simulated checkout flow that clears the cart.
- Submit a contact form with client-side validation.
- Show toast notifications for cart actions.
- Use responsive layouts for mobile, tablet and desktop screens.

## Built With

- Next.js
- React
- TypeScript
- Tailwind CSS
- Noroff Online Shop API
- Sonner
- ESLint

## Pages

The project uses the Next.js App Router:

- `/` - Product catalog
- `/products/:id` - Single product page
- `/cart` - Shopping cart
- `/checkout/success` - Checkout confirmation
- `/contact` - Contact form

## Project Structure

```css
src/
  app/
    cart/
    checkout/
    contact/
    products/
    error.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    contact/
    layout/
    products/
  context/
    CartContext.tsx
  services/
    online-shop.ts
  types/
  utils/
```

The project is split into focused modules:

- `app/` contains routes and page-level layouts.
- `components/` contains reusable UI components.
- `context/CartContext.tsx` manages global cart state with Context and useReducer.
- `services/online-shop.ts` contains typed Noroff API requests.
- `types/` contains shared TypeScript types.
- `utils/` contains reusable price and contact-form helpers.

## Getting Started

Clone the repository and install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build the project:

```
npm run build
```

Start the production server after building:

```
npm run start
```

## Scripts

```arduino
npm run dev
npm run build
npm run start
npm run lint
```

## Noroff Online Shop API

This project uses the Noroff Online Shop API for:

- Product list requests
- Single product requests
- Product images, pricing, ratings, tags and reviews

The following endpoints are used:

```
GET https://v2.api.noroff.dev/online-shop
GET https://v2.api.noroff.dev/online-shop/:id
```

## Cart Storage

The shopping cart is stored in localStorage so its contents remain available after a page refresh. Cart state is managed entirely in the browser and is not sent to an external service.

## Deployment

The project can be deployed with Vercel.

Vercel settings:

```
Framework Preset: Next.js
Build Command: npm run build
```

After deployment, test the production URL in an Incognito window.

## Testing

The project was checked with:

```arduino
npm run lint
npm run build
```

Manual testing should also be used for:

- Product loading and error states
- Search and sorting
- Product details and discount pricing
- Add to cart notifications
- Cart quantity controls and item removal
- Cart persistence after refresh
- Checkout confirmation and cart clearing
- Contact form validation and success feedback
- Mobile, tablet and desktop layout

## AI Usage
Entry 1
Tool used: ChatGPT
Date: 17.09.2026
Purpose: Help break the JavaScript Frameworks assignment into smaller development stages.
Outcome: A clear development plan was created for setup, API integration, product pages, search, sorting, cart, checkout and contact form.

Entry 2
Tool used: ChatGPT 
Date: 26.09.2026 
Purpose: Help write setup and deployment documentation. 
Outcome: README sections were organized and written for installation.

Entry 3
Tool used: Github Copilot 
Date: During the project 
Purpose: Automatically create a commits describe in GitHub Desktop app. 
Outcome: Commits describe was created clear and understantable, revorked by myself and pushed.

Entry 4 
Tool used: ChatGPT 
Date: 17.09.2026 
Purpose: Help understand how to work with React Context and useReducer. 
Outcome: I understood how Context and useReducer can be combined to manage the shopping cart state across different pages and components.

Entry 5
Tool used: ChatGPT 
Date: 21.09.2026 
Purpose: Help understand dynamic routing in Next.js for individual product pages. 
Outcome: I understand better how dynamic routes work with the App Router and how a product ID can be used to fetch and display a specific product.

Entry 6
Tool used: ChatGPT
Date: 22.09.2026
Purpose: Help plan the search and sorting functionality for the product catalogue.
Outcome: The functionality was divided into smaller steps and I understood how to filter and sort already fetched product data without making unnecessary API requests.

## Author

Ell10tt (Vladyslav Serikov)
