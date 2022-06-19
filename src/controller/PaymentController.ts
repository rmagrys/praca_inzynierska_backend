import {
  Authorized,
  Get,
  JsonController,
  Param,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { PaymentService } from "../service/PaymentService";

@Service()
@JsonController("/api/payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Authorized()
  @Get("/user/:id/expenses")
  async getAllUserExpenses(
    @Param("id") userId: string,
    @QueryParam("year") year: string
  ) {
    return this.paymentService.getAllUserExpenses(userId, year);
  }

  @Authorized()
  @Get("/user/:id/incomes")
  async getAllUserIncomes(
    @Param("id") userId: string,
    @QueryParam("year") year: string
  ) {
    return this.paymentService.getAllUserIncomes(userId, year);
  }
}
