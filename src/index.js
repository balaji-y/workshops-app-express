require( './db/init' );

express = require('express')
const app = express();
const path = require('path');
const indexRouter = require('./routes/index')
const workshopsRouter = require('./routes/workshops')
const apiWorkshopsRouter = require('./routes/api/workshops')
const {pageNotFound,genericErrorHandler} = require('./middleware/errors')
const {dateLogger} = require('./middleware/utils')




app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(dateLogger);

app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use(indexRouter);
app.use('/workshops',workshopsRouter);
app.use('/api/workshops',apiWorkshopsRouter);

app.use(pageNotFound);
app.use(genericErrorHandler);



const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log(`server listening at http://localhost:${port}`);
});