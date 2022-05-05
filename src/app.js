const express = require("express");
require("./db/connect");
const Register = require("./model/model");
const hbs = require("hbs");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const async = require("hbs/lib/async");
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

const templet_path = path.join(__dirname, "../templet/views");
const partials_path = path.join(__dirname, "../templet/partials");
app.use(express.static(templet_path));


app.set("view engine", "hbs");
app.set("views", templet_path);
hbs.registerPartials(partials_path)



app.get("/", (req, res) => {
    res.render("index");
});
app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});


app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {

            const userdata = new Register({
                firstname: req.body.fname,
                lastname: req.body.lname,
                company: req.body.company,
                email: req.body.email,
                password: password,
                cpassword: cpassword,
                phone: req.body.phone,
                subject: req.body.subject
            });
            const user = await userdata.save();
            res.render("index");
        }
        else {
            res.send("password is not match");
        }

    } catch (error) {
        res.status(401).send(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const lpassword = req.body.pass;
        const userlogin = await Register.findOne({ email: email });
        const ismatch = await bcrypt.compare(lpassword,userlogin.password);
        // res.send(userlogin);
        if (ismatch) {
                res.status(201).render("index");            
        } else {
            res.send("password is not match");
        }
    } catch (error) {
        res.status(401).send("invalid Email")
    }
});


const genrettoken = async() => {
        const token = await jwt.sign({id:"6273ca84254fa6b62eaf02ce"},"helloworld");
        console.log(token);
        const verifytoken = await jwt.verify(token,"helloworld");
        const user  = await Register.findOne({verifytoken})
        console.log(user);
}
genrettoken();

app.listen(port, () => {
    console.log(`this site port number ${port}`);
});