const http = require("http");
const writeToFile = require('./writeWithPromisesAwait');
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter something below.";
let list = [];
// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {

  form_body =  `
    <body>
      <p>Welcome to my note app</p>
      <div 
        style="border: 1px solid #cdcdcd80;
        padding: 2px 10px;
        border-radius: 3px;
        width: 20%;
        position: relative;"
      >`; 
    for(i=0; i<list.length; i++){
        form_body += `
        <div style="
          border-bottom: 1px solid #f1f1f1;
          padding: 5px 5px;"
        > 
          <p style="padding: 0; margin: 0; ">${list[i]}</p>
        </div>`    
    }

  form_body += `
      </div>
      <form method="POST" style="width:20%">
        <input name="item" placeholder="Please enter you note here ... " style="width:100%; margin-top: 5px; padding: 5px;"></input>
        <button type="submit" style="width:100%; margin-top: 5px;">Submit</button>
      </form>
    </body>`;

  return form_body;
};


const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      
      // here, you can add your own logic
      if (body["item"]) {
        item = body["item"].replace(/\+/g, " ");
        writeToFile.writer(item);
        list.push(item);
      } else {
        item = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});
server.on("request", (req) => {  
  console.log("event received: ", req.method, req.url);  
});  

server.listen(3000);
console.log("The server is listening on port 3000.");