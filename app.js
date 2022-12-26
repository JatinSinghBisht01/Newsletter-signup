const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firsName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FName: firsName,
                    LName: lastName
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url ="https://us13.api.mailchimp.com/3.0/lists/86ce06e386";
    const options = {
        method: "POST",
        auth: "jatin:8187f05d0224b3c244fd027f3363b0a9-us13"
    }
    const request1 = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request1.write(jsonData);
    request1.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT ||3000, function () {
    console.log("Server is running on port.");
});

//Mailchimp api
//api key
//8187f05d0224b3c244fd027f3363b0a9-us13

//unique/audience id/list id
//86ce06e386
