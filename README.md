<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
=======
# assignment_for_interview
# Employee Management Application

This application allows you to add and manage employee details. It uses Clerk for authentication, React Hook Form & Zod for form handling and validation, AG Grid for data display, and ShadCN UI for styling.

## Features

*   **Authentication:** Secure access using Clerk authentication. Only logged-in users can access the app.
*   **Employee Form:** A form to collect employee details with client-side validation:
    *   Name (Required, minimum 3 characters)
    *   Email (Required, valid email format)
    *   Phone Number (Optional, 10-15 digits)
    *   Role (Required, select from Developer, Designer, Manager)
    *   Joining Date (Required, past or current date)
*   **Data Grid:** Displays employee details in a sortable and filterable AG Grid.
*   **Styling:** Modern and clean design using ShadCN UI components.
*   **Data Persistence:** Employee data is stored in `localStorage`.
*   **Email Notification:** Sends an email with employee details upon successful form submission.

## Technologies Used

*   **React:** JavaScript library for building user interfaces.
*   **Clerk:** Authentication provider.
*   **React Hook Form:** Form state management and validation.
*   **Zod:** Schema declaration and validation library.
*   **AG Grid:** Advanced data grid component.
*   **ShadCN UI:** Reusable components for styling.
*   **Email Js:**   Client-side email service.

## Setup Instructions

1.  **Clone the repository:**

    ```bash
   git clone https://github.com/rajdeepvucs/assignment_for_interview
cd assignment_for_interview
    ```

2.  **Install dependencies:**

    ```bash
    npm install 
    ```

3.  **Configuration:**

    *   **Clerk:**
        *   Create a Clerk application at [https://clerk.com/](https://clerk.com/).
        *   Set the Clerk publishable key and secret key as environment variables.  (e.g., `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`). Make sure to protect your secret key and never expose it to the client-side.
 *   **EmailJS:**
        *   Create an account at [https://www.emailjs.com/](https://www.emailjs.com/).
        *   Create an EmailJS service.
        *   Create an EmailJS template.
        *   Obtain your EmailJS User ID, Service ID, and Template ID.
        *   Store your EmailJS User ID as an environment variable


4.  **Run the application:**

    ```bash
    npm run dev 
    ```

    Open your browser and navigate to the address provided (usually `http://localhost:5173`).

## Data Persistence

Currently, employee data is stored in `localStorage`.  This provides persistence across page refreshes.
>>>>>>> 3b9ff03d58e98ee72ad46a1fc41621a7cc9999e4
