import Diet from "../models/Diet";
import Recipe from "../models/Recipe";

Diet.belongsToMany(Recipe, {through: "recipes_diet"});
Recipe.belongsToMany(Diet, {through: "recipes_diet"});