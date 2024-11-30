# **Dynamic Recipe Management Web App**

A feature-rich web application for recipe management, built using **Java Servlets**, **HTML**, and **MySQL**. This project provides a seamless interface for users to browse, filter, and submit recipes dynamically, with a robust login and registration system.

---

## **Features**
- **User Authentication**: Secure login and registration using Java Servlets and MySQL.
- **Dynamic Recipe Filtering**: Filter recipes by categories such as Breakfast, Lunch, Dinner, or Dessert.
- **Recipe Management**: Submit new recipes with title, category, and image.
- **API-Driven Data Flow**: Fetch and manipulate recipe data using RESTful APIs.
- **Modern UI**: Built with Bootstrap for responsive and user-friendly design.

---

## **Project Structure**
```plaintext
├── src
│   ├── database
│   │   └── DBConnection.java    # Handles database connection
│   ├── servlets
│   │   ├── UserServlet.java     # Manages login and registration
│   │   ├── RecipeServlet.java   # Handles recipe submissions
│   │   ├── GetRecipebyCat.java  # Fetches recipes by category
│   │   └── RecipeFetchServlet.java  # General recipe fetching
├── web
│   ├── homepage.html            # Landing page for users
│   ├── categories.html          # Recipe filtering by category
│   ├── submitRecipe.html        # Submit new recipes
│   ├── login.html               # User login page
│   ├── favorites.html           # Future feature placeholder
│   ├── logo.png                 # App logo
├── lib                          # External libraries (e.g., JSON, JDBC driver)
├── README.md                    # Project documentation
