var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Persona = new Schema ({
  rut: {type: String,
        required: 'Debes ingresar un RUT',
        validate: {
            validator: function (v) {
            return /\b\d{1,8}\-[k|0-9]/.test(v);
            },
            message: '{VALUE} no es un rut válido (ej: 16608034-7)'}
        },
  nombre: {type: String,
           required: 'Debes ingresar un nombre'},
  apellido: {type: String,
             required: 'Debes ingresar un apellido'},
  cambios: [{company: {type: String,
                       required: 'Debes ingresar una empresa'},
             store: {type: String,
                     required: 'Debes ingresar una tienda'},
             product: {type: String,
                       required: 'Debes ingresar el producto'},
             fecha: {type: Date, default: Date.now}}]
});

module.exports = mongoose.model('Persona', Persona);
