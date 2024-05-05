const express= require('express')
const path = require('path')
const multer = require('multer')

const app = express();

const PORT = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

const upload = multer({ storage })

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({ extended: false}));   // middleware that helps to parse from data

app.get('/',(req,res)=>{
     res.render("homepage");
}) 

/* --------------------   Single File Upload  ----------------------*/
// app.post('/upload',upload.single('prIamge'),(req,res)=>{
//      console.log(req.body);
//      console.log(req.file);

//      res.redirect('/')
// })


/* ------------------  Multiple Files Upload  --------------------------*/
app.post('/upload',upload.fields([{name: 'prImage'},{name: 'coverImage'}]),(req,res)=>{
    console.log(req.body);
    console.log(req.files);

    res.redirect('/')
})

app.listen(PORT,()=>{
   console.log(`Server running on http://localhost:${PORT}`)
})