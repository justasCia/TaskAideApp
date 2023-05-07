export function translateBookingStatusToLithuanian(status: string): string {
    switch(status.toLowerCase()) {
      case 'pending':
        return "Pateiktas";
      case 'rejected':
        return "Atmesta";
      case 'innegotiation':
        return "Derybose";
      case 'confirmed':
        return "Patvirtinta";
      case 'cancelled':
        return "Atšaukta";
      case 'cancelledwithpartialpayment':
        return "Atšaukta su daliniu mokėjimu";
      case 'completed':
        return "Užbaigtas";
      default:
        throw new Error(`Unknown booking status: ${status}`);
    }
  }