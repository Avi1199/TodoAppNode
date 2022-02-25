var express = require('express');
var router = express.Router();
const Todo = require('../Model/Todo')

router.post('/addTodo', async (req, res) => {
  try {
    const Data = {
      Subject: req.body.Subject,
      Task: req.body.Task
    }
    const foundData = await Todo.findOne({ Subject: Data.Subject })
    if (foundData) {
      return res.json({ msg: 'Data Already exists' })
    }
    const todo = new Todo()
    todo.Subject = Data.Subject
    todo.Task = Data.Task
    todo.save()

    res.json({
      msg: 'Added Todo Successfully'
    })
  } catch (error) {
    res.json({
      msg: 'Something went wrong'
    })
  }

})

router.get('/viewTodo', async (req, res) => {
  try {
    const view = await Todo.find()
    res.json({ msg: view })
  } catch (error) {
    res.json({
      msg: 'Something went wrong'
    })
  }
})

router.get('/deleteTodo/:id', async (req, res) => {
  try {
    const id = req.params.id
    const removeData = await Todo.findOneAndRemove({ _id: id })
    res.json({ msg: removeData })
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Something went wrong'
    })
  }
})

router.get('/updateTodo/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateData = await Todo.findOne({ _id: id })
    res.json({ msg: updateData })
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Something went wrong'
    })
  }
})

router.post('/updateTodo', async (req, res) => {
  try {
    const updateData = await Todo.findOneAndUpdate({ _id: req.body._id }, { $set: { Subject: req.body.Subject, Task: req.body.Task } })
    res.json({ msg: 'Update Successfully' })
  } catch (error) {
    res.json({ msg: error })
  }
})

module.exports = router;
