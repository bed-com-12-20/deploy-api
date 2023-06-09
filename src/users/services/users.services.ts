import { Injectable } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { CreateUserparams, UpdateUserparams } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private userRepository:Repository<User>) {}

    async fetchUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(userDetails: CreateUserparams): Promise<User> {
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt: new Date(),
        });
        return this.userRepository.save(newUser);
    }

    async countUsers(): Promise<number> {
        return this.userRepository.count();
    }

    async updateUser(id: number, updateUserDetails: UpdateUserparams): Promise<void> {
        await this.userRepository.update(id, updateUserDetails);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
