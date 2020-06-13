import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/galaxy/src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlxInstructorsHttpModule } from './instructors.module';
import { InstructorItemResponse, Instructor, InstructorRequest } from '../../models/instructors.model';


@Injectable({
    providedIn: GlxInstructorsHttpModule
})
export class GlxInstructorsHttp {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Instructor[]> {

    return this.http.get<InstructorItemResponse[]>(`${environment.api}/instructors`)
    .pipe(
        map((instructorsResponse: InstructorItemResponse[]) => {
            return instructorsResponse.map((instructorItemResponse: InstructorItemResponse) =>  {
                return new Instructor(instructorItemResponse);
            });
        })
    );
}

getInstructor(instructorId: string): Observable<Instructor> {
  return this.http.get<InstructorItemResponse>(`${environment.api}/instructors/${instructorId}`)
  .pipe(
      map((instructorResponse: InstructorItemResponse) => {
        return new Instructor(instructorResponse);
      })
  );
}


createInstructor(body: InstructorRequest) {
  return this.http.post(`${environment.api}/instructors`, body);
}

updateInstructor(instructorId: string, body: InstructorRequest) {
  return this.http.put(`${environment.api}/instructors/${instructorId}`, body);
}

deleteInstructor(instructorId: string) {
  return this.http.delete(`${environment.api}/instructors/${instructorId}`);
}


}
