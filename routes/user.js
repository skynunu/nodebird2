const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');
const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));//자동으로 팔로우 하도록  SQL문을 짬
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:id/unfollow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10)); //자동으로 팔로우 끊게 하도록  SQL문을 짬
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/profile', async(req,res,next)=>{
  try{
      await User.update({nick : req.body.nick}, {
      where : { id : req.user.id },
    });
    res.redirect('/profile');
  }catch(error){
    console.error(error);
    next(error);
  }
});


module.exports = router;