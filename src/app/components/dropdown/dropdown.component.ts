import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { type IDropdownButton, type IDropdownData, type IDropdownRow } from '../../model/interfaces/i-dropdown';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CdkMenu, CdkMenuItem, CdkMenuTrigger],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input('rows') public dropdownData!: IDropdownData<any>;
  @Input('data') public data!: any;
  @Input('triggerStyle') public triggerStyle!: string;
  @Input('dropdownStyle') public dropdownStyle!: string;

  @Output('onClick') public onClick = new EventEmitter<void>();

  private readonly sanitizer = inject(DomSanitizer);

  public rows: IDropdownRow<any>[];
  public button!: IDropdownButton;

  constructor () {
    this.rows = [];
  }

  ngOnInit (): void {
    this.button = {
      ...this.dropdownData.button,
      icon: this.dropdownData.button.icon !== undefined ? this.sanitizer.bypassSecurityTrustHtml(this.dropdownData.button.icon) : ''
    };
    console.log(this.dropdownData);
    for (const row of this.dropdownData.rows) {
      this.rows.push({
        ...row,
        icon: row.icon !== undefined ? this.sanitizer.bypassSecurityTrustHtml(row.icon) : ''
      });
    }
  }

  public async onClickRow (fnc?: (data?: any) => void | Promise<void>): Promise<void> {
    if (fnc !== undefined) await fnc(this.data);
    this.onClick.emit();
  }
}
