const express = require('express');
const Student = require('../student');

const router = express.Router();

router.post('', (req, res, next) => {
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  student.save().then(data => {
    res.status(201).json({
      message: 'estudiante creado',
      student: {
        ...data,
        id: data._id
      }
    });
  })
  .catch(error => {
    console.log('error', error)
    res.status(500).json({
      message: 'error al crear el estudiante'
    });
  });
});


router.get('', (req, res, next) => {
  const postQuery = Student.find();
  postQuery.then(documents => {
    res.status(200).json({
      message: 'lista de estudiantes',
      students: documents
    })
  });
});

router.put('/:id', (req, res, next) => {
  const student = new Student({
    _id: req.body.id,
    test: req.body.test,
    task: req.body.task,
  });
  Student.updateOne({ _id: req.params.id }, student).then(respuest => {
    res.status(200).json({message: 'Actualizado'});
  }).catch(error =>{
    console.log('error', error);
  })
});
module.exports = router;
