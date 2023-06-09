import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateCafeBDto } from "../dtos/UpdateCafeB.dto";
import { createcafeBOrdersServices } from "../services/cafeBorders.services";
import { CafeBOrderDto } from "../dtos/CreateBorders.dto";

@Controller('cafeBorders')
@ApiTags('Cafe B Orders')
export class cafeBordersController {
  constructor(private orderService: createcafeBOrdersServices) {}

  @Get()
  @ApiOperation({ summary: 'Get Cafe B Orders' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  async findCafeBOrders() {
    const orders = await this.orderService.findCafeBOrders();
    return orders;
  }

  @Post()
  @ApiOperation({ summary: 'Create Cafe B Order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  createCafeBOrders(@Body() createCafeBOrderDto: CafeBOrderDto) {
    this.orderService.createCafeBOrders(createCafeBOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Cafe B Order by ID' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateCafeBDto: UpdateCafeBDto) {
    await this.orderService.updateCafeAOrder(id, updateCafeBDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Cafe B Order by ID' })
  @ApiResponse({ status: 204, description: 'Order deleted successfully' })
  deleteCafeBorders(@Param('id', ParseIntPipe) id: number) {
    this.orderService.deleteOrderById(id);
  }
}
