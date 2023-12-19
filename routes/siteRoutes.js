import express from 'express';


const siteRouter = express.Router()


siteRouter.get('/', (req, res) => {
  res.render('site/index', {layout: 'site', title:'Clube VemJogar - Home', css: "/css", images: "/images"});
});

siteRouter.get('/login', (req, res) => {
  res.render('site/login',{layout: 'site', title:'Clube VemJogar - Login', css: "/css", images: "/images"});
});

siteRouter.get('/cadastro', (req, res) => {
  res.render('site/cadastro',{layout: 'site', title:'Clube VemJogar - Cadastro', css: "/css", images: "/images"});
});


export default siteRouter

