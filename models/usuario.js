const {Schema, model} = require('mongoose')

const HurtosSchema = Schema({

    direccion: {
        type: String,
        required: [true, 'La dirección es requerida']
    },

    latitud: {
        type: Number,
        required: [true, 'La latitud es requerida'],
        validate: {
            validator: function (value) {
              return value >= 6.13  && value <= 6.217 ;
            },
            message: 'Latitudes permitidas entre 6.217 & 6.13',
          },
    },

    longitud: {
        type: Number,
        required: [true, 'La longitud es requerida'],
        validate: {
            validator: function (value) {
              return value >= -75.567 && value <= -75.34;
            },
            message: 'Longitudes permitidas entre -75.34 & -75.567',
          },
    },

    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida']
    },

    fecha: {
        type: Date,
    }


});

HurtosSchema.pre('save', function (next) {
        this.fecha = new Date();
        next();
      });


module.exports = model('Hurtos', HurtosSchema)