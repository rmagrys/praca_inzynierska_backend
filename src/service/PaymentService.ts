import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Auction } from "../entity/Auction";
import { Payment } from "../entity/Payment";
import { AuctionRepository } from "../repository/AuctionRepository";
import { PaymentRepository } from "../repository/PaymentRepository";
import { PaymentMapper } from "../utils/PaymentMapper";

@Service()
export class PaymentService {
  constructor(
    @InjectRepository() private readonly auctionRepository: AuctionRepository,
    @InjectRepository() private readonly paymentRepository: PaymentRepository
  ) {}

  async getAllUserExpenses(userId: string, year: string) {
    const payments = await this.paymentRepository
      .createQueryBuilder()
      .select("payment")
      .from(Payment, "payment")
      .where("payment.buyer = :userId", { userId })
      .andWhere("YEAR(payment.createdAt) = :year", { year })
      .getMany();

    return PaymentMapper.mapUserPaymentsToChartData(payments);
  }

  async getAllUserIncomes(userId: string, year: string) {
    const auctions = await this.auctionRepository
      .createQueryBuilder()
      .select("auction")
      .from(Auction, "auction")
      .leftJoinAndSelect("auction.payment", "payment")
      .where("auction.user_id = :userId", { userId })
      .andWhere("auction.payment is not null")
      .andWhere("YEAR(payment.createdAt) = :year", { year })
      .getMany();

    const payments = auctions.map((auction: Auction) => auction.payment);

    return PaymentMapper.mapUserPaymentsToChartData(payments);
  }

  async saveNewPayment(payment: Payment): Promise<Payment> {
    return this.paymentRepository.save(payment);
  }
}
