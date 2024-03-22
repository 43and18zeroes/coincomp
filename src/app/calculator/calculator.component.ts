import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  @ViewChild('stockPriceElement', {static: true}) stockPriceElement!: ElementRef;
  ngOnInit() {
    this.getWebSocket();
  }

  getWebSocket() {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade');
    let lastPrice: any = null;

    ws.onmessage = (event) => {
      let stockObject = JSON.parse(event.data);
      let price: any = parseFloat(stockObject.p).toFixed(2); // toFixed parses the number to a string
      this.stockPriceElement.nativeElement.innerText = price;
      this.stockPriceElement.nativeElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;
      this.updateEurAmount(price);
    };
  }

  updateEurAmount(price: any) {
    let btcAmount: any = document.getElementById('btcAmount');
    let calculateEur = price * btcAmount.value; // the * operator parses two string into a number
    let currentEuros: any = document.getElementById('currentEuros');
    currentEuros.innerText = calculateEur;
  }
}
