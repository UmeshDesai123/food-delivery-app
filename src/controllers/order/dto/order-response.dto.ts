
class Items {
  itemName: string;

  itemPrice: number;

  total: number;
}

export class OrderResponse {
  orderId: string;

  userId: string;

  userName: string;

  userAdd:string;

  userEmail: string;

  hotelId: string;

  hotelName: string;

  hotelAdd: string;
	
  orderItems: any [];

  totalPrice: number;

  orderStatus: string;
}
