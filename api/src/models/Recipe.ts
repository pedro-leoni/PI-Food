import { Table, Model, Column, DataType, PrimaryKey, Default, HasMany, AllowNull } from 'sequelize-typescript';
import { DietAttributes, RecipeAttributes } from "custom";
import {Diet} from "./Diet";
import { Optional } from 'sequelize';

interface RecipeCreationAttributes extends Optional<RecipeAttributes, "id"> {}


@Table({
  timestamps: false,
  tableName: 'recipes',
})
export class Recipe extends Model<RecipeAttributes> implements RecipeAttributes {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id!: string;

  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public resume!: string;

  @Column(DataType.FLOAT)
  public rate!: number;
  
  @Column(DataType.INTEGER)
  public healthy_level!: number;
  
  @Column(DataType.TEXT)
  public instructions!: string;
  
  @Column(DataType.STRING)
  public img!: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  public created_in_db!: boolean;

  // @HasMany(()=>Diet)
  // diets?: [DietAttributes] | undefined;
}

// Recipe.init({
//   id: {
//     type: new DataTypes.UUID,
//     allowNull: false,
//     defaultValue: new DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   name: {
//     type: new DataTypes.STRING,
//     allowNull: false
//   },
//   resume: {
//     type: new DataTypes.TEXT,
//     allowNull: false
//   },
//   rate: {
//     type: new DataTypes.FLOAT
//   },
//   healthy_level: {
//     type: new DataTypes.INTEGER
//   },
//   instructions: {
//     type: new DataTypes.TEXT
//   },
//   img:{
//     type: new DataTypes.STRING
//   },
//   created_in_db: {
//     type: new DataTypes.BOOLEAN,
//     defaultValue: true,
//     allowNull: false
//   }
// },{
//   tableName: "recipes",
//   sequelize: database,
//   timestamps: true
// })

// export default Recipe;