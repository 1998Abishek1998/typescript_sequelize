import { compareSync, hashSync } from "bcrypt"
import { DataTypes, UUIDV4 } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript"
import Post from "../post/post.model";

@Table({
    timestamps: true,
    tableName: 'users'
})

class User extends Model{
    @PrimaryKey
    @Column({
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
        validate:{
            isUUID: 4
        }
    })
    id!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: 6,
            max: 20
        }
    })
    name!: string

    @HasMany(() => Post)
    posts!: Post[];

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    })
    email!: string

    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values:['admin','customer','staff'],
    })
    role!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            min: 8,
            max: 15
        },
        set(value: string){
            this.setDataValue('password', hashSync(value, 10))
        }
    })
    password!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            is: ["[0-9]"],
            min: 18,
        }
    })
    age!: string

    static validatePassword(user: any, password: string): boolean{
        return compareSync(password, user.password)
    }
}

export default User