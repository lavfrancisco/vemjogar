import express from 'express';


const indexRouter = express.Router()


indexRouter.get('/', (req, res) => {
  res.render('index/index', {layout: 'site', title:'Clube VemJogar - Home', css: "/css"});
});

indexRouter.get('/home', (req, res) => {
  res.render('index/home', {title:'Clube VemJogar - Home', css: "/css"});
});

indexRouter.get('/login', (req, res) => {
  res.render('index/login',{layout: 'site', title:'Clube VemJogar - Login', css: "/css"});
});



export default indexRouter

