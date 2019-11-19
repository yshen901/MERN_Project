const express = require("express");
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require('path');
const app = express();

const users = require("./routes/api/users");
const recipes = require('./routes/api/recipes');
const Recipe = require('./models/Recipe');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


app.use("/api/users", users);
app.use("/api/recipes", recipes);

app.get("/api/recipes/", (req, res) => {
    const recipe = new Recipe({
      vegetarian: true,
      vegan: true,
      glutenFree: false,
      dairyFree: true,
      veryHealthy: true,
      cheap: false,
      veryPopular: true,
      sustainable: false,
      weightWatcherSmartPoints: 6,
      gaps: "no",
      lowFodmap: false,
      ketogenic: false,
      whole30: false,
      preparationMinutes: 5,
      cookingMinutes: 10,
      sourceUrl: "http://minimalistbaker.com/three-color-pasta-with-roasted-red-pepper-sauce/",
      spoonacularSourceUrl: "https://spoonacular.com/three-color-pasta-with-sun-dried-tomato-sauce-500803",
      aggregateLikes: 799,
      spoonacularScore: 100,
      healthScore: 98,
      creditsText: "Minimalist Baker",
      sourceName: "Minimalist Baker",
      pricePerServing: 218.7,
      id: 500803,
      title: "Three Color Pasta with Sun Dried Tomato Sauce",
      readyInMinutes: 15,
      servings: 1,
      image: "https://spoonacular.com/recipeImages/500803-312x231.jpg",
      imageType: "jpg",
      cuisines: [],
      dishTypes: [
        "side dish"
      ],
      diets: [
        "dairy free",
        "lacto ovo vegetarian",
        "vegan"
      ],
      occasions: [],
      winePairing: {
        "pairedWines": [],
        "pairingText": "No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.",
        "productMatches": []
      },
      analyzedInstructions: [],
      usedIngredientCount: 0,
      missedIngredientCount: 5,
      ingredients: [
        {
          "id": 11124,
          "amount": 1,
          "unit": "",
          "unitLong": "",
          "unitShort": "",
          "aisle": "Produce",
          "name": "carrot",
          "original": "1 carrot",
          "originalString": "1 carrot",
          "originalName": "carrot",
          "metaInformation": [],
          "image": "https://spoonacular.com/cdn/ingredients_100x100/sliced-carrot.png"
        },
        {
          "id": 11955,
          "amount": 3,
          "unit": "Tablespoons",
          "unitLong": "Tablespoons",
          "unitShort": "Tbsp",
          "aisle": "Canned and Jarred;Produce",
          "name": "sun dried tomato",
          "original": "3 Tablespoons sun dried tomato spread (or pureed sun dried tomatos)",
          "originalString": "3 Tablespoons sun dried tomato spread (or pureed sun dried tomatos)",
          "originalName": "sun dried tomato spread (or pureed sun dried tomatos)",
          "metaInformation": [
            "dried",
            "pureed",
            "(or sun tomatos)"
          ],
          "extendedName": "pureed sun dried tomato",
          "image": "https://spoonacular.com/cdn/ingredients_100x100/sundried-tomatoes.jpg"
        },
        {
          "id": 11549,
          "amount": 0.5,
          "unit": "cup",
          "unitLong": "cups",
          "unitShort": "cup",
          "aisle": "Canned and Jarred",
          "name": "tomato sauce",
          "original": "1/2 - 1/3 cup tomato sauce",
          "originalString": "1/2 - 1/3 cup tomato sauce",
          "originalName": "tomato sauce",
          "metaInformation": [],
          "image": "https://spoonacular.com/cdn/ingredients_100x100/tomato-sauce-or-pasta-sauce.jpg"
        },
        {
          "id": 10020124,
          "amount": 2,
          "unit": "ounces",
          "unitLong": "ounces",
          "unitShort": "oz",
          "aisle": "Pasta and Rice",
          "name": "whole wheat spaghetti",
          "original": "2 ounces whole wheat spaghetti (a small handful)",
          "originalString": "2 ounces whole wheat spaghetti (a small handful)",
          "originalName": "whole wheat spaghetti (a small handful)",
          "metaInformation": [
            "whole wheat",
            "(a small handful)"
          ],
          "image": "https://spoonacular.com/cdn/ingredients_100x100/whole-wheat-spaghetti.jpg"
        },
        {
          "id": 11477,
          "amount": 1,
          "unit": "small",
          "unitLong": "small",
          "unitShort": "small",
          "aisle": "Produce",
          "name": "zucchini",
          "original": "1 small-medium zucchini",
          "originalString": "1 small-medium zucchini",
          "originalName": "-medium zucchini",
          "metaInformation": [],
          "image": "https://spoonacular.com/cdn/ingredients_100x100/zucchini.jpg"
        }
      ],
      likes: 0,
      usedIngredients: [],
      unusedIngredients: [],
      nutrition: [
        {
          "title": "Calories",
          "amount": 310.483,
          "unit": "cal"
        },
        {
          "title": "Protein",
          "amount": 14.0237,
          "unit": "g"
        },
        {
          "title": "Fat",
          "amount": 1.98379,
          "unit": "g"
        },
        {
          "title": "Carbohydrates",
          "amount": 67.0094,
          "unit": "g"
        }
      ]
    });
    recipe.save()
      .then(recipe => res.json(recipe));
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}