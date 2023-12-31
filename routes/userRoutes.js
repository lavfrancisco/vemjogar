import express from 'express';
import User from "../models/Usuario.js";
import md5 from 'md5';
import argon2 from 'argon2';

const userRouter = express.Router()



userRouter.get('/novo', (req, res) => {
    if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
    {
        res.render('usuario/novo');   
    }
    else{
      res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!", css: "../css/style.css"});   
    }
    
});

userRouter.get('/exibir/:id', async (req, res) => {

  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
      const usuario = await User.findOne({ where: { id: req.params.id } });    
      if(usuario!=null)
      {
        res.render('usuario/editar', {id: usuario.id, nome: usuario.nome, sobrenome:usuario.sobrenome, email: usuario.email, css: "../css/style.css"});
      }
      else{
        res.send("Usuario não encontrado!");
      }        
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!"});   
  }
  
  
  
});

userRouter.get('/excluirUsuario/:id', async (req, res) => {

  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {
      const usuario = await User.destroy({ where: { id: req.params.id } }).then(function(){
        res.redirect("/usuario/listar")
      }).catch(function(erro){
        res.send('Erro ao excluir o usuário: '+erro);
      });      
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!", css: "../css/style.css"});   
  }
  
  
  
  
});

userRouter.get('/listarUsuarios', async (req, res) => {

  if(req.session.usuarioLogado || req.session.usuarioLogado!=null)
  {  
      const usuarios = await User.findAll();  
      if(usuarios!=null)
      {
        res.render('usuario/listar', {layout: 'painel', usuarios: usuarios, tituloPagina: "Listagem de usuários", css: "../css/style.css"});
      }
      else{
        res.send("Usuario não encontrado!");
      } 
  }
  else{
    res.render('index/login', {erroLogin: "Página restrita aos usuários do sistema!", css: "../css/style.css"} );   
  }   
});


userRouter.post('/cadastrarUsuario', async (req, res) => {
    const senhaHash = await argon2.hash(req.body.senha); 
    const user = User.create({ 
        nome: req.body.nome,         
        email: req.body.email,
        
        senha: senhaHash 
      }).then(function(){
        res.render('site/cadastro',{layout: 'site', title:'Clube VemJogar - Cadastro', sucessoCadastro: "Usuário cadastrado com sucesso"});        
      }).catch(function(erro){
        res.render('site/cadastro',{layout: 'site', title:'Clube VemJogar - Cadastro', erroCadastro: "Usuário cadastrado com sucesso"});      
      });
    
    
});

userRouter.post('/editarUsuario', (req, res) => {

  
  const user = User.update({ 
      nome: req.body.nome, 
      sobrenome: req.body.sobrenome, 
      email: req.body.email,
      senha: md5(req.body.senha)
    }, { where: {id: req.body.id}} ).then(function(){
      res.redirect("/usuario/listar");
    }).catch(function(erro){
      res.send('Erro ao atualizar o usuário: '+erro);
    });
  
  
});

userRouter.post('/logar', async (req, res) => {

  const email = req.body.email;
  //const senha = md5(req.body.senha);
  const senha = req.body.senha;
  

  const usuario = await User.findOne({ where: { email: email} });    
  if(usuario!=null && (await argon2.verify(usuario.senha, senha)))
  {
    //res.render('usuario/editar', {id: usuario.id, nome: usuario.nome, sobrenome:usuario.sobrenome, email: usuario.email});
    req.session.usuarioLogado = usuario;  
    //res.redirect("../cadastro", {sucessoCadastro: "Logado ao sistema", css: "/css"});    
    res.render("site/cadastro", {layout: 'site', sucessoCadastro: "Logado ao sistema", title:'Clube VemJogar - Cadastro'});
  }
  else{
    req.session.usuarioLogado = null;    
    //res.render('index/login', {erroLogin: "Usuario ou senha inválidos", css: "../css/style.css"});        
    res.render("site/cadastro", {layout: 'site', erroCadastro: "Usuário ou senha inválidos", title:'Clube VemJogar - Cadastro'}); 
  }  
});

userRouter.get('/logout', async (req, res) => {

  req.session.usuarioLogado = null;    
  res.redirect('../login');        
  
});


export default userRouter

