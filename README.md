# Comment Management App with Authentication

## Description

Comment Management App built using NestJS, featuring a robust authentication mechanism that includes administrative controls for comment approval. It supports user registration and authentication, with detailed comment management capabilities for authenticated users, while allowing untracked users to browse existing comments. The system uses an isolated SQLite database to ensure data privacy and integrity and employs custom decorators, middleware, and serialization interceptors to enhance security and functionality, ideal for applications needing both user authentication and administrative content control.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [How to Contribute](#how-to-contribute)

## Installation

To get started with this project, you need to install the required dependencies and run it. Follow these steps:

1. Clone the repository to your local machine.

```bash
git clone <repository_url>
```

2. Navigate to the project directory.

```bash
cd <project_directory>
```

3. Install the project dependencies using npm.

```bash
npm install
```

4. Run the application.

```bash
npm run start:dev
```

## Usage

To interact with the Comment Manager, use an API client like Postman. For database management and viewing use "DB Browser for SQLite".

##### Initial setup:

An initial admin user should be created during the system setup to enable full administrative functionality from the start. This process typically involves directly setting a user’s 'admin' field to true in the src/users/entities/user.entity.ts file.

1. Authenticate Users: 
* Users can log in with their credentials or register if they don't have an account.
2. Manage Comments: 
* Authenticated users can create and update their comments. All comments are initially unapproved.
3. Admin Actions: 
* Admin users can approve or disapprove comments to manage content visibility.

localhost:3000 routes:

_UsersController Routes (/auth):_
* GET /auth/whoami: Retrieves information about the current authenticated user.
* POST /auth/signout: Signs out the current user by ending their session.
* POST /auth/signup: Registers a new user with the provided email and password.
* POST /auth/signin: Authenticates a user and starts a session with the given login credentials.
* GET /auth/users: Lists all registered users (probably requires admin rights).
* GET /auth/:id: Retrieves the details of a specific user by their ID.
* PUT /auth/:id: Updates the details of a specific user by their ID.
* DELETE /auth/:id: Deletes a specific user by their ID.

_CommentsController Routes (/comments):_
* POST /comments: Creates a new comment (requires authentication).
* PUT /comments/approve-comments/:id: Approves a comment specified by its ID (requires admin rights).
* PUT /comments/:id: Updates a specific comment by its ID (requires that the comment belongs to the authenticated user).
* GET /comments: Retrieves all comments, with or without authentication.
* GET /comments/:id: Retrieves a specific comment by its ID.
* DELETE /comments/:id: Deletes a specific comment by its ID (requires admin rights or that the comment belongs to the authenticated user).

## Features

* User Authentication: Secure registration and login process with password hashing and salting.
* Comment Management: Create, update, and view comments with user association.
* Admin Moderation: Administrative capabilities to approve or disapprove comments.
* Security: Utilize middleware and custom decorators to handle authentication and authorization seamlessly.
* Data Integrity: Use of serialize interceptor to ensure sensitive data like passwords are not included in responses.

## Credits

This project uses the following technologies:

* NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
* TypeORM: An ORM that can run in Node.js and be used with TypeScript or JavaScript.
* Class Validator & Class Transformer: Libraries to validate incoming data and transform objects.

## How to Contribute

Contributions to this project are welcome. To contribute, follow these steps:

1. Fork the repository to your GitHub account.
2. Create a new branch for your feature or bug fix.

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them.

```bash
git add .
git commit -m "Added a new feature"
```

4. Push your changes to your forked repository.

```bash 
git push origin feature/your-feature-name
```

5. Create a Pull Request (PR) to the main repository, explaining your changes and improvements.
