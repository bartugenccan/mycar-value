import { BadRequestException, Injectable } from "@nestjs/common";

// Entities
import { User } from "./user.entity";

// Services
import { UsersService } from "./users.service";

// Hashind
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signup(email: string, password: string): Promise<User> {
        // See if email is in use
        const users = await this.usersService.find(email);

        // If email is in use, throw an error
        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        // Generate a salt
        const salt = randomBytes(8).toString('hex');

        // Hash the password with the salt
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed password and the salt together
        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save it
        const user = await this.usersService.create(email, result);

        // Return the user
        return user;
    }
}