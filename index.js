const express = require("express");
const path = require("path");
const axios = require("axios");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// BODY PARSER
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "views");

// MySQL Connection
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "J@feth2003",
  database: "hope",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});

const fetchArticles = async (region, source) => {
  const articles = [];
  // FETCH ARTICLE API FUNCTION
  const fetchArticleAPI = async (region, source) => {
    const options = {
      method: "GET",
      url: `https://energy-price-news.p.rapidapi.com/news${region}${source}`,
      headers: {
        "X-RapidAPI-Key": "c3cce5dbc7msh1c04466a37c291ep190b64jsn296e149402d3",
        "X-RapidAPI-Host": "energy-price-news.p.rapidapi.com",
      },
    };

    await axios.request(options).then(function (response) {
      for (const [key, value] of Object.entries(response.data)) {
        articles.push({ id: key, ...value });
      }
    });
  };

  // IF THERE IS ONLY A REGION
  if (region !== "") {
    await fetchArticleAPI(`/regions/${region}`, "");
    // console.log(articles);
    return articles;
    // IF THERE IS ONLY A SOURCE
  } else if (source !== "") {
    await fetchArticleAPI("", `/sources/${source}`);
    // console.log(articles);
    return articles;
    // IF THEY WANT ALL ARTICLES
  } else {
    await fetchArticleAPI("", "");
    // console.log(articles);
    return articles;
  }
};

//Testing Out EJS YARELINE

app.get("/", async (req, res) => {
  res.render("news");
  //sends back the rendered HTML string to the client
  //second argument must be an object
  res.end();
});

app.post("/signup", (req, res) => {
  con.query(
    "INSERT INTO userData(name, email, region) VALUES('" +
      req.body.name +
      "', '" +
      req.body.email +
      "', '" +
      req.body.regions +
      "')",
    function (result, err) {
      if (err) console.log(err);
      console.log("DATA SENT!");
    }
  );
  res.render("news");
});

// REGION ROUTES
app.get("/americas", async (req, res) => {
  const displaySources = await fetchArticles("americas", "");
  // const displayArticles = await fetchArticles("", "");
  res.render("americas", { sources: displaySources });
  // res.render("regions", { regions: displayRegions, articles: displayArticles });
  res.end();
});

app.get("/asia", async (req, res) => {
  const displaySources = await fetchArticles("asia", "");
  res.render("asia", { sources: displaySources });
  res.end();
});

app.get("/europe", async (req, res) => {
  const displaySources = await fetchArticles("europe", "");
  res.render("europe", { sources: displaySources });
  res.end();
});

// AMERICAS ROUTES
app.get("/cnn", async (req, res) => {
  const displayArticles = await fetchArticles("", "cnn");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/cnbc", async (req, res) => {
  const displayArticles = await fetchArticles("", "cnbc");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/globeMail", async (req, res) => {
  const displayArticles = await fetchArticles("", "theglobeandmail");
  res.render("source", { articles: displayArticles });
  res.end();
});

// ASIA ROUTES
app.get("/abpNews", async (req, res) => {
  const displayArticles = await fetchArticles("", "abpnews");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/zeeNews", async (req, res) => {
  const displayArticles = await fetchArticles("", "zeeNews");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/economicTimes", async (req, res) => {
  const displayArticles = await fetchArticles("", "theeconomictimes");
  res.render("source", { articles: displayArticles });
  res.end();
});

// EUROPE ROUTES
app.get("/guardian", async (req, res) => {
  const displayArticles = await fetchArticles("", "theguardian");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/times", async (req, res) => {
  const displayArticles = await fetchArticles("", "thetimes");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/telegraph", async (req, res) => {
  const displayArticles = await fetchArticles("", "thetelegraph");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/skyNews", async (req, res) => {
  const displayArticles = await fetchArticles("", "skynews");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/reuters", async (req, res) => {
  const displayArticles = await fetchArticles("", "reuters");
  res.render("source", { articles: displayArticles });
  res.end();
});

app.get("/economist", async (req, res) => {
  const displayArticles = await fetchArticles("", "theeconomist");
  res.render("source", { articles: displayArticles });
  res.end();
});

//ALL ARTICLES
app.get("/allArticles", async (req, res) => {
  const displayArticles = await fetchArticles("", "");
  // console.log(displayArticles);
  res.render("allarticles", { articles: displayArticles });
  res.end();
});

// STARTS LISTENING TO SERVER
app.listen(3000);
