import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlxLoadingComponent } from '@galaxy/commons/components';
import { finalize } from 'rxjs/operators';
import { GlxInstructorsHttp } from '@galaxy/commons/http/instructor';
import { InstructorRequest } from '@galaxy/commons/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Instructor } from '@galaxy/commons/models';
import { forkJoin } from 'rxjs';

@Injectable()
export class InstructorUpdatePresenter {

  instructors: Instructor[] = [];
  instructor: Instructor;
  instructorId: string;

  constructor(
    private instructorsHttp: GlxInstructorsHttp,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  initial() {
    this.instructorId = this.route.snapshot.paramMap.get('id');

    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });

    forkJoin({
      instructor: this.instructorsHttp.getInstructor(this.instructorId)
    })
    .pipe(finalize(() => loading.close()))
    .subscribe(
      ({ instructor }) => {
        this.instructor = instructor;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateInstructor(body: InstructorRequest) {
    const loading = this.dialog.open(GlxLoadingComponent, { disableClose: true });
    this.instructorsHttp.updateInstructor(this.instructorId, body)
    .pipe(finalize(() => loading.close()))
    .subscribe(_ => this.goInstructors());
  }

  goInstructors() {
    this.router.navigateByUrl('/administrador/instructors');
  }
}
