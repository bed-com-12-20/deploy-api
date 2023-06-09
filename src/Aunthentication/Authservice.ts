import { Injectable } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/services/users.services";

@Injectable()
export class AuthService {
  constructor(
    
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async authenticateUser(username: string, pass: string): Promise<string> {
    const users = await this.usersService.fetchUsers();
    const user = users.find((user) => user.username === username);

    if (!user || user.password !== pass) {
      throw new Error("Invalid username or password");
    }

    const payload = { username: user.username, sub: user.email };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
