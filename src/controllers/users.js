const User = require('./../models/users');
const { estimatedDocumentCount } = require('./../models/users');
const Users = require('./../models/users')


function getOne(req,res){
    const key = req.body.id
    var condition = key ? { _id: req.body.id } : {};
    User.findOne(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred :("
      });
    });

}
function getAll(req,res){
    User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred :("
      });
    });
}

function editUser(req,res){
    if (!req.body) {
        return res.status(400).send({
          message: "Cannot update the object"
        });
      }    
      const key = req.params.id;
    
      User.findOneAndUpdate(key, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update`
            });
          } else res.send({ message: " updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating object" + id
          });
        });
}
function createUser(req,res){
    if(!req.body){
        res.status(400).send("cannot create the object");
    }
    else{
        const usr= new Users({name: req.body.name,
            email:req.body.email,
            username: req.body.username,
            age: req.body.age,
            password: req.body.password,
            active: req.body.active? req.body.active:false

        })
        try {
            usr.save( (err, user) => {
                if(err) throw Error(err);
                console.log('user created');
                return res.status(200).json({
                    status: 200,
                    response: user
                })
            })
        } catch (error) {
            res.status(400).json({
                status: 400,
                response: error
            })
        }
    }
}
function deleteUser(req,res){
    const name = req.params.name;

  User.findOneAndDelete(name)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete, not found`
        });
      } else {
        res.send({
          message: "this is the end babyy"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "this motherfucker wiil come back x_x" + id
      });
    });
}



module.exports = { deleteUser,createUser,editUser,getAll,getOne }