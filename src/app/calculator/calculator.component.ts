import { Component, ElementRef, ViewChild } from '@angular/core';

interface StockPriceMessage {
  p: string;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  @ViewChild('btcPriceElement', { static: true }) btcPriceElement!: ElementRef;
  @ViewChild('btcAmount', { static: true }) btcAmount!: ElementRef;
  @ViewChild('currentEuros', { static: true }) currentEuros!: ElementRef;

  serverInfoReceived: boolean = false;

  ngOnInit() {
    this.getWebSocket();
  }

  ngAfterViewInit() {
    this.btcAmount.nativeElement.addEventListener('input', () => {
      if (this.serverInfoReceived) {
        const price = this.btcPriceElement.nativeElement.innerText;
        console.log(typeof(price));
        this.updateEurAmount(price);
      }
    });
  }

  getWebSocket() {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade');
    let lastPrice: string;

    ws.onmessage = (event) => {
      this.serverInfoReceived = true;
      let stockObject: StockPriceMessage = JSON.parse(event.data);
      let price: string = parseFloat(stockObject.p).toFixed(2);
      this.btcPriceElement.nativeElement.innerText = price;
      this.btcPriceElement.nativeElement.style.color =
        !lastPrice || lastPrice === price
          ? 'black'
          : price > lastPrice
          ? 'green'
          : 'red';
      lastPrice = price;
      this.updateEurAmount(+price);
    };
  }

  updateEurAmount(price: number) {
    let calculateEur: number = price * this.btcAmount.nativeElement.value;
    this.currentEuros.nativeElement.innerText = calculateEur;
  }
}
