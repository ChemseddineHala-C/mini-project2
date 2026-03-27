Build a complete Library Management REST API that manages users, books, and borrowing records. This project tests everything I learned from JavaScript basics to JWT authentication.

note: "for more information, you will find a library-project.pdf with all details about this mini-project and in the same time you can use it for training as a front-end when you are dealing with API requests"

note: "firstly, create a folder and naming it (nameOfFolder). Then put them inside, I mean the files"

note: "some information are mask and you must change it for your working, do the following steps:
  - in server.js file: remove the first line, and replace the value of PORT with just a number (3000)
  - in src/db/database.js replace (process.env.MONGO_URL) with "mongodb://localhost:27017/XXX"
    XXX or (nameOfFolder): is the name of folder you created it and when those files are found
  - in src/middleware/authMiddleware.js and src/controllers/authControllers.js, replace (process.env.JWT_SECRET) with XXX
    XXX: is the secret key you want it, you can write any key

note: "you must install some required packages by typing (npm install mongoose bcryptjs jsonwebtoken express)"

for running type "node server.js"

