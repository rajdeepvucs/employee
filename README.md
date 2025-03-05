Employee Management Application
This application allows you to add and manage employee details. It uses Clerk for authentication, React Hook Form & Zod for form handling and validation, AG Grid for data display, and ShadCN UI for styling.

Features
Authentication: Secure access using Clerk authentication. Only logged-in users can access the app.
Employee Form: A form to collect employee details with client-side validation:
Name (Required, minimum 3 characters)
Email (Required, valid email format)
Phone Number (Optional, 10-15 digits)
Role (Required, select from Developer, Designer, Manager)
Joining Date (Required, past or current date)
Data Grid: Displays employee details in a sortable and filterable AG Grid.
Styling: Modern and clean design using ShadCN UI components.
Data Persistence: Employee data is stored in localStorage.
Email Notification: Sends an email with employee details upon successful form submission.
Technologies Used
React: JavaScript library for building user interfaces.
Clerk: Authentication provider.
React Hook Form: Form state management and validation.
Zod: Schema declaration and validation library.
AG Grid: Advanced data grid component.
ShadCN UI: Reusable components for styling.
Email Js: Client-side email service.
Setup Instructions
Clone the repository:

git clone https://github.com/rajdeepvucs/assignment_for_interview cd assignment_for_interview ```

Install dependencies:

npm install 
Configuration:

Clerk:
Create a Clerk application at https://clerk.com/.
Set the Clerk publishable key and secret key as environment variables. (e.g., VITE_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY). Make sure to protect your secret key and never expose it to the client-side.
EmailJS:
Create an account at https://www.emailjs.com/.
Create an EmailJS service.
Create an EmailJS template.
Obtain your EmailJS User ID, Service ID, and Template ID.
Store your EmailJS User ID as an environment variable
Run the application:

npm run dev 
Open your browser and navigate to the address provided (usually http://localhost:5173).

Data Persistence
Currently, employee data is stored in localStorage. This provides persistence across page refreshes.
