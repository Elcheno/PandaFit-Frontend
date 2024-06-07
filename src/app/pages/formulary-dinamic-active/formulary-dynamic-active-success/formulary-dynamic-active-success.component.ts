import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { GeneratePdfService } from '../../../services/pdf/generate-pdf.service';

@Component({
  selector: 'app-formulary-dynamic-active-success',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './formulary-dynamic-active-success.component.html',
  styleUrl: './formulary-dynamic-active-success.component.scss'
})
export class FormularyDynamicActiveSuccessComponent {
  private pdfService = inject(GeneratePdfService);
  private route = inject(ActivatedRoute);
  public load: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
    }, 500);
  }

  public downloadPdf(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.pdfService.generatePdf(id);
    });
  }

  extractNumberFromUrl(): void {
    const url = this.route.snapshot.url.map(segment => segment.path).join('/');

    const regex = /(\d+)$/;
    const match = url.match(regex);

    if (match) {
      const number = match[0];
    }
  }

}
