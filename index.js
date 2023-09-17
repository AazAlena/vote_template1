let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
})

app.use(express.json());
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tick-tack-toe');

// Схемы
let goesSchema = new mongoose.Schema({
    first:String,
    second:String,
    coordinats: String
});

let Goes = mongoose.model('goes', goesSchema);

// Раздача статики
app.use(express.static(`public`));

// Роуты API

app.get(`/`, async function(req, res){
    
})

// app.post(`/votes/create`, async function(req, res){
//     let title1 = req.body.title;
//     let description1 = req.body.description;
//     let vote = new Vote({
//         title: title1,
//         description: description1,
//         positive: 0,
//         negative: 0
//     })

//     await vote.save();
//     res.send(vote)
// })
