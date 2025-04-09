import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './config/db.js';
import agentRouter from './routes/agentRoute.js';
import bookingRouter from './routes/bookingRoute.js';
 import buyersRouter from './routes/buyersRoute.js';
 import financeRouter from './routes/financeRoute.js';
 import leaseRouter from './routes/leaseRoute.js';
 import propertyRouter from './routes/propertyRoute.js';
import sellerRouter from './routes/sellerRoute.js';

dotenv.config();
const app = express();
const PORT =process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/agent", agentRouter)
app.use("/booking", bookingRouter)
app.use("/buyers", buyersRouter)
app.use("/finance", financeRouter)
app.use("/lease", leaseRouter)
app.use("/property", propertyRouter)
app.use("/seller", sellerRouter)

app.get('/',(req,res) =>{
    res.send("hello world")
})
connectDb();
app.listen(PORT,() =>{
    console.log(`server is running on port ${PORT}`);
    });