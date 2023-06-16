//Importar paquetes requeridos de Node
const {response} = require('express')

//Importación de los modelos
const Hurto = require('../models/usuario')


//Consultar Hurtos
const hurtoGet = async(req, res = response) =>{
    const {nombre} = req.query //Desestructuración

    //Consultar todos los hurtos
    const hurtos = await Hurto.find()

    res.json({
        hurtos
    })   
}

//Registrar Hurto
const hurtoPost = async(req, res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''

    console.log(body)
    try {
        const hurto = new Hurto(body) //Instanciar el objeto   
        await hurto.save()
        mensaje = 'El registro se realizó exitosamente'
        
    } catch (error) {
        console.log(error)
        if (error) {
            if (error.name === 'ValidationError') {
               console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            }
        }
    }

    res.json({
        msg: mensaje
        
    })
}


//Modificar Hurto
const hurtoPut = async(req, res = response) => {

    const {id,direccion, latitud, longitud, descripcion} = req.body
    let mensaje = ''

    try{
        const usuario = await Hurto.findOneAndUpdate({_id:id},{direccion:direccion, latitud:latitud, longitud:longitud, descripcion:descripcion})
        mensaje = 'La modificación se efectuó exitosamente'

    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
        
    })
}

//Eliminar Usuario
const hurtoDelete = async(req, res = response) => {

    const {_id} = req.body
    let mensaje = ''

    try{
        const usuario = await Hurto.deleteOne({_id: _id})
        mensaje = 'La eliminiación se efectuó exitosamente.'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    hurtoGet,
    hurtoPost,
    hurtoPut,
    hurtoDelete
}

/*Crear una API con los métodos GET y POST para registrar y consultar
en una colección el número de ambiente, la fecha, hora, temperatura y 
nombre usuario

*Desplegar la API en render o el servidor de su preferencia
*/
