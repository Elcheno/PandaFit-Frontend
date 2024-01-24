import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-jccpage',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './jccpage.component.html',
  styleUrl: './jccpage.component.scss'
})
export class JCCPageComponent {

}
