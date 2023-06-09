import { Delete, Get, Injectable, Param, ParseIntPipe, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CafeB } from "../../typeorm/entities/CafeB";
import { Repository } from "typeorm";
import { UpdateCAfeBOrderparams } from "../utils/types";

@Injectable()
export class createcafeBOrdersServices {
  constructor(@InjectRepository(CafeB) private CafeBRepository: Repository<CafeB>) {}

  async findCafeBOrders(): Promise<CafeB[]> {
    return this.CafeBRepository.find();
  }

  async createCafeBOrders(OrderDetails: UpdateCAfeBOrderparams): Promise<void> {
    const newOrder = this.CafeBRepository.create({
      ...OrderDetails,
      orderedAt: new Date(),
    });
    await this.CafeBRepository.save(newOrder);
  }

  async countOrders(): Promise<number> {
    return this.CafeBRepository.count();
  }

  async updateCafeAOrder(id: number, updatecafeADetails: UpdateCAfeBOrderparams): Promise<void> {
    await this.CafeBRepository.update(id, updatecafeADetails);
  }

  async deleteOrderById(id: number): Promise<void> {
    await this.CafeBRepository.delete(id);
  }
}
