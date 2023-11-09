import { database } from "../config/db";
import { DietAttributes } from "custom";
import { Table, Model, Column, DataType, PrimaryKey, Default } from 'sequelize-typescript';
// import Recipe from "./Recipe";


@Table({
  timestamps: false,
  tableName: 'diets',
})
export class Diet extends Model<DietAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;
}


// TODO: definir como en los tutoriales
// class Diet extends Model<DietAttributes> {
//   public name!: string;
// }

// Diet.init({
//   name: {
//     type: new DataTypes.STRING,
//     primaryKey: true
//   }
// },{
//   tableName: "diets",
//   sequelize: database
// })

// export default Diet;