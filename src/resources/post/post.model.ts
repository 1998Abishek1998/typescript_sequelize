import { DataTypes, UUIDV4 } from "sequelize"
import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import User from "../user/user.model"

@Table({
    timestamps: true,
    tableName: 'posts'
})

class Post extends Model{
    @PrimaryKey
    @Column({
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        unique: true,
        validate: {
            isUUID: 4
        }
    })
    id?: string

    @ForeignKey(() => User)
    @Column({
        type: DataTypes.UUID
    })
    UserId?: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate:{
            min: 10
        }
    })
    title!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate:{
            min: 20,
            max: 200
        }  
    })
    description!: string
}

export default Post