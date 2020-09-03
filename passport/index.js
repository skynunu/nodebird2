const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports=()=>{
    passport.serializeUser((user,done)=>{ // 로그인시 실행되며, req.session객체에 어떤 데이터를 저장할지 정하는 메서드
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{// 매요청시 실행되고 세션에 저장했던 아이디를 받아서, 데이터베이스에서 사용자 정보를 조회
        User.findOne({
            where:{id},
            include:[{
                model:User,
                attributes:['id', 'nick'],
                as : 'Followers',
            },{
                model : User,
                attributes : ['id', 'nick'],
                as : 'Followings',
            }],
        })
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });

    local();
    kakao();
};