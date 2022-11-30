const express = require("express");
const path = require("path");
const axios = require("axios");
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
    console.log(articles);
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

// fetchArticles("", "");

// ARTICLES DOESN'T EXIST IN THE GLOBAL SCOPE, WHICH MEANS I CAN'T DISPLAY IT
// console.log(articles);

//Testing Out EJS YARELINE

app.get("/", function (req, res) {
  // const displayArticles = fetchArticles("europe", "");
  // console.log(displayArticles);
  // console.log(articles);
  res.render("news");
  // { articles: displayArticles });
  // , {articles: articles });
  //sends back the rendered HTML string to the client
  //second argument must be an object
  res.end();
});

app.get("/asia", function (req, res) {
  const displayArticles = fetchArticles("asia", "");
  console.log(displayArticles);
  // console.log(articles);
  res.render("news");
  // { articles: displayArticles });
  // , {articles: articles });
  //sends back the rendered HTML string to the client
  //second argument must be an object
  res.end();
});

// STARTS LISTENING TO SERVER
app.listen(3000);
