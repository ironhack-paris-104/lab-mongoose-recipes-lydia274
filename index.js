const mongoose = require("mongoose")

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model")
// Import of the data from './data.json'
const data = require("./data")

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app"

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((mongoose) => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    await Recipe.create({
      title: "Pizza",
      level: "Easy Peasy",
      ingredients: "dough",
      cuisine: "italian",
      dishType: "main_course",
      duration: 15,
      creator: "moi",
    })

    const allRecipes = await Recipe.insertMany(data)
    for (let oneRecipe of allRecipes) {
      console.log(oneRecipe.title)
    }

    await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }{ duration: 100 })
    console.log("modified w success");

    await Recipe.findOneAndDelete({ title: "Carrot Cake" })
    console.log("it's ok now")
  })


  .catch((error) => {
    console.error("Error connecting to the database", error)
  })
.finally(() => {
  mongoose.disconnect();
  console.log("bye")
})