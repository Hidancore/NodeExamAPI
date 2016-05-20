/**
 * Created by Alex on 18-05-2016.
 */

var express = require('express');
var cors = require('cors')
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var BodyParser = require('body-parser'); // middle



var url = 'mongodb://nick2463:kea240993#@ds025782.mlab.com:25782/movieapi';

app.use(cors());

app.use(BodyParser.urlencoded({
    extended: true
}));
app.use(BodyParser.json());

app.get('/movies', function(req, res) {

    MongoClient.connect(url, function(err, db){
        //Error in DB; return 500
        if(err){
            res.status(500);
            res.json({
                'error':'Internal database error'
            });
			}

            
         else{            var col = db.collection('movies');
            col.find().toArray(function(err, result){

                if(err){
                    res.status(500);
                    res.json({
                        'error': 'Internal database error'
                    })
                }else if (result !== null){
                    res.status(200);
                    res.json(result)
                } else {
                    res.status(404)
                    res.json({
                        "msg" : "empty"
                    })
                }

                db.close();
            });
        }
    });

});

// route which is used to find a single element in the database
app.get('/movies/:id', function(req, res) {

    MongoClient.connect(url, function(err, db){
        //Error in DB; return 500
        if(err){
            res.status(500);
            res.json({
                'error':'Internal database error'
            });
			}
            
         else{            var col = db.collection('movies');
            col.find({'_id' : ObjectId(req.params.id)}, function(err, result){ //prob

                if(err){
                    res.status(500);
                    res.json({
                        'error': 'Internal database error'
                    })
                }else if (result !== null){
                    res.status(200);
                    res.json(util.inspect(result))
                } else {
                    res.status(404)
                    res.json({
                        "msg" : "empty"
                    })
                }

                db.close();
            });
        }
    });

});


// Route that handles creation of new user

app.delete('/movies/:id', function(req, res) {

    MongoClient.connect(url, function(err, db){
        var col = db.collection('movies');
        col.remove({
            '_id' : ObjectId(req.params.id)
        }, function(err, result){
            if(err){
                res.status(500);
                res.json({
                    "error" : "Internal Server Error"
                })
            } else{
                res.status(202);
                res.json({
                    "msg" : "movie deleted"
                });
            }
        });
        db.close();
    });

});

// Route that handles creation of new user

app.post('/movies', function(req, res) {

    MongoClient.connect(url, function(err,db){
        if(err){
            res.status(500);
            res.json({
                "error": "Internal Server Error"
            });
        }else {
            var col = db.collection('Movies');

            col.insert(req.body, function(err, result){
                if(err){
                    res.status(500);
                    res.json({
                        "error": "Internal Server Error"
                    })
                } else if(result === null){
                    res.status(404).send({
                        "msg" : "404"
                    })

                } else {
                    res.status(201);
                    res.json({
                        "msg" : "movies created"
                    })
                }
                db.close();
            });

        }


    })

});

// Route that handles updates of a user

app.put('/movies/:id', function(req, res) {
    MongoClient.connect(url, function(err, db){
        if(err){
            res.status(500);
            res.json({
                "error" : "Internal Server Error"
            })
        } else{
            var col = collection.update({
                '_id' : ObjectID(req.params.id)
            }, {
                $set: req.body
            }, function(err, result){
                res.status(201);
                res.json({
                    "msg" : "movie updated"
                });
                db.close();
            });
        }
    })
});

app.use('/',function(req, res) {
    res.status(404);
    res.send({ 'msg': 'Page Not Found' });
})


app.listen(process.env.PORT || 3000);