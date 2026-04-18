import express from 'express';
/*
BASIC-CONFIG-IMPORTS!
*/
import dotenv from 'dotenv';
import connectDb from './config/db.config.js';
import { serverTiming } from './middlewares/serverTiming.middleware.js';
/*
ROUTING-IMPORTS!
*/
import userRoutes from './Routes/user.route.js';
import postRoutes from './Routes/post.route.js';
import likeRoutes from './Routes/like.route.js';
import commentRoutes from './Routes/comment.routes.js';
import followRoutes from "./Routes/follow.route.js";
import notificationRoutes from './Routes/notification.route.js';
import tagRoutes from "./Routes/tag.route.js";
/*
ERROR-HANDLING-IMPORTS!
*/
import { errorHandler } from './middlewares/validation.middleware.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import { createServer } from 'http';
import { initSocket } from './socket.js';
import cors from 'cors';



// load the environment variables
dotenv.config();
// connect DATABASE-MONGO_DB
connectDb();
// create app using express 
const app = express();
app.use(serverTiming);
// define port & default_port 
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true

}));                 // Enable CORS



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);           // Your input validator error handler

const httpSever = createServer(app);
initSocket(httpSever);


//  userRH
app.use('/forum/api/auth', userRoutes);

// postRH
app.use('/forum/api/post', postRoutes);

// likeRH
app.use('/forum/api/like', likeRoutes)

// commentRH
app.use('/forum/api/comment', commentRoutes);

// followRH
app.use('/forum/api/follow', followRoutes);

//notificationRH
app.use('/forum/api/notifications', notificationRoutes);

//tagRH
app.use('/forum/api/tags', tagRoutes);




app.use(globalErrorHandler);

httpSever.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


export default app;

