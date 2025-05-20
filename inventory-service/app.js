const express = require("express");

const app = express();

const port = 3000;

const {Eureka} = require("eureka-js-client");


const router = express.Router()

router.get('/api/v1/inventory', (req , res) =>{
    res.json({
        item: ["Milk" , "Eggs" ,"item 3"]
    })
})

app.use("/inventory-service" , router);

app.listen(port , ()=>{
    console.log(`Inventory service running at port ${port}`);

    client.start((err)=>{
        console.log(err);
        if (err){
            console.log("fail to eureka");
        }else{
            console.log("registered with eureka");
        }
    });
})

const client = new Eureka({
    instance: {
        app: "INVENTORY-SERVICE",
        hostName: "localhost",
        ipAddr: "127.0.0.1",
        port: {
            "$": 3000,
            "@enabled": "true"
        },
        vipAddress: "inventory-service",
        dataCenterInfo: {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name: "MyOwn",
        },
    },
    eureka: {
        host: "localhost",
        port: 8761,
        servicePath: "/eureka/apps/"
    },

});

