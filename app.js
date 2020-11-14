const express = require('express');
const exhbs = require('express-handlebars');
const products = require('./products.json');

const PORT = process.env.PORT || 4444;    // Переменная для порта с хироку

const app = express();

app.use(express.static('public')); // регистрация мидл вара
app.set('view engine', 'hbs'); // по умолчанию експресс использует дпугой шаблонизатор. Подключаем Хендлбарс
app.engine(
  'hbs',
  exhbs({
    extname: 'hbs',
  }),
);

app.get('/', (req, res) => {
  //console.log('Это колбек для app.get("/")');
  // console.log(req.url);   // смотрим с какоо юрл был запрос
  //res.send({name: 'mango'})  // отправляем ответ с бекенда в формате json
  //   res.send('<h1>Привет єто / </h1>');
  res.render('home', { pageTitle: 'Главная' }); // указываем название шаблонной строки
});

app.get('/about', (req, res) => {
  // console.log('Это колбек для app.get("/about")');
  // console.log(req.url);
  //   res.send('<h1>Привет это /about </h1>');
    res.render('about', { pageTitle: 'О нас' }); // указываем название шаблонной строки
});

app.get('/products', (req, res) => {
    res.render('products', {
        products, cssFileName: 'products', pageTitle: 'Наши продукты'
    }); // указываем название шаблонной строки
});

app.get('/product/:productId', (req, res) => {
  // Динамически подставляем ID (динамический параметр)
  console.log(req.params);

    const product = products.find(p => p.id === req.params.productId); //  если у продукта свойство ID совпадат с req.params.productId - тогда это наш продукт
    res.render('product', { product });
})         

app.listen(PORT, () => {
  console.log(`Application server is running on port ${PORT}`);
});
