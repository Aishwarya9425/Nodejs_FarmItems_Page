const fs = require("fs");
const http = require("http");
const url = require("url");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avacado : ${textIn}.\nCreated on
// ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

//async, non blocking

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(`data3 is ${data3}`);
//     });
//   });
// });

// console.log("This will be printed first");

//top level code-- executed only once, even tho it is sync

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview page");
  } else if (pathName === "/product") {
    res.end("This is the product page");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    //instead of reading data from file everytime this route is hit, read it once in the beginning
    res.writeHead(404);
    res.end("Oops.. the page doesn't exist!!!");
  }
});

//http.. not https
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000.... ");
});
