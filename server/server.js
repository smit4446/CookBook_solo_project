
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const homeRouter = require('./routes/home.router');
const cookbookRouter = require('./routes/cookbook.router');
const categoryRouter = require('./routes/category.router');
// const recipeRouter = require('./routes/recipe.router')
// const recipeRouter = require('./routes/recipeRouter');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/main', homeRouter);
app.use('/cookbook', cookbookRouter);
app.use('/category', categoryRouter);
// app.use('/recipe', recipeRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
