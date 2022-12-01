import { compareSync, hashSync } from "bcrypt"
import { BeforeCreate, Column, DataType, Model, Table } from "sequelize-typescript"

@Table({
    timestamps: true,
    tableName: 'users'
})

class User extends Model{
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            min: 8,
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

    @BeforeCreate
    static beforeCreateHook(user: any): void {
        if(user.password) {
            user.password =  hashSync(user.password, 10)
        }
    }

    static validatePassword(user: any, password: string): boolean{
        return compareSync(password, user.password)
    }
}

// User.beforeCreate(async (user, options) => {
//     console.log(user, options)
// })

export default User