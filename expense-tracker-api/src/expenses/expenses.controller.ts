import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
  Req,
  Logger,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import {
  CreateExpenseDto,
  createExpenseSchema,
} from './dto/create-expense.dto';
import {
  UpdateExpenseDto,
  updateExpenseSchema,
} from './dto/update-expense.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  ExpenseFilterDto,
  expenseFilterSchema,
} from './dto/expense-filter.dto';
import { Request } from 'express';

// Custom interface for the request with user
interface RequestWithUser extends Request {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

@Controller('api/expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  private readonly logger = new Logger(ExpensesController.name);

  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createExpenseSchema))
    createExpenseDto: CreateExpenseDto,
    @Req() req: RequestWithUser,
  ) {
    this.logger.log(
      `Creating expense for user ${req.user.id}: ${JSON.stringify(createExpenseDto)}`,
    );
    try {
      const result = await this.expensesService.create(
        req.user.id,
        createExpenseDto,
      );
      this.logger.log(`Expense created successfully with ID: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Error creating expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(expenseFilterSchema))
    filters: ExpenseFilterDto,
    @Req() req: RequestWithUser,
  ) {
    return this.expensesService.findAll(req.user.id, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.expensesService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateExpenseSchema))
    updateExpenseDto: UpdateExpenseDto,
    @Req() req: RequestWithUser,
  ) {
    return this.expensesService.update(id, req.user.id, updateExpenseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    await this.expensesService.remove(id, req.user.id);
    return { message: 'Expense deleted successfully' };
  }
}
