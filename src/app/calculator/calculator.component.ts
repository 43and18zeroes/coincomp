import { Component, ElementRef, ViewChild } from '@angular/core';

interface StockPriceMessage {
  p: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  @ViewChild('stockPriceElement', {static: true}) stockPriceElement!: ElementRef;
  @ViewChild('btcAmount', {static: true}) btcAmount!: ElementRef;
  @ViewChild('currentEuros', {static: true}) currentEuros!: ElementRef;

  ngOnInit() {
    this.getWebSocket();
  }

  getWebSocket() {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade');
    let lastPrice: string;

    ws.onmessage = (event) => {
      let stockObject: StockPriceMessage = JSON.parse(event.data);
      let price: string = parseFloat(stockObject.p).toFixed(2);
      this.stockPriceElement.nativeElement.innerText = price;
      this.stockPriceElement.nativeElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;
      this.updateEurAmount(price);
    };
  }

  updateEurAmount(price: any) {
    let calculateEur = price * this.btcAmount.nativeElement.value;
    this.currentEuros.nativeElement.innerText = calculateEur;
  }
}
