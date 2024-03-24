import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

interface StockPriceMessage {
  p: string;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  @ViewChild('btcPriceElement', { static: true }) btcPriceElement!: ElementRef;
  @ViewChild('btcAmount', { static: true }) btcAmount!: ElementRef;
  price: any;
  currentEuros: any;
  serverInfoReceived = false;

  ngOnInit() {
    this.getWebSocket();
  }

  getWebSocket() {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade');
    let lastPrice: string;

    ws.onmessage = (event) => {
      this.serverInfoReceived = true;
      let stockObject: StockPriceMessage = JSON.parse(event.data);
      this.price = parseFloat(stockObject.p).toFixed(2);
      this.btcPriceElement.nativeElement.style.color =
        !lastPrice || lastPrice === this.price
          ? 'black'
          : this.price > lastPrice
          ? 'green'
          : 'red';
      lastPrice = this.price;
      this.updateEurAmount();
    };
  }

  updateEurAmount() {
    if (!this.serverInfoReceived) return;
    this.currentEuros =
      this.price * parseFloat(this.btcAmount.nativeElement.value);
  }
}
