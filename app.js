const express =         require('express');
const dotenv =          require('dotenv').config();
const morgan =          require('morgan');
const exphbs =          require('express-handlebars');
const cors =            require('cors');
const indexRouter =     require('./routes/index.js');
const passport =        require('./auth.js');










const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/api', indexRouter);





app.listen(process.env.PORT || 3001, () => {console.log(`Server listening at ${process.env.PORT}`)});