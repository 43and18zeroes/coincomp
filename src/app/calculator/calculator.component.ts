import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  ngOnInit() {
    this.getWebSocket();
  }

  getWebSocket() {
    console.log('test');
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade');
    let stockPriceElement: any = document.getElementById('stockPrice');
    let lastPrice: any = null;

    ws.onmessage = (event) => {
      let stockObject = JSON.parse(event.data);
      let price = parseFloat(stockObject.p).toFixed(2);
      stockPriceElement.innerText = price;
      stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
      lastPrice = price;
    };
  }
}
