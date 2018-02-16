const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB

const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')) // pour utiliser le dossier public

let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})

app.get('/adresse', (req, res) => {
 console.log('la route route get / = ' + req.url)
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit.ejs', {adresse: resultat})
 }) 
})

app.post('/ajouter', (req, res) => {
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
 })
})

app.get('/detruire/:telephone', (req, res) => {

 db.collection('adresse')
 .findOneAndDelete( {'telephone': req.params.telephone} ,(err, resultat) => {
 if (err) return res.send(500, err)
 var cursor = db.collection('adresse').find().toArray(function(err, resultat){
 if (err) return console.log(err)
 res.render('gabarit.ejs', {adresse: resultat})
 })

}) 
})


//pour détruire
const ObjectID = require('mongodb').ObjectID;

app.get('/detruire/:id', (req, res) => {
 var id = req.params.id 
// var critere = 'ObjectId("58bae3feaf5a674b240cfe53")'
// 58bae3feaf5a674b240cfe53
// var critere = ObjectID.createFromHexString(id)
var critere = ObjectID(req.params.id)
console.log(critere)

console.log(id)
 db.collection('adresse')
 .findOneAndDelete({"_id": critere}, (err, resultat) => {

if (err) return console.log(err)
 res.render('gabarit.ejs', {adresse: resultat})
 })
})

//pour trier
app.get('/trier/:______/:_______', (req, res) => {
	let cle = req.params.cle
 let ordre = (req.params.ordre == 'asc' ? 1 : -1)
 let cursor = db.collection('adresse').find().sort(cle,ordre).toArray(function(err, resultat){
 	 ordre = ______________________________
 res.render('adresses.ejs', {adresses: resultat, ______, _________ })

 //modifier
 app.post('/modifier', (req, res) => {
 	console.log('req.body' + req.body)
 if (req.body['_id'] != __________)
 { 
 console.log('sauvegarde') 
 var oModif = {
 "_id": ObjectID(req.body['_id']), 
 nom: req.body._____,
 prenom:req.body.______, 
 telephone:req.body._______
 }
 var util = require("util");
 console.log('util = ' + util.inspect(oModif));
 }
 else
 {
 console.log('insert')
 console.log(req.body)
 var oModif = {
 nom: req.body.______,
 prenom:req.body.______, 
 telephone:req.body._______
 }
 }
 
 db.collection('adresse').save(oModif, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/list')
 })