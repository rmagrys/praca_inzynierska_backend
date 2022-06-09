import { EntityRepository, Repository } from "typeorm";
import { Payment } from "../entity/Payment";

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {}
