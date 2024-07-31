const express = require('express');
const { getUsers, addUser, updateUser, deleteUser,getAddedUsers, getAddedUsersById } = require('../controllers/user');
const router = express.Router();

router.get('/', getUsers);
router.get('/added', getAddedUsers);
router.get('/added/:id', getAddedUsersById)
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
