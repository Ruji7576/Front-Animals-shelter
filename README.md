# Veterinary Management System

## Installation and Running

To get started with this application, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Ruji7576/Front-Animals-shelter.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd Front-Animals-shelter
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the application:**

    ```bash
    npm start
    ```

**Note:** The application may not function correctly until the database is connected and the backend services are running.

## Main Page

The main page provides an overview and access to various features of the application. It displays a summary of key functionalities. Below is a screenshot of the main page:

- ![Main Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/First-page.jpg?raw=true)

## Registration

The registration page allows new users to create an account. It includes fields for:

- **Username**
- **Password**
- **Email**

Below is a screenshot of the registration page:

- ![Registration Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/Register.jpg?raw=true)

## Login

The login page enables users to authenticate and access their accounts. It includes fields for:

- **Username**
- **Password**

Below is a screenshot of the login page:

- ![Login Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/Login.jpg?raw=true)

## Admin Pages

### Pet Management

In the admin interface, you can manage all pets, including:

- **Viewing all pets**, including those not yet adopted.
- **Adding new pets**.
- **Editing existing pets**.
- **Deleting pets**.

Below is a screenshot of the pet management page:

- ![Pet Management Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/Admin-pets-1.1.jpg?raw=true)
- ![Pet Management Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/Admin-pets-1.2.jpg?raw=true)

### Donation Management

Admins can manage donations with the following actions:

- **Viewing all donations**.
- **Adding new donations**.
- **Updating existing donations**.
- **Deleting donations**.

Below is a screenshot of the donation management page:

- ![Donation Management Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/Admin-donations.jpg?raw=true)

## User Pages

### Pet Management

For regular users, the pet management page includes:

- **Viewing all available pets** (those not yet adopted).
- **Adopting pets**.
- **Viewing their adopted pets** in a separate list.

Below is a screenshot of the pet management page for users:

- ![User Pet Management Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/User-pets-1.1.jpg?raw=true)
- ![User Pet Management Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/User-pets-1.2.jpg?raw=true)

### Donation Management

Users can:

- **Add new donations**.
- **View their own donations**.

Below is a screenshot of the donation management page for users:

- ![User Donation Management Page](https://github.com/Ruji7576/Front-Animals-shelter/blob/main/src/page-images/User-donations.jpg?raw=true)

## API Endpoints

### Authentication

- **Login**
  - `POST http://localhost:8080/api/auth/login`
  - Request body:
    ```json
    { "username": "user", "password": "pass" }
    ```

- **Register**
  - `POST http://localhost:8080/api/auth/register`
  - Request body:
    ```json
    { "username": "user", "password": "pass", "email": "email@example.com" }
    ```

### Pets

- **Get All Pets**
  - `GET http://localhost:8080/pets`
  
- **Get Pet by ID**
  - `GET http://localhost:8080/pets/{id}`
  
- **Get All Pets Without Adoption**
  - `GET http://localhost:8080/pets/withoutAdopted`

- **Get All Pets Adopted by User**
  - `GET http://localhost:8080/pets/adopted/{user_id}`

- **Get All Adopted Pets**
  - `GET http://localhost:8080/pets/adopted`

- **Delete a Pet**
  - `DELETE http://localhost:8080/pets/delete/{id}`

- **Update a Pet**
  - `PUT http://localhost:8080/pets/update/{id}`
  - Request body:
    ```json
    { "petName": "New Pet Name", "age": "2 years", "breed": "Breed", "petType": "Type", "description": "Description", "Sterilized": false, "adopted": false, "url": "http://example.com/photo.jpg", "dateBirth": "2022-01-01T00:00:00" }
    ```

- **Create a Pet**
  - `POST http://localhost:8080/pets/create`
  - Request body:
    ```json
    { "petName": "Pet Name", "age": "2 years", "breed": "Breed", "petType": "Type", "description": "Description", "Sterilized": false, "adopted": false, "url": "http://example.com/photo.jpg", "dateBirth": "2022-01-01T00:00:00" }
    ```

- **Adopt a Pet**
  - `POST http://localhost:8080/pets/adopt/{pet_id}`
  - Query parameters:
    - `user_id`: ID of the user adopting the pet.
  - Example:
    ```
    POST http://localhost:8080/pets/adopt/123?user_id=456
    ```

### Donations

- **Get All Donations**
  - `GET http://localhost:8080/donations`

- **Get Donation by ID**
  - `GET http://localhost:8080/donations/{id}`

- **Delete a Donation**
  - `DELETE http://localhost:8080/donations/delete/{id}`

- **Update a Donation**
  - `PUT http://localhost:8080/donations/update/{id}`
  - Request body:
    ```json
    { "name": "Donation Name", "donation": 100 }
    ```

- **Create a Donation**
  - `POST http://localhost:8080/donations/create`
  - Request body:
    ```json
    { "name": "Donation Name", "donation": 100 }
    ```

- **Get All Donations by User**
  - `GET http://localhost:8080/donations/getAllByUser/{userId}`

### User Profile

- **Get User Profile**
  - `GET http://localhost:8080/api/profile`
  - Returns details of the currently authenticated user.

## Backend Repository

The backend for this project is available at [Project-Animal-Shelter](https://github.com/Krisel1/Project-Animal-Shelter.git). You can use this backend to complement the functionality of this application.

## Technologies Used

- **React**: A JavaScript library for building user interfaces. Used to create the dynamic and responsive UI of the application.

- **Axios**: A promise-based HTTP client for the browser and Node.js. Used for making API requests to the backend services.

- **JavaScript (ES6+)**: The primary programming language for frontend development, utilizing modern features such as arrow functions, async/await, and destructuring.

- **HTML5 & CSS3**: Markup and styling languages used for structuring and designing the UI.

- **Node.js & npm**: Node.js was used for setting up the development environment, and npm (Node Package Manager) for managing dependencies.

- **Git**: Version control system used for tracking changes and collaborating on the project.

- **GitHub**: Hosting service for version control used to manage and store the project’s codebase.
