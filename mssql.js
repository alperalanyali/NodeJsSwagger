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
exports.connectDB =  {
    connect: ()=>{
        sql.connect(config, function (err) {
    
            if (err) console.log(err);
    
            // create Request object
            var request = new sql.Request();
               
            // query to the database and get the records
            request.query(`select * from Personel where Id ='D939D502-9318-4567-8DCD-EA7C54D79199' `, function (err, recordset) {
                
                if (err) console.log(err)
    
                // send records as a response
                console.log(recordset);
                return recordset;
                
            });
        });
    }   
    
    
}