import { Column, DataType, Model, Table } from "sequelize-typescript"

@Table({
    timestamps: true,
    tableName: 'posts'
})

class Post extends Model{
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