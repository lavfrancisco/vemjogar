import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
import siteRouter from './routes/siteRoutes.js';
import session from 'express-session';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Configuração BodyParser
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// Use the session middleware
app.use(session({ secret: 'DSW secret', resave: false, saveUninitialized: true}));

// Configuração de pasta public para arquivos estáticos
app.use(express.static(path.join(__dirname,'public')));

//Rotas
app.use('/', siteRouter);
//app.get("/", (req, res) => res.type('html').send(html));

app.use('/usuario', userRouter);

app.use(function(req, res, next) {
    res.status(404).render("error/error404");
});




const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;




const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Clube VemJogar</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Olá, seja bem vindo ao Clube VemJogar!
    </section>
  </body>
</html>
`
