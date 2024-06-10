import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private dropdownState = new Subject<string>();

  getDropdownState() {
    return this.dropdownState.asObservable();
  }

  closeAllDropdowns(except?: string) {
    this.dropdownState.next(except || '');
  }
}