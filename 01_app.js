const express = require('express');
const app = express();
app.use(express.static('public'));
const MongoClient = require('mongodb').MongoClient;
const util = require("util");
const ObjectID = require('mongodb').ObjectID;

/* on associe le moteur de vue au module «ejs» */
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs'); // générateur de template

let db

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
	if (err) return console.log(err)
	db = database.db('carnet_adresse')
	// lancement du serveur Express sur le port 8081
	app.listen(8081, () => {
		console.log('connexion à la BD et on écoute sur le port 8081')
	})	
})

app.get('/accueil', function(req,res) {
	res.render('components/accueil.ejs')
})


app.get('/list', function (req, res) {
   var cursor = db.collection('adresse').find().toArray(function(err, resultat){
	if (err) return console.log(err)
 	console.log('util = ' + util.inspect(resultat));
	res.render('components/adresse.ejs', {adresses: resultat})
	}) 
})

// ====================== POUR AJOUTER
app.post('/ajouter', (req, res) => {
console.log('req.body' + req.body)
 if (req.body['_id'] != '')
 { 
 console.log('sauvegarde') 
 var oModif = {
 "_id": ObjectID(req.body['_id']), 
 nom: req.body.nom,
 prenom:req.body.prenom, 
 telephone:req.body.telephone,
courriel:req.body.courriel
 }
 var util = require("util");
 console.log('util = ' + util.inspect(oModif));
 }
 else
 {
 console.log('insert')
 console.log(req.body)
 var oModif = {
 nom: req.body.nom,
 prenom:req.body.prenom, 
 telephone:req.body.telephone,
courriel:req.body.courriel
 }
 }
 db.collection('adresse').save(oModif, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/list')
 })
})
