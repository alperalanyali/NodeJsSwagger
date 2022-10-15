var express = require('express');
var app = express();
var bodyparser = require('body-parser');


app.use(bodyparser.urlencoded({extended:true}));
const  userList = [{
    username:"ALper"
},{
    username:"Mert"
}]
var swaggerUI = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
app.use('/swagger',swaggerUI.serve,swaggerUI.setup(swaggerDocument));


app.get("/users", (req,res)=>{
    return res.status(200).send({
        success: "true",
        message: "users",
        users:userList ,
      });
})
app.get("/", (req,res)=>{
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'Metallica1',
        server: 'localhost', 
        database: 'kuika_aslanege',
        trustServerCertificate: true,
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(`select * from Rol  order by SiraNo`, function (err, recordsets) {
            
            if (err) console.log(err)

            // send records as a response
            recordsets.recordset.forEach(record =>{
                console.log(record.Adi);
            })
            res.send(recordsets.recordset);
            
        });
    });

})
app.use(
    '/swagger',
    swaggerUI.serve, 
    swaggerUI.setup(swaggerDocument)
  );
app.listen(8000,()=>{
    console.log("server is listenint to port 8000");
})