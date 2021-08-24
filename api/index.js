// This inital Express Setup adapted from https://www.youtube.com/watch?v=l8WPWK9mS5M

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()

import usersRoutes from './routes/users.js'
import journalsRoutes from './routes/journals.js'
import entriesRoutes from './routes/entries.js'

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors())

// Setting the below creates the root to be used with all of the remaining routes
app.use('/users', usersRoutes)
app.use('/journals', journalsRoutes)
app.use('/entries', entriesRoutes)

// This creates a route
app.get('/', (req, res) => res.send('Hello from Homepage'));



app.listen(PORT, () => {console.log(`Server is running on port: http://localhost:${PORT}`)})
