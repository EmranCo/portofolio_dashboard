const express = require('express');
const server = express();

// Get All Routes in Handel 
const userInfoRoute = require('./Routes/Admin/userInfoRoutes');
const skillsRoute = require('./Routes/Admin/skillsRoutes');
const experiencesRoute = require('./Routes/Admin/experiencesRoutes');
const prevWorksRoute = require('./Routes/Admin/prevWorksRoutes');
const servicesRoute = require('./Routes/Admin/servicesRoutes');
const ordersRoute = require('./Routes/Admin/ordersRoutes');
const settingRoutes = require('./Routes/Admin/settingRoutes');
const contaciInfoRoute = require('./Routes/Admin/contactInfoRoutes');
const loginRoute = require('./Routes/Admin/loginRoutes');
const { isLogedIn, logOut } = require('./controller/Admin/loginController');
const portofolioRoute = require('./Routes/User/portofolioRoutes');
const passwordReset = require("./Routes/Admin/passwordReset");
const { changeUserThemToLight, changeUserThemToDark, changeAdminThemToLight, changeAdminThemToDark } = require('./controller/themController');


// Server Configurations
const PORT = process.env.PORT || 8000;
server.set('view engine', 'ejs');
server.use(express.static('Assets'));
server.use(express.static('views'));
server.use(express.urlencoded({ extended: true }))
server.use(express.json());
server.listen(PORT, console.log(`Server started on port ${PORT}`));

// Works with Routes 
server.get('/them/userThem/Light', changeUserThemToLight);
server.get('/them/userThem/Dark', changeUserThemToDark);
server.get('/them/adminThem/Light', changeAdminThemToLight);
server.get('/them/adminThem/Dark', changeAdminThemToDark);

server.use('/', portofolioRoute);
server.use('/orders/', portofolioRoute)

server.use('/dashboard/login', loginRoute);
server.use('/dashboard/logout', logOut);
server.use("/dashboard/password-reset", passwordReset);
server.use(isLogedIn);
server.use('/dashboard/', userInfoRoute);
server.use('/dashboard/skills/', skillsRoute);
server.use('/dashboard/experiences/', experiencesRoute);
server.use('/dashboard/services/', servicesRoute);
server.use('/dashboard/prevWorks/', prevWorksRoute);
server.use('/dashboard/contact/', contaciInfoRoute);
server.use('/dashboard/orders/', ordersRoute);
server.use('/dashboard/settings/', settingRoutes);
server.use('/dashboard/*', (req, res) => { res.render('./dashboardView/404') })
server.use('*', (req, res) => { res.render('./userView/404') })