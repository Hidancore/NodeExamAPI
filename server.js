/**
 * Created by Alex on 18-05-2016.
 */
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var BodyParser = require('body-parser'); // middle

var url = 'mongodb://Alex:2108@ds025232.mlab.com:25232/nodeandroid';

app.use(BodyParser.urlencoded({
    extended: true
}));
app.use(BodyParser.json());



app.use('/',function(req, res) {
    res.status(404);
    res.send({ 'msg': 'Page Not Found' });
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});