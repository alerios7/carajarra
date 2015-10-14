var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Persona = require('../models/persona');
var Cuenta = require('../models/cuenta')
var moment = require('moment');


router.use(function(req, res, next){
    if(!req.user) {
        console.log("entro aqui");
        return res.redirect('/');
    }
    return next();
});


/* GET personas listing. */
router.get('/', function(req, res, next) {
    Persona.find(function(err, personas){
        if (err) {
            console.log(err);
        } else {
            console.log(personas);
            return res.render('personas/lista', {
                title: "Personas",
                personas: personas,
                moment: moment,
                user: req.user
            });
        }
    });
});



/* Formulario para crear persona */
router.get('/crear', function(req, res, next) {
    Cuenta.findOne({'username': req.user.username}, 'username company store', function (err, usuario) {
        if (err) {
            return handleError(err);
        }
        userComplete = usuario
        res.render('personas/crear', {
            title: 'Crear persona',
            user: req.user,
            userComplete: usuario
        });
    });
});


router.post('/crear', function(req, res, next){
    var unaPersona = Persona({
        rut: req.body.rut.toLowerCase(),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cambios: [{company: req.body.company, store: req.body.store, product: req.body.product}]
    });

    unaPersona.save(function(err, laPersona){
        if(err){
            console.log(err);
            res.render("personas/crear", {
                title: 'Crear persona',
                user: req.user,
                err: err
            });
        } else {
            res.redirect("/personas/" + laPersona.id);
        }
    });
});

/* GET una persona. */
router.get('/:id', function(req, res, next) {

    Persona.findById(req.params.id, function(err, persona) {
        if (err) {
            console.log(err);
        } else {
            if (req.user) {
                Cuenta.findOne({'username': req.user.username}, 'username company store', function(err, usuario){
                    res.render('personas/unasola', {
                        title: 'Persona',
                        persona: persona,
                        cambios: persona.cambios,
                        moment: moment,
                        user: req.user,
                        userComplete: usuario
                    });
                });
            }
        }
    });
});

router.post('/:id', function(req, res, next) {
    Persona.findByIdAndUpdate(req.params.id,
        {$push: {"cambios": {company: req.body.company, store: req.body.store, product: req.body.product}}},
        {safe: true, upsert: true, new: true},
        function(err, persona) {
            if (err) {
                console.log(err);
                res.render('persona/unasola');
            } else {
                console.log(persona);
                res.redirect('/personas/' + persona.id);
            }
    });
});

/* DELETE un persona. */
router.get('/:id/borrar', function(req, res, next) {
    Persona.findOneAndRemove(
        {
            _id: req.params.id
        },
        function(err, persona) {
            if (err) {
                console.log(err);
            } else {
                console.log(persona);
                res.redirect("/personas")
            }
        });
});

module.exports = router;
