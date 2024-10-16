var Mascotas = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "El contenido no puede estar vacio!"});
        return;
    }

    // new user
    const user = new Mascotas({
        name : req.body.name,
        animal : req.body.animal,
        raza : req.body.raza,
        age : req.body.age,
        service : req.body.service,
        name2: req.body.name2,
        phone : req.body.phone,
        email : req.body.email
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "A ocurrido un error mientras estaba creando"
            });
        });
}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;

        Mascotas.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Mascota no encontrada con id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error al recuperar mascota con id " + id})
            })

    }else{
        Mascotas.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Se produjo un error al recuperar la información del usuario" })
            })
    }
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Los datos a actualizar no pueden estar vacíos"})
    }

    const id = req.params.id;
    Mascotas.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `No se puede actualizar la mascota con ${id}. ¡Tal vez la usuario no se encuentra!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error al actualizar la información del usuario"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Mascotas.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `No se puede eliminar con ID ${id}. Quizás la identificación sea incorrecta`})
            }else{
                res.send({
                    message : "La mascota fue eliminada exitosamente!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "No se pudo eliminar la mascota con id=" + id
            });
        });
}

