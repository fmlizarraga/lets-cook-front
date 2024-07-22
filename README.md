# Let's Cook! - Front End

Welcome to "Let's Cook!", a single-page application (SPA) for sharing and discovering cooking recipes. This frontend project is built with React, Redux Toolkit, and React Router. The project is designed with a repository pattern to facilitate easy switching of data providers. Currently, a local repository is used for development purposes, but the project is set up to integrate an API in the future.

[Check it online!](https://lets-cook-front.onrender.com)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/fmlizarraga/lets-cook-front
    cd lets-cook-front
    ```

2. **Install the dependencies:**
    ```sh
    yarn install
    ```

3. **Start the development server:**
    ```sh
    yarn dev
    ```

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`.

### Main Features

- Browse recipes in the gallery.
- Read detailed posts about each recipe.
- Filter posts by categories.
- User authentication for accessing protected routes.
- Add, edit, and delete recipes (available for authenticated users).

## Routes

The application's routes are structured as follows:

- "/"
  - "home" | Gallery
  - "about" | About
  - "blog"
      - "posts" | BlogPosts
      - ":postId" | PostDetail
      - "categories/:filter" | BlogPosts
      - ":postId/edit" | PostForm [Protected]
      - "new" | PostForm [Protected]
      - "Any other sub path" redirects to "posts"
  - "auth"
      - "login" | Login [Public]
      - "register" | Register [Public]
      - "Any other sub path" redirects to "login"
  - "Any other sub path" redirects to "home"
- "Any unknown path" redirects to "/"

## Dependencies

The project uses the following dependencies:

- Node v20 or upper
- Yarn
- react "^18.3.1"
- react-dom "^18.3.1"
- react-hook-form "^7.52.1"
- react-redux "^9.1.2"
- react-router-dom "^6.24.1"
- @reduxjs/toolkit "^2.2.6"
- @hookform/resolvers "^3.9.0"
- axios "^1.7.2"
- zod "^3.23.8
- dompurify "^3.1.6"
- primereact "^10.7.0"
- primeicons "^7.0.0"
- quill "^2.0.2"

## License

Distributed under the MIT License. See `LICENSE` for more information.
