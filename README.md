# Home Library

NestJS backend for a home music library management app.

## Stack

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **Prisma ORM**
- **Docker**

## Features

- Authentication and authorization (JWT access and refresh tokens)
- Custom logging service (writing to process.stdout and file with file rotation)
  - in .env you can set up logging level and max file size 
- CRUD operations for:

  - **Users**
  - **Tracks**
  - **Artists**
  - **Albums**
  - **Favorites**

- Pagination, search, and sorting on catalog list endpoints (`/track`, `/artist`, `/album`):
  - `page`, `limit` — page number and page size (`limit` capped at 100)
  - `search` — case-insensitive substring match on `name`
  - `sortBy`, `sortOrder` — sortable fields differ per resource (see table below)
  - responses are returned as `{ items, total, page, limit, totalPages }`

## Installation

### Clone the Repository

```bash
git clone https://github.com/uv95/home-library.git
cd home-library
```

### Install Dependencies

```bash
npm install
```

### Add .env

```bash
mv .env.example .env
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Build

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` by default.

## PostgreSQL & Prisma

- Prisma schema defined in `prisma/schema.prisma`
- Environment variables loaded from `.env`
- Apply migrations:

  ```bash
  npx prisma migrate deploy
  ```

## Docker

To run the full environment:

```bash
docker compose up --build
```

## API Endpoints

### Users

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| GET    | `/user`     | Get all users   |
| GET    | `/user/:id` | Get user by ID  |
| POST   | `/user`     | Create new user |
| PUT    | `/user/:id` | Update user     |
| DELETE | `/user/:id` | Delete user     |

### Auth

| Method | Endpoint    | Description     |
| ------ | ----------- | --------------- |
| POST   | `/auth/signup`     | Sign up   |
| POST   | `/auth/login` | Log in  |
| POST   | `/auth/refresh`     | Send refresh token |

### Tracks

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/track`     | Get a paginated list of tracks. Query: `page`, `limit`, `search`, `sortBy` (`name` \| `duration`), `sortOrder` (`asc` \| `desc`) |
| GET    | `/track/:id` | Get track by ID  |
| POST   | `/track`     | Create new track |
| PUT    | `/track/:id` | Update track     |
| DELETE | `/track/:id` | Delete track     |

### Artists

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/artist`     | Get a paginated list of artists. Query: `page`, `limit`, `search`, `sortBy` (`name`), `sortOrder` (`asc` \| `desc`) |
| GET    | `/artist/:id` | Get artist by ID  |
| POST   | `/artist`     | Create new artist |
| PUT    | `/artist/:id` | Update artist     |
| DELETE | `/artist/:id` | Delete artist     |

### Albums

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/album`     | Get a paginated list of albums. Query: `page`, `limit`, `search`, `sortBy` (`name` \| `year`), `sortOrder` (`asc` \| `desc`) |
| GET    | `/album/:id` | Get album by ID  |
| POST   | `/album`     | Create new album |
| PUT    | `/album/:id` | Update album     |
| DELETE | `/album/:id` | Delete album     |

### Favorites

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | `/favs`            | Get all favorites            |
| POST   | `/favs/track/:id`  | Add track to favorites       |
| DELETE | `/favs/track/:id`  | Remove track from favorites  |
| POST   | `/favs/artist/:id` | Add artist to favorites      |
| DELETE | `/favs/artist/:id` | Remove artist from favorites |
| POST   | `/favs/album/:id`  | Add album to favorites       |
| DELETE | `/favs/album/:id`  | Remove album from favorites  |
