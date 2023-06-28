import { AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterRemove()
    logRemove() {
        console.log(`User with id ${this.id} has been removed`)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`User with id ${this.id} has been updated`)
    }

}