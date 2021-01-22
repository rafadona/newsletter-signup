const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));





app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    

    const data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    EMAIL: email,
                    FNAME: firstName,
                    LNAME: lastName,
                    
                }

            }
        ]
    };
   

    const jsonData = JSON.stringify(data);
    // const listId = "3c137cd8eb";
    const url = "https://us7.api.mailchimp.com/3.0/lists/3c137cd8eb";

// const apiKey = "d9a187d3a2a3f4f5d62ecedaaaa822df-us7";
const options = {
    method: "POST",
    auth: "rafael1:d9a187d3a2a3f4f5d62ecedaaaa822df-us7"
}

const request = https.request(url, options, function (response) {
    if(response.statusCode === 200){       
            res.sendFile(__dirname + "/success.html");            
        
    }else if(response.statusCode != 200){
        res.sendFile(__dirname + "/failure.html");     
    }

    response.on("data", function(data) {
        console.log(JSON.parse(data));
    }) 
})

request.write(jsonData);
    request.end();

});




app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3300, function () {
    console.log("server is running on port 3300");

});

