import express  from 'express';
import dotenv  from 'dotenv';
dotenv.config();
import colors from 'colors'
import connectDB from './config/db.js';
import morgan from 'morgan'
import path from 'path'

//  Error Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//  App Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import thirdPartyApiRoutes from './routes/thirdPartyApiRoutes.js'



connectDB();

const app = express();

//  @todo create a stream for this logger
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//  allows us to except JSON data in the body
app.use(express.json())

//  App Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/third-party', thirdPartyApiRoutes)

//  __dirname will not work with in this instance as we are using E6Modules instead of commonJS (require syntax)
const __dirname = path.resolve()
//  App Error Handling
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//  Production Build
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
    //  Development Environment
    app.get('/', (req, res) => {
        res.send("API is running...");
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));