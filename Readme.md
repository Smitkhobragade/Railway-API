# Railway Management System API

This is a Railway Management System API built with **Express.js** and **MySQL**. The system allows users to register, log in, check seat availability, book seats, and view their booking details. Admin users can add, update, and delete train records.

## File Structure

```bash
.
├── controllers
│   ├── adminController.js        
│   ├── bookingController.js      
│   └── trainController.js        
│   └── userController.js         
├── middleware
│   ├── adminMiddleware.js        
│   └── authMiddleware.js         
├── utils
│   ├── db.js                    
├── routes
│   ├── adminRoutes.js            
│   ├── bookingRoutes.js          
│   ├── trainRoutes.js            
│   └── userRoutes.js             
├── .env                           
├── .gitignore                     
├── app.js                         
└── package.json                   
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Smitkhobragade/Railway-API.git
   cd Railway-Api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following configuration:

   ```
    PORT=
    ADMIN_API_KEY=
    JWT_SECRET_KEY=
    MYSQL_ADDON_HOST=
    MYSQL_ADDON_DB=
    MYSQL_ADDON_USER=
    MYSQL_ADDON_PORT=
    MYSQL_ADDON_PASSWORD=
    MYSQL_ADDON_URI=
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   This will start the server at `http://localhost:3000`.


## Middleware

- **adminMiddleware.js**  
  Validates if the incoming request has the correct Admin API Key for access to admin routes.

- **authMiddleware.js**  
  Validates the user's JWT token for accessing routes that require authentication 

## Database Structure

The database consists of at least two main tables:

- **`users`**: Stores user details including email, password (hashed), and JWT tokens.
- **`trains`**: Stores information about trains, including train name, source, destination, total seats, and available seats.
- **`bookings`**: Stores the booking details, linking users with trains.

