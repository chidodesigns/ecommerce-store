import express  from 'express';
import dotenv  from 'dotenv';
import colors from 'colors'
import connectDB from './config/db.js';

//  Error Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//  App Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

connectDB();

const app = express();

//  allows us to except JSON data in the body
app.use(express.json())


app.get('/', (req, res) => {
    res.send("API is running...");
})

//  App Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//  App Error Handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));