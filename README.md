#  ClubSphere – Membership & Event Management for Local Clubs

##  Project Purpose: Defining Secure Digital Spaces

ClubSphere is a full-stack MERN application designed to be the central hub for local club managemant, discovery, and member engagement.

Our design philosophy centers on creating distinct, secure **"Digital Spaces"** for each user role, ensuring a highly organized and role-aware experience:

* **Discovery Space (Public/Member):** Browsing, searching, and joining clubs and events.
* **Administrative Space (Manager):** Governing club events, members, and resources.
* **Oversight Space (Admin):** Platform governance, role management, and financial monitoring.

This structural uniqueness ensures clarity, security, and a focused workflow for every user interacting with the platform.

##  Live Site URL (Front End)

 [ https://club-sphere-app.web.app/]

 ##  GitHub Repository (Client)

 [ https://github.com/SYDUR98/clubsphere-client]

##  Live Site URL (Back End)

 [ https://clubsphere-server-ruby.vercel.app/]

## GitHub Repository (Server)

 [ https://github.com/SYDUR98/clubsphere-server]


##  Key Features & Technology Highlights

### 1.  MERN Stack Core & Data Management
* **Full MERN Stack:** Built using **M**ongoDB (Data Design), **E**xpress.js (API), **R**eact (Frontend), and **N**ode.js (Runtime Environment).
* **TanStack Query ($\mathbf{5.x}$):** Utilized for server state management, enabling aggressive caching and automatic synchronization across all dashboards.
* **MongoDB Schema Design:** Implements clear relational mapping (FKs) between `users`, `clubs`, `memberships`, `events`, and `eventRegistrations` collections.

### 2.  Secure Access & Role-Based Control
* **Token Verification Middleware (Challenge):** All sensitive backend API routes are protected by a custom middleware that verifies the user's Firebase ID Token and checks their assigned role (`admin`, `clubManager`, or `member`).
* **Firebase Authentication:** Handles secure user registration and social sign-in (Google).
* **Session Persistence:** Ensures the authenticated state is preserved upon page reload, fulfilling critical deployment requirements.

### 3.  Financial Flow & Advanced Logic
* **Stripe Payment Integration:** Seamlessly handles paid membership fees by redirecting to a **Stripe Checkout Session** and securely logging transaction details.
* **Server-Side Filtering & Sorting:** Efficient backend query implementation for search, category filtering, and sorting (e.g., by fee, date, or name).

### 4.  Deployment & Security Status
* **CORS Configuration:** Backend correctly configured to prevent Cross-Origin Request errors, ensuring smooth communication between the deployed client and server.
* **Environment Security:** All Firebase configuration keys, MongoDB credentials, and Stripe secrets are securely managed using environment variables.

---

##  Important npm Packages Used

| Package | Category | Project Requirement Met |
| :--- | :--- | :--- |
| **`@tanstack/react-query`** | Data Management | **Challenge:** State management and Caching. |
| **`react-hook-form`** | Form Utility | **Challenge:** Robust form validation and submission. |
| **`framer-motion`** | UI/UX | **Core/Challenge:** Animations and dynamic UI effects. |
| **`@stripe/react-stripe-js`** | Payment | **Core:** Integration with Stripe for membership fees. |
| **`use-debounce`** | Performance | **Challenge:** Optimized search and filtering. |
| **`firebase`** | Auth/Security | **Core:** User authentication (login/register). |
| **`chart.js`** | Data Visualization | **Core:** Displaying charts in Admin/Manager Overviews. |
| **`daisyui`**, **`tailwindcss`**| Styling | **Core:** Responsive, clean, and fast UI development. |
| **`react-router`** | Routing | **Core:** Defining role-based access and navigation structure. |
| **`sweetalert2`** | UI/Notifications | **Core:** Custom, user-friendly success/error alerts. |
---

##  Project Setup and Installation

This is the frontend client repository. Ensure the backend server is running before starting the client.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SYDUR98/clubsphere-client.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Setup:** Create a `.env.local` file in the root directory and securely add your necessary keys.
    ```env
    # Example 
    VITE_FIREBASE_API_KEY=your_key_here
    VITE_STRIPE_PK=your_pk_here
    VITE_API_URL=http://localhost:5000 # or deployed backend URL
    ```
4.  **Run the application:**
    ```bash
    npm run dev
  
    ```

##  Admin Access Credentials (For Testing)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | [admin@gmial.com] | [Aadmin@gmial.com] |

---

## Author Information

| Name | Role | Contact | GitHub |
| :--- | :--- | :--- | :--- |
| **[MD SYDUR RAHAMAN]** | Full-Stack Developer | [eng.sydur@gmail.com] | [https://github.com/SYDUR98] |

---