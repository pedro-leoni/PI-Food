import Diet from "../models/Diet";
import Recipe from "../models/Recipe";

// TODO: fix relations

Diet.belongsToMany(Recipe, {through: "recipes_diet"});
Recipe.belongsToMany(Diet, {through: "recipes_diet"});