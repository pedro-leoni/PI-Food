import { DataTypes, Model, Optional } from "sequelize";
import { RecipeAttributes } from "custom";
import { database } from "../config/db";
// import Diet from "./Diet";

interface RecipeCreationAttributes extends Optional<RecipeAttributes, "id"> {}


// TODO: definir como en los tutoriales
class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  public id!: string;
  public name!: string;
  public resume!: string;
  public rate!: number;
  public healthy_level!: number;
  public instructions!: string;
  public img!: string;
  public created_in_db!: boolean;
}

Recipe.init({
  id: {
    type: new DataTypes.UUID,
    allowNull: false,
    defaultValue: new DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  resume: {
    type: new DataTypes.TEXT,
    allowNull: false
  },
  rate: {
    type: new DataTypes.FLOAT
  },
  healthy_level: {
    type: new DataTypes.INTEGER
  },
  instructions: {
    type: new DataTypes.TEXT
  },
  img:{
    type: new DataTypes.STRING
  },
  created_in_db: {
    type: new DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
},{
  tableName: "recipes",
  sequelize: database,
  timestamps: true
})

export default Recipe;