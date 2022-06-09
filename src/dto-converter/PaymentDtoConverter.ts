import { PaymentDto } from "../dto/PaymentDto";
import { Payment } from "../entity/Payment";

export class PaymentDtoConverter {
  public static toDto(payment: Payment): PaymentDto {
    const newPaymentDto = new PaymentDto();

    newPaymentDto.id = payment.id ? payment.id : 0;
    newPaymentDto.value = payment.value;
    newPaymentDto.description = payment.description;
    newPaymentDto.createdAt = payment.createdAt;
    // newPaymentDto.buyer = payment.buyer;

    return newPaymentDto;
  }

  public static toEntity(paymentDto: PaymentDto): Payment {
    const newPayment = new Payment();

    newPayment.value = paymentDto.value;
    newPayment.description = paymentDto.description;
    newPayment.createdAt = paymentDto.createdAt;
    // newPayment.buyer = paymentDto.buyer;

    return newPayment;
  }

  public static paymentsListToDtos(payments: Payment[]): PaymentDto[] {
    return payments.map((payment) => this.toDto(payment));
  }
}
