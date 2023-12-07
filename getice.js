let o = {
    format:"urls"
  };
  
  let bodyString = JSON.stringify(o);
  let https = require("https");
  let options = {
    host: "es.xirsys.com",
    path: "/_turn/channelpath",
    method: "PUT",
    headers: {
      "Authorization": "Basic " + Buffer.from("testaccount:092ad88c-e96d-11e6-8a3b-b0db56058b9f").toString("base64"),
      "Content-Type":"application/json",
      "Content-Length": bodyString.length
    }
  };
  
  let httpreq = https.request(options, function(httpres) {
    let str = "";
    httpres.on("data", function(data){ str += data; });
    httpres.on("error", function(e){ console.log("error: ",e); });
    httpres.on("end", function(){
      console.log("response: ", str);
    });
  });
  
  httpreq.on("error", function(e){ console.log("request error: ",e); });
  httpreq.end(bodyString);