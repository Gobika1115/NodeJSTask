# NodeJSTask
# Project Name: UserFeed

Project Description: 
#Super Admin
There can be only 1 super Admin, and it has got access to every feed. Super admin can create other 2 types of users & manage(update & delete their roles & access) them and provide the access to certain feeds. Super admin can perform CRUD operations on the feeds.
#Super admin can choose to provide "delete" access to admin on the feeds(multiple).
It's the only one that can access the logs(explained below)
#Admin can create/delete basic users & provide access to feeds which they have access, not other feeds. They can delete the feed only if they have the permission to do so. An admin can't create/update/delete other "admin" users
#Basic users can just read the feed details that the user has been provided the access to, not other feeds. They cannot access other users.



## Features

- **User Authentication:** Secure user registration and login with JWT-based authentication.

- **Role-Based Access Control:** Implement role-based access control (RBAC) for different user types, such as Super Admin, Admin, and Basic users.

- **User Management:** Allow Super Admins to manage user accounts, roles, and access to feeds.

- **Feed Management:** Enable Admins to create, update, and delete feeds, with access control.

- **Logging:** Automatic logging of user operations, accessible by Super Admins.

- **RESTful APIs:** Define a set of RESTful APIs for authentication, user management, feed management, and logging.

## Prerequisites



- Node.js (version 20.7.0)
- MongoDB (version 5.8.1)
        -bcrypt (version 5.1.1) 
        -body-parser (version 1.20.2)
        -express (version 4.18.2)
        -jsonwebtoken (version 9.0.2)
        -mongoose (version 7.5.3)


```bash
# Clone the repository
git clone https://github.com/Gobika1115/NodeJSTask.git

# Change directory to the project folder
cd NodeJSAssignment

# Install dependencies
npm install

# Configure the application (update config files)
# Start the application
npm start

