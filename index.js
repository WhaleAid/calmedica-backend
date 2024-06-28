const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('express-jwt');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const csvRoutes = require('./routes/csv.routes');

const mongoose = require('mongoose');
const { deserializeUser } = require('./middlewares/deserializeUser');
const MongoStore = require('connect-mongo');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDB = process.env.MONGODB_URI;
const sessionStore = MongoStore.create({
    mongoUrl: mongoDB,
    autoRemove: 'native'
})
try {
    mongoose.connect(mongoDB)
} catch (error) {
    console.log('MongoDB Client Error', error)
}

console.log('MongoDB Client Connected')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'none',
    }
}));

const origins = process.env.ALLOWED_ORIGINS;

app.use(deserializeUser)
app.use(cors({
    origin: (origin, callback) => {
        if (origins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
// app.use(cors({
//     origin: '*', // Allow all origins
//     credentials: true, // Uncomment this if you need to allow credentials (cookies, etc.)
// }));
app.set('trust proxy', true);
authRoutes(app);
userRoutes(app);
csvRoutes(app);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to calmedica API' });
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});