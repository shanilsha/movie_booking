const { response } = require('express');
var express = require('express');
const app = require('../app');
var router = express.Router();
const adminHelpers=require('../helpers/admin-helpers');
const adminUsershelper = require('../helpers/adminUsershelper');


/* GET users listing. */
const verifyLogin=(req,res,next)=>{
  if(!req.session.admin){
    res.redirect('/admin/login')
  }else{
    next();
  }
}

const redirctToDashboard =(req,res,next)=>{
  if(req.session.admin){
    res.redirect('/admin')
  }else{
    next();
  }
}
router.get('/',verifyLogin,function(req, res, next) {
  
 

  
  let admin=req.session.admin
  res.render('admin/view-admin',{admin:true,Email:req.session.admin.Email})



  })

router.get('/',function(req,res,next){

  adminUsershelper.getAllOwners().then((owners)=>{
  res.render('admin/theater-management',{owners})



})


});

router.get('/login',redirctToDashboard,(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('admin/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false

  }
  

})

router.get('/theater-management',(req,res)=>{

  
  res.render('admin/theater-management')
})

router.get('/users-mangement',(req,res)=>{
  res.render('admin/users-mangement')
})

router.get('/add-users',(req,res)=>{
  res.render('admin/add-users')

})
router.post('/add-users',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);

  adminUsershelper.addUsers(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/owners-image/'+id+'.jpg',(err,done)=>{
      if(!err){

        res.render("admin/add-users")

      }else{
        console.log(err);
      }
    })
    res.render("admin/add-users")
  })
  
  
 
})

adminUsershelper.getAllOwners(req.body,(id)=>{
  
})

// router.post('/login',(req,res)=>{
//   if(req.session.admin){
//     res.redirect('/')
//   }else{
//     res.render('admin/login',{"loginErr:":req.session.loginErr})
//     req.session.loginErr=false
//   }
// })



router.post('/login',(req,res)=>{
  console.log(req.body)
  adminHelpers.doLogin(req.body).then((response)=>{
    console.log(response);
    if(response.status){
      req.session.admin=response.admin
      req.session.admin.Email
      req.session.admin.loggedIn=true
      res.redirect('/admin')
    }else{
      console.log('login failed frome admin.js')
      req.session.loginErr="Invalid username or password"

      res.render('admin/login',{error:req.session.loginErr})
    }

  })

  })

  router.get('/logout',(req,res)=>{
    req.session.admin=null
    res.redirect('/admin/login')
  })




module.exports = router;




