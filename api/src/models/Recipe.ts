import { Table, Model, Column, DataType, PrimaryKey, Default, HasMany, AllowNull, ForeignKey} from 'sequelize-typescript';
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

  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public resume!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  public rate!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public healthy_level!: number;
  
  @Column(DataType.TEXT)
  public instructions!: string;
  
  @Column(DataType.STRING)
  public img!: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  public created_in_db!: boolean;
  
  @HasMany(()=> Diet, "recipes_diet")
  diets?: [DietAttributes] | undefined;
}