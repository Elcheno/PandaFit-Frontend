import { Component, Inject, OnInit } from '@angular/core';
import { DATA_TOAST } from '../../services/modal/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {

  constructor(
    @Inject(DATA_TOAST) public data: any
  ) { }

  ngOnInit(): void { }

}
