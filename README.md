# Fresh Roots 🌿

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

**Fresh Roots** is a modern, full-stack e-commerce application designed for selling fresh produce, including staples, fruits, and vegetables. Built with performance and user experience in mind, it features a responsive design, real-time authentication, a comprehensive admin dashboard, and multi-language support.

---

## 🚀 Features

### 🛒 Customer Experience
*   **Product Discovery**: Browse a wide range of fresh products with advanced filtering by category (Staples, Fruits, Vegetables) and real-time search.
*   **User Accounts**: Secure sign-up and login functionality powered by Supabase Authentication.
*   **Shopping Cart**: Dynamic cart management with real-time price calculation and quantity adjustments.
*   **Wishlist**: Save favorite items for future purchase.
*   **Product Details**: In-depth product views with nutritional information, origin details, and quality scores.
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
*   **Dark Mode**: Beautiful, system-aware dark mode with a custom animated theme switcher (Sun/Moon with ambient effects).
*   **Localization**: Multi-language support (i18n) ready for global accessibility.

### 🛠️ Admin Dashboard
*   **Secure Access**: Dedicated admin login portal.
*   **Dashboard Overview**: Visual analytics showing total revenue, active orders, and sales trends using interactive charts.
*   **Inventory Management**: Add, edit, and delete products. Manage stock levels, prices, and images.
*   **Order Management**: View and update customer order statuses (Pending, Shipped, Delivered, etc.).
*   **User Management**: Monitor registered users and manage account access.
*   **Pagination**: Optimized product listings with server-side style pagination for performance.

---

## 🛠️ Tech Stack

*   **Frontend**: React 18, TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS, Shadcn UI (Radix Primitives)
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **State Management**: React Context API
*   **Routing**: React Router DOM v6
*   **Backend / Auth**: Supabase
*   **Forms**: React Hook Form + Zod Validation
*   **Internationalization**: i18next

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project running on your local machine for development and testing purposes.

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/fresh-roots.git
    cd fresh-roots
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url_here
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

### Build for Production

To create a production-ready build:
```bash
npm run build
```
The artifacts will be generated in the `dist` directory.

---

## 📂 Project Structure

```
fresh-roots/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── admin/          # Admin-specific components (Dashboard, Sidebar, etc.)
│   │   ├── ui/             # Shadcn UI primitives
│   │   └── ...
│   ├── context/            # Global state (Auth, Cart, Theme)
│   ├── data/               # Mock data and static content
│   ├── hooks/              # Custom React hooks
│   ├── i18n/               # Internationalization configuration
│   ├── integrations/       # Third-party integrations (Supabase)
│   ├── lib/                # Utility functions
│   ├── pages/              # Main route pages (Home, Login, Admin, etc.)
│   ├── utils/              # Helper functions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
└── ...
```

---

## 🔐 Admin Access

To access the admin panel, navigate to `/admin/login`.
*   **Note**: For development, default admin credentials may be configured in the source code or database. Please ensure to update these for production environments.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

*   [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library.
*   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
*   [Supabase](https://supabase.com/) for the open source Firebase alternative.
*   [Lucide](https://lucide.dev/) for the clean and consistent icons.
