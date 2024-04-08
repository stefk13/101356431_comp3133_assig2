import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpperCasePipe, LowerCasePipe, DatePipe } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UpperCasePipe, LowerCasePipe, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '101356431_comp3133_assig2';
}
