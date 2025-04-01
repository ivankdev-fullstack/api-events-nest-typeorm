## About

NestJS API of authentification of the users, CRUD for events.

### Technical Stack

- **NestJS:** A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications with TypeScript support.

- **TypeScript:** A strongly-typed programming language that builds on JavaScript, adding static typing and enhanced development tools.

- **TypeORM:** An Object-Relational Mapper (ORM) for TypeScript and JavaScript that simplifies database interactions with support for multiple databases and a declarative query approach.

- **JWT:** A compact, URL-safe token format used for securely transmitting authentication and authorization data between parties in web applications.

- **Docker (+Docker Compose):** A platform for containerizing applications, enabling consistent environments, with Docker Compose simplifying multi-container setups.

- **Jest:** A JavaScript testing framework focused on simplicity, with powerful features for unit, integration, and snapshot testing.

## Run app

Install packages:

```bash
npm install
```

Create and fill up `.env` file with the variables provided in `.env.example`:

```bash
# APP
PORT=

# AUTH
JWT_SECRET=
JWT_EXPIRES_IN=

# DATABASE
DATABASE_URL=
DATABASE_NAME=
DATABASE_SYNC=
```

Generate and run migrations:

```bash
npm run migratate:run
```

Now, run the application:

```bash
npm run start:dev
```

## API Endpoints

| Route                | Method | Description                             | Authentication    |
| -------------------- | ------ | --------------------------------------- | ----------------- |
| /auth/login             | GET    | Retrieves user profile info                  | No               |
| /auth/register         | POST   | Registers a new user and sets userId in a token | No                |
| /events/:id        | GET   | Retrieves event details by id                      | No                |
| /events/create        | POST   | Creates a new event                 | No                |
| /events/:id             | PUT    | Updates an event by id                          | No                |
| /events/:id           | DELETE    | Deletes an event by id                   | No                |
