import { Injectable } from '@angular/core';
import { BrandSearchResultSummaryResponse } from '../_models/BrandSearchResultSummaryResponse';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartStoresList = Array<BrandSearchResultSummaryResponse>();

  constructor() { }

  public addToCart(store: BrandSearchResultSummaryResponse) {
    this.cartStoresList.push(store);
  }

  public getItems() {
    return this.cartStoresList;
  }

  public clearCart() {
    this.cartStoresList = [];
    return this.cartStoresList;
  }
}
