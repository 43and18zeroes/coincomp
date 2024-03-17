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
    console.log("test")
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade');

    ws.onmessage = (event) => {
      console.log(event.data);
    }
  }
}
