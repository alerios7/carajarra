var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Persona = require('../models/persona');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.query.rut) {
        var Persona = mongoose.model('Persona', Persona);
        Persona.findOne({'rut': req.query.rut} , function (err, persona) {
            if (err) {
                return handleError(err);
            }
            if (persona) {
                res.redirect('/personas/' + persona.id);
            } else {
                res.redirect('/personas/crear');
            }
        });
    } else {

        res.render('index', {
            user: req.user
        });
    }
});

module.exports = router;
