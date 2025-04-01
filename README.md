  # 🏥 MERN Doctor Appointment App
  A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for managing doctor appointments. Users can book appointments, doctors can manage schedules, and write prescriptions. 

  ---

  ## 🚀 1. Installation and Setup Guide  

  ### Prerequisites  
  Ensure you have the following installed:  
  - **Node.js (v16+)**  
  - **MongoDB (MongoDB Atlas)**  
  - **npm or yarn**

  ### Steps to Set Up Locally  
  ```sh
  # Clone the repository
  git clone https://github.com/yourusername/doctor-appointment.git

  # Navigate to project folder
  cd doctor-appointment
  ```
  Backend Setup
  ```sh
  cd backend
  npm install  # Install dependencies
  npm start    # Start the backend server

  ```
  The server runs on `http://localhost:3001/`
  \
 Frontend Setup  
 ```sh
  cd frontend
  npm install  # Install dependencies
  npm run dev  # Start the frontend
 ```
 The frontend runs on `http://localhost:5173/`

  ---

  ## 📁 2.Code Structure  

  ```sh
      FINANCE_TRACKER/
      │── backend/                 # Backend API (Express.js & MongoDB)
      │   ├── routes/              # API Routes
      │   ├── schema/              # Mongoose Models
      │   ├── index.js             # Server Entry Point
      │   ├── package.json
      │
      │── frontend/                # Frontend (React.js)
      │   ├── public/              # Static Assets
      │   ├── src/
      │   │   ├── appointment/     # Appointment Components
      │   │   ├── component/       # Reusable UI Components
      │   │       ├── Doctors/         # Doctor List & Details
      │   │       ├── Home/            # Home Page
      │   │       ├── NavBar/          # Navigation Bar
      │   │       ├── patient-form/    # Patient Registration Form
      │   │       ├── profile/         # User Profiles
      │   │   ├── login-logout/
      │   │   │   ├── login/       # Login Page
      │   │   │   ├── Register/    # Registration Page
      |   |   |   ├──fake.css      #styles for toggle button to choose user or doctor
      |   |   |   ├──account.css   #styles for login and register forms
      │   │   ├── pages/contact/   # Contact Us Page
      │   │   ├── redux/           # Redux Store
      │   │   │   ├── store.js     # Redux Store Setup
      │   │   │   ├── userslicer.js # User Slice
      │   │   ├── App.jsx          # Main App Component
      │   │   ├── main.jsx        #React DOM entry Point
      │
      │── README.md                # Project Documentation


  ```

  ---

  ## ✍️ 3. Coding Standards  

  - **File Naming:** Intialcase for folders, PascalCase for files and components.  
  - **Component Naming:** Functional components start with an uppercase letter.  
  - **Styling:** Uses **Inline CSS, Bootstrap, Tailwind, and External Stylesheets**.  

  ```jsx
  // Example: Button Component (components/Button.js)
  import "../styles/Button.css";

  export default function Button({ label }) {
    return <button className="btn btn-primary" style={{ padding: "10px" }}>{label}</button>;
  }
  ```

  ---

  ## 🛋️ 4. State Management Guidelines  

  - **Redux** stores **user data**.  
  - **All The other data** is stored using **MongoDb atlas**. 
  ---

  ## 🔌 5. API Documentation  

  - **Base API URL:** `http://localhost:3001/doctor-appointment` ,`http://localhost:3001/appointment-record` ,`http://localhost:3001/review-record`
  - **Endpoints Used:**  
    - `POST doctor-appointment/user` -Patient login
    - `POST doctor-appointment/doctor` -Doctor login

    Other endpoints are explained in routes.

  ---

  ## 🎨 6. UI/UX Guidelines  

  ### 🖼️ Design & Responsiveness  
  - **Bootstrap** for a responsive UI.  
  - **External CSS stylesheets and inline styling**.  

  ### 🌃 Themes  
  - Supports **Light/Dark mode** via React Context.  

  ### 🖼 Screenshots  
![Screenshot (118)](https://github.com/user-attachments/assets/4d34213a-733f-48e7-bcfe-558460fad401)
![Screenshot (119)](https://github.com/user-attachments/assets/7aef6dfa-1e9d-4328-9951-8276b0a6e5f4)
![Screenshot (120)](https://github.com/user-attachments/assets/8fc26c01-8c2c-49bd-894f-1a5c9bb20e9c)
![Screenshot (121)](https://github.com/user-attachments/assets/79c72760-4d01-49ae-9d99-4a5e9c3a121d)
![Screenshot (122)](https://github.com/user-attachments/assets/4e5c2292-dda2-4b08-bbb1-54ffcf7bbc1f)
![Screenshot (123)](https://github.com/user-attachments/assets/b0b880f3-a042-473c-b797-1d52001fdb32)
![Screenshot (125)](https://github.com/user-attachments/assets/0d40d49a-3618-4b46-a290-d433a370a683)
![Screenshot (127)](https://github.com/user-attachments/assets/b91856ae-5320-4e1e-8578-22475496f439)
![Screenshot (128)](https://github.com/user-attachments/assets/58ffbab6-092c-46ec-92c6-2cc663d5ab28)
![Screenshot (129)](https://github.com/user-attachments/assets/7c2780dc-9220-4b7b-89a5-1c6d7a061deb)
![Screenshot (130)](https://github.com/user-attachments/assets/b39c7a86-fc21-467f-86d7-b712ebbaf151)



  ---

  ## 🔥 7. Error Handling & Debugging  

  - **React Error Boundaries** for component-level issues.  
  - **API errors** handled with `try/catch`.   

  ```jsx
  //Example of error boundary
  import React, { Component } from "react";
  class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
    }
  }
  ```

  ---

 ## ✅ 8. Testing

this project primarily relies on **manual testing** through `console.log()`, here’s how we debug and test functionality:

### **Component Testing and Api Testing**

```jsx
    //Example
    import { useEffect, useState } from "react";
    import axios from "axios";

    function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // API call to fetch products
        axios.get("https://fakestoreapi.com/products")
        .then((response) => {
            console.log("Fetched Products:", response.data); 
            setProducts(response.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, []);

    useEffect(() => {
        console.log("Component Updated: Product List Updated", products); // Log component update
    }, [products]);

    return (
        <div>
        <h2>Product List</h2>
        {products.length === 0 ? (
            <p>Loading...</p>
        ) : (
            products.map((product) => (
            <p key={product.id}>{product.title}</p>
            ))
        )}
        </div>
    );
    }

    export default ProductList;
  ```

  ---

  ## 🚀 9. Deployment  

  ### **Production Build**  
  ```sh
  npm run build
  ```
  - **Netlify** for hosting.  
  - **CI/CD pipeline** via GitHub Actions.  

  ---

  ## 🔄 10. Rollback Plan  

  - **Rollback Command on GitHub:**  
  ```sh
  git log --oneline #identify the last stable commit
  git revert <commit-hash> #revert to the last stable commit
  git push origin main #push the reverted commit to gitHub
  ```
  - **Rollback on Netlify:**
  
   1.Go to Netlify Dashboard->Your Site->Deploys.\
   2.Locate the previous successful deployment.\
   3.Click "Publish Deploy" to make it live again.
  
  ---

