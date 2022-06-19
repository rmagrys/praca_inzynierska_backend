import { Payment } from "../entity/Payment";

export class PaymentMapper {
  public static mapUserPaymentsToChartData(payments: Payment[]) {
    const months = {
      Styczeń: 0,
      Luty: 0,
      Marzec: 0,
      Kwiecień: 0,
      Maj: 0,
      Czerwiec: 0,
      Lipiec: 0,
      Sierpień: 0,
      Wrzesień: 0,
      Październik: 0,
      Listopad: 0,
      Grudzień: 0,
    };
    const mappedPayments = payments.reduce((acc, payment) => {
      const month = payment.createdAt.getMonth();
      switch (month) {
        case 0:
          return { ...acc, Styczeń: payment.value + acc.Styczeń };
        case 1:
          return { ...acc, Luty: payment.value + acc.Luty };
        case 2:
          return { ...acc, Marzec: payment.value + acc.Marzec };
        case 3:
          return { ...acc, Kwiecień: payment.value + acc.Kwiecień };
        case 4:
          return { ...acc, Maj: payment.value + acc.Maj };
        case 5:
          return { ...acc, Czerwiec: payment.value + acc.Czerwiec };
        case 6:
          return { ...acc, Lipiec: payment.value + acc.Lipiec };
        case 7:
          return { ...acc, Sierpień: payment.value + acc.Sierpień };
        case 8:
          return { ...acc, Wrzesień: payment.value + acc.Wrzesień };
        case 9:
          return { ...acc, Październik: payment.value + acc.Październik };
        case 10:
          return { ...acc, Listopad: payment.value + acc.Listopad };
        case 11:
          return { ...acc, Grudzień: payment.value + acc.Grudzień };
        default:
          return acc;
      }
    }, months);

    return mappedPayments;
  }
}
