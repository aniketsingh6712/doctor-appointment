  # 🏥 MERN Doctor Appointment App
  A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for managing doctor appointments. Users can book appointments, doctors can manage schedules, and an admin can oversee the system.  

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
    E-COMMERCE/
    │── public/                 # Static assets
    │
    │ │── src/
    │   │   ├── components/         # Reusable UI components (Button, Navbar, etc.)
    │  │   │   ├── Account/        # Signup and Login Page
    │  │   │   ├── Cart/           # Shopping cart components
    │  │   │   ├── Checkout/       # Checkout components
    │  │   │   ├── Footer/         # Footer section
    │  │   │   ├── Home/           # Home page components
    │  │   │   ├── Navbar/         # Navigation bar
    │  │   │   ├── Order/          # Orders-related components
    │  │   │   ├── ProductDetails/ # Single product details Page
      │   │   ├── ProductsPage/   # Product listing page
      │   ├── context/            # Context API 
      │   │   ├── ThemeContext.js # Theme context for light/dark mode
      │   ├── redux/              # Redux store for user and cart data
      │   ├── ErrorBoundary/      # Handling Component-Level Errors
      │   ├── App.jsx             # Main app entry point
      │   ├── main.jsx            # React DOM entry point
      │   ├── index.css           # CSS For Theme Change
      │── .gitignore
      │── index.html              # HTML entry point
      │── package.json
      │── package-lock.json
      │── vite.config.js          # Vite configuration file
      │── README.md               # Project documentation


  ```

  ---

  ## ✍️ 3. Coding Standards  

  - **File Naming:** Intialcase for folders, PascalCase for files and components.  
  - **Component Naming:** Functional components start with an uppercase letter.  
  - **Styling:** Uses **Inline CSS, Bootstrap, and External Stylesheets**.  

  ```jsx
  // Example: Button Component (components/Button.js)
  import "../styles/Button.css";

  export default function Button({ label }) {
    return <button className="btn btn-primary" style={{ padding: "10px" }}>{label}</button>;
  }
  ```

  ---

  ## 🛋️ 4. State Management Guidelines  

  - **Redux** stores **user data and cart information**.  
  - **Product data** is fetched inside components using **Axios**.
  - **LocalStorage** is used to store **user data,cart data and orders data**.    
  - **Theme Context** manages **light/dark mode**.  

  ---

  ## 🔌 5. API Documentation  

  - **Base API URL:** `https://fakestoreapi.com/`  
  - **Endpoints Used:**  
    - `GET /products` - Fetch all products  
    - `GET /products/:id` - Fetch single product  
  ```js
  // Example API Call
  import axios from "axios";
  import React,{useState,useEffect} from "react";
  export const fetchProducts=()=> {
    const [data,setData]=useState("");
    useEffect(()=>{
        const fetchProducts=async ()=>{
            try{
            const response = await axios.get("https://fakestoreapi.com/products");
            setData(response.data);
            }
            catch(err){
                console.log(err);
            }
        }
        
    })
    
    return(
        <div>{data}</div>
    )
  };
  ```

  ---

  ## 🎨 6. UI/UX Guidelines  

  ### 🖼️ Design & Responsiveness  
  - **Bootstrap** for a responsive UI.  
  - **External CSS stylesheets and inline styling**.  

  ### 🌃 Themes  
  - Supports **Light/Dark mode** via React Context.  

  ### 🖼 Screenshots  


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

