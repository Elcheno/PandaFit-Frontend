import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { IOutputData } from '../../model/interfaces/i-output-data';
import { OutputService } from '../../services/output/output.service';
import { SearchEntityComponent } from '../../components/search-entity/search-entity.component';
import { IPageable } from '../../model/interfaces/i-pageable';
import { IPage } from '../../model/interfaces/i-page';
import { TableOutputsComponent } from '../../components/output/table-outputs/table-outputs.component';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [ButtonComponent, SearchEntityComponent, TableOutputsComponent, RouterLink],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss'
})
export class OutputComponent implements OnInit {
  private readonly outputService = inject(OutputService);
  private readonly router = inject(Router);

  public data!: IPageable<IOutputData>;

  ngOnInit (): void {
    this.outputService.getAll({ page: 0, size: 10, sort: ['name'] }).subscribe((res) => {
      this.data = res;
    });
  }

  public async getAll (page: IPage): Promise<void> {
    this.outputService.getAll(page).subscribe((res) => {
      this.data = res;
    });
  }

  public async update (output: IOutputData): Promise<void> {
    if (!output) return;

    // (await this.modalService.open(UpdateInstitutionsModalComponent, institution)).closed.subscribe((res: IInstitution) => {
    //   this.institutionService.update(res).subscribe((response: IInstitution) => {
    //     this.data.content = this.data.content.map((item) => item.id === response.id ? response : item);
    //   });
    // });
  }

  public async delete (output: IOutputData): Promise<void> {
    if (!output) return;
    
    this.outputService.delete(output).subscribe((res: IOutputData) => {
      this.data.content = this.data.content.filter((item) => item.id !== res.id);
      this.data.totalElements -= 1;
    })
  }

  public search (value: string): void {
    console.log(value);
  }

}
