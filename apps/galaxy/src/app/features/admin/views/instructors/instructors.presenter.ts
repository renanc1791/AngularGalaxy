import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlxLoadingComponent } from '@galaxy/commons/components';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlxInstructorsHttp } from '@galaxy/commons/http/instructor';
import { deleteElementList } from '@galaxy/commons/utils';
import { InstructorDeleteModalComponent } from '../../commons/components/instructor-delete-modal/instructor-delete-modal.component';

@Injectable()
export class InstructorsPresenter {
  dataSource = [];
  constructor(
    private instructorsHttp: GlxInstructorsHttp,
    private dialog: MatDialog,
    private router: Router
  ) {}

  loadInstructors() {

    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });

    this.instructorsHttp.getAll()
    .pipe(finalize(() => loading.close()))
    .subscribe(instructors => {
        console.log(instructors)
        this.dataSource = instructors
       }
      );

  }

  deleteInstructor(instructorId: string) {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.instructorsHttp.deleteInstructor(instructorId)
    .pipe(finalize(() => loading.close()))
    .subscribe(_ => {
      this.dataSource = deleteElementList(this.dataSource, workshop => workshop.id === instructorId);
    });
  }

  goDeleteModal(instructorId: string) {
    const modal = this.dialog.open(InstructorDeleteModalComponent, { disableClose: true });
    modal.afterClosed().subscribe((remove: boolean) => {
      if (remove) { this.deleteInstructor(instructorId); }
    });
  }

  goCreatePage() {
    this.router.navigateByUrl('/administrador/instructors/nuevo');
  }

  goUpdatePage(instructorId: string) {
    this.router.navigate(['/administrador/instructors/actualizar', instructorId]);
  }

}
