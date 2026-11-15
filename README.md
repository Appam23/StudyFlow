# StudyFlow

StudyFlow helps students organize assignments, track due dates, and manage progress.

## Team Members

- Add team member names here: Appam Leisan

## Technologies

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Svelte
- Vite

## Installation

```bash
npm install
```

## Development

Start the Express API and database server:

```bash
npm run dev
```

The API and vanilla frontend are available at [http://localhost:3000](http://localhost:3000).

Start the Svelte frontend in a separate terminal:

```bash
npm run client
```

The Svelte frontend is available at [http://localhost:5173](http://localhost:5173).

The Svelte client uses the Express API at `http://localhost:3000/api/assignments`.

## Production build

Build the Svelte client with:

```bash
npm run build:client
```

The optimized files are generated in `client/dist`.