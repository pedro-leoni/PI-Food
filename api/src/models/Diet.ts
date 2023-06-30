import { database } from "../config/db";
import { DietAttributes } from "custom";
import { DataTypes, Model } from "sequelize";
// import Recipe from "./Recipe";

class Diet extends Model<DietAttributes> {
  public name!: string;
}

Diet.init({
  name: {
    type: new DataTypes.STRING,
    primaryKey: true
  }
},{
  tableName: "diets",
  sequelize: database
})

export default Diet;