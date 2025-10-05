export interface CheckoutItem {
  productId: string;
  name: string;
  qty: number;
  image?: string;
  unitPrice: number; 
  discount: number;  // %
  type?: string;     
}

export interface CheckoutDraft {
  items: CheckoutItem[];
  createdAt: number; 
  sessionId?: string; 
  expiresAt?: number; 
}
