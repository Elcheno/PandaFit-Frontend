import { Component, Inject, OnInit, effect, inject } from '@angular/core';
import { DATA_TOAST, ToastService } from '../../services/modal/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  /**
   * List of toast messages.
   */
  public toastList!: any[];

  /**
   * Height of the toast component.
   */
  public height = `0px`

  constructor(
    @Inject(DATA_TOAST) public data: any
  ) {
    this.toastList = [];
    effect(() => {
      this.toastList = data();
      this.height = this.toastList.length * 60 + "px"
    })
  }

  ngOnInit(): void {
    
  }

}
