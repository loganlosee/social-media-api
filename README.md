# social media API

## Introduction

A simple API for a social media application, allowing users to manage profiles, create posts, and interact with others.

## Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Getting Started](#getting-started-️)
  - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies-️)
- [License](#license-)

## Demo

- A live demo video can be found here: [HERE](https://drive.google.com/file/d/1RDUxa185EuiaZKBEwz84soIzL3-jrKoZ/view)

## Getting Started 

### Installation

1. Clone the repo
   ```bash
   ngit clone https://github.com/loganlosee/social-media-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Update connection details in `config/connection.js`.

4. Start the server:
   ```bash
   npm start
   ```

### API Endpoints

#### Friends

- **POST /api/users/:userId/friends/:friendId**
  - Description: Add a new friend to a user's friend list.
  - Controller: `addFriend` in `friendController`
  - Example: `POST /api/users/123/friends/456`

- **DELETE /api/friends/remove-friend**
  - Description: Remove a friend from a user's friend list.
  - Controller: `removeFriend` in `friendController`
  - Example: `DELETE /api/friends/remove-friend`

#### Reactions

- **POST /api/reactions/:thoughtId**
  - Description: Create a new reaction for a specific thought.
  - Controller: `createReaction` in `reactionController`
  - Example: `POST /api/reactions/789`

- **GET /api/reactions/:reactionId**
  - Description: Get details of a specific reaction.
  - Controller: `getOneReaction` in `reactionController`
  - Example: `GET /api/reactions/321`

- **PUT /api/reactions/:reactionId**
  - Description: Update details of a specific reaction.
  - Controller: `updateReaction` in `reactionController`
  - Example: `PUT /api/reactions/321`

- **DELETE /api/reactions/:reactionId/thoughts/:thoughtId**
  - Description: Remove a reaction from a specific thought.
  - Controller: `deleteReaction` in `reactionController`
  - Example: `DELETE /api/reactions/321/thoughts/789`

#### Thoughts

- **GET /api/thoughts/**
  - Description: Get all thoughts.
  - Controller: `getAllThoughts` in `thoughtController`
  - Example: `GET /api/thoughts`

- **GET /api/thoughts/:thoughtId**
  - Description: Get details of a specific thought.
  - Controller: `getOneThought` in `thoughtController`
  - Example: `GET /api/thoughts/789`

- **POST /api/thoughts/**
  - Description: Create a new thought.
  - Controller: `createThought` in `thoughtController`
  - Example: `POST /api/thoughts`

- **PUT /api/thoughts/:thoughtId**
  - Description: Update details of a specific thought.
  - Controller: `updateThought` in `thoughtController`
  - Example: `PUT /api/thoughts/789`

- **DELETE /api/thoughts/:thoughtId**
  - Description: Delete a specific thought.
  - Controller: `deleteThought` in `thoughtController`
  - Example: `DELETE /api/thoughts/789`

#### Users

- **GET /api/users/**
  - Description: Get all users.
  - Controller: `getAllUsers` in `userController`
  - Example: `GET /api/users`

- **POST /api/users/**
  - Description: Create a new user.
  - Controller: `createUser` in `userController`
  - Example: `POST /api/users`

- **GET /api/users/:userId**
  - Description: Get details of a specific user by ID.
  - Controller: `getOneUser` in `userController`
  - Example: `GET /api/users/123`

- **DELETE /api/users/:userId**
  - Description: Delete a specific user by ID.
  - Controller: `deleteUser` in `userController`
  - Example: `DELETE /api/users/123`

- **PUT /api/users/:userId**
  - Description: Update details of a specific user by ID.
  - Controller: `updateUser` in `userController`
  - Example: `PUT /api/users/123`

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)

## License

This project is licensed under the [MIT License](LICENSE).
