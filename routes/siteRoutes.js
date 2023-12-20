import express from 'express';


const siteRouter = express.Router()


siteRouter.get('/', (req, res) => {
  res.render('site/index', {layout: 'site', title:'Clube VemJogar - Home'});
});

siteRouter.get('/login', (req, res) => {
  res.render('site/login',{layout: 'site', title:'Clube VemJogar - Login'});
});

siteRouter.get('/cadastro', (req, res) => {
  res.render('site/cadastro',{layout: 'site', title:'Clube VemJogar - Cadastro'});
});

siteRouter.get('/videos', (req, res) => {
  res.render('site/videos',{layout: 'site', title:'Clube VemJogar - Vídeos'});
});


export default siteRouter

