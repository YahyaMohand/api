const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');//to convert json data to js object.
var jwt = require('jsonwebtoken');
const morgan = require('morgan');
const multer = require('multer');
const expressJwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const {check, validationResult } = require('express-validator')
const helmet = require("helmet");
var xss = require('xss-clean')
const rateLimit = require("express-rate-limit");
var geoip = require('geoip-country');
var forceSSL = require('express-force-ssl');
const requestIp = require('request-ip');
const fileUpload = require('express-fileupload')
require('dotenv').config();

const app = express();

//database connection
const mysql = require('mysql');
var dbconnect = require('./dbconnect');
var con = mysql.createConnection(dbconnect.connection);
con.connect(function(err){
    if (err) throw err;
    console.log('connected to mysql');
});

//app middleware
// app.use(function(req,res,next){
//     console.log(requestIp.getClientIp(req))
//     console.log(geoip.lookup(requestIp.getClientIp(req)).country)
//     if(req.url.includes('admin') && geoip.lookup(requestIp.getClientIp(req)).country != 'IQ'){
//         console.log('admin request out of iraq')
//     }else{
//         next()
//     }  
// })

// app.use(cors({origin: 'https://www.kwaysi.com'}))
//helmet security mw
// app.use(forceSSL)
app.use(xss());
app.use(helmet());
// max requests rate per time
// app.use(rateLimit({
//     windowMs: 1 * 60 * 1000, // 10 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
// }));

//app middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
// const corsorigins = ['http://www.kwaysi.com','http://kwaysi.com']
// app.use(cors({origin: function (origin, callback){
//     if (corsorigins.indexOf(origin) !== -1) {
//     callback(null, true)
//     } else {
//     callback(new Error('Not allowed by CORS'))
//     }
// }})); 
// app.use(cors()) //allow all origins
// if(process.env.NODE_ENV == 'development'){
//     app.use(cors({origin: `http://localhost:3000`}));
// }

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`);
})


app.use(express.static('public'));
// app.use(multer({dest:'public/upload/products'}).any())
app.use(cookieParser());
// app.use(expressValidator())//error




//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const certificatesRoutes = require('./routes/certificates')
// const communityRoutes = require('./routes/community');
// const brandsRoutes = require('./routes/brands');
// const citiesRoutes = require('./routes/cities');
// const storeRoutes = require('./routes/stores');
// const productsRoutes = require('./routes/products');
// const ordersRoutes = require('./routes/orders')
// const bagRoutes = require('./routes/orders')
// const searchRoutes = require('./routes/search');
// const beautyRoutes = require('./routes/beautycenters')

//admin routes
// const adminCategoriesRoutes = require('./routes/admin/categories')
const adminCommunityRoutes = require('./routes/admin/community')
const adminEventsRoutes = require('./routes/admin/events')
const adminTrainingsRoutes = require('./routes/admin/trainings')
const adminProgramsRoutes = require('./routes/admin/programs')
const adminInternsRoutes = require('./routes/admin/interns')
const adminStartupsRoutes = require('./routes/admin/startups')
const adminSuccessStories = require('./routes/admin/successstories')
const adminRecommandation = require('./routes/admin/recommandations')
const adminProducts = require('./routes/admin/products')
const adminServices = require('./routes/admin/services')
const adminMembershipsrent = require('./routes/admin/membershipsrents')

// const adminOrdersRoutes = require('./routes/admin/orders')
// const adminParameters = require('./routes/admin/parameters')
// const adminDashboard = require('./routes/admin/dashboard')
// const adminGroups = require('./routes/admin/groups')
// const adminhr = require('./routes/admin/hr')
// const admintransactions = require('./routes/admin/transactions')
// const adminlogistices = require('./routes/admin/logistics')
// const adminbeautycenters = require('./routes/admin/beautycenters')

//middleware
app.use('/users',cors(),authRoutes);
app.use('',cors(),userRoutes);

app.use('',
// cors({origin: 'https://www.kwaysi.com'}),
 certificatesRoutes)
// app.use('',cors(), homeRoutes);
// app.use('',cors(), communityRoutes);
// app.use('',cors(), brandsRoutes);
// app.use('',cors(), citiesRoutes);
// app.use('',cors(), storeRoutes);
// app.use('',cors(), productsRoutes);
// app.use('',cors(),ordersRoutes);
// app.use('',cors(),bagRoutes);
// app.use('',cors(),searchRoutes);
// app.use('',cors(),beautyRoutes);
// app.use(fileUpload({
//     createParentPath: true
// }),
// cors({origin: 'https://www.kwaysi.com'})
// );

// //admin middleware
// app.use('/admin',
// // cors({origin: 'https://www.kwaysi.com'}),
//  adminCategoriesRoutes)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminCommunityRoutes)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminEventsRoutes)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminTrainingsRoutes)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminProgramsRoutes)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminInternsRoutes)
app.use('/admin' ,
// cors({origin: 'https://www.kwaysi.com'}),
adminStartupsRoutes)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminSuccessStories)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminRecommandation)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminProducts)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminServices)
app.use('/admin',
// cors({origin: 'https://www.kwaysi.com'}),
adminMembershipsrent)

// // managment admin
// app.use('/admin',
// // cors({origin: 'https://www.kwaysi.com'}),
// adminhr)
// app.use('/admin',
// // cors({origin: 'https://www.kwaysi.com'}),
// admintransactions)
// app.use('/admin',
// // cors({origin: 'https://www.kwaysi.com'}),
// adminlogistices)

// app.use('/admin',
// // cors({origin: 'https://www.kwaysi.com'}),
// adminbeautycenters)