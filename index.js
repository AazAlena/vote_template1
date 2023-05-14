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
mongoose.connect('mongodb://127.0.0.1:27017/vote-app');

// Схемы
let votesSchema = new mongoose.Schema({
    title: String,
    description: String,
    positive: Number,
    negative: Number
});

let Vote = mongoose.model('votes', votesSchema);

// Раздача статики
app.use(express.static(`public`));

// Роуты API

app.get(`/votes/all`, async function(req, res){
    let votes = await Vote.find()
    console.log(votes)
    res.send(votes)
})

app.post(`/votes/create`, async function(req, res){
    let title1 = req.body.title;
    let description1 = req.body.description;
    let vote = new Vote({
        title: title1,
        description: description1,
        positive: 0,
        negative: 0
    })

    await vote.save();
    res.send(vote)
})

app.post(`/votes/remove`, async function(req, res){
    let id = req.body.id;
    await Vote.deleteOne({_id:id});
    res.send(200)
})

app.post(`/votes/positive`, async function(req, res){
    let id = req.body.id;
    let vote = await Vote.findOne({_id:id});
    vote.positive++;
    await vote.save();

    res.send(vote)
})

app.post(`/votes/negative`, async function(req, res){
    let id = req.body.id;
    let vote = await Vote.findOne({_id:id});
    vote.negative++;
    await vote.save();

    res.send(vote)
})
