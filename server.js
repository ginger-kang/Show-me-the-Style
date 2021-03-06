const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const app = express();
const cors = require("cors");
const path = require("path");
const aws_router = require("./aws-service/aws");
const { ApolloServer } = require("apollo-server-express");
const server = new ApolloServer({ schema, cors:false,graphiql: true });
const http = require('http');

app.use("/", aws_router);


app.use(express.static("dist"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

server.applyMiddleware({ app, credentials:true,path: "/graphql" });

const PORT = process.env.PORT || 5000 || 3000;

app.listen(PORT, () =>
  console.log(`Server started on ${PORT},${server.graphqlPath}`)
);



//for heroku non-sleep
setInterval(function(){
  http.get("http://iroiro.kro.kr");console.log("app excuted");
},1000000);