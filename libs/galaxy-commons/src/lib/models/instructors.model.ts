export interface InstructorRequest {
  //id: string;
  fullName: string;
  mail: string;
}
export interface InstructorItemResponse {
  _id: string;
  fullName: string;
  mail: string;
}
export class Instructor  {
  id: string;
  fullName: string;
  mail: string;

  constructor(data: InstructorItemResponse){
    this.id = data._id || '';
    this.fullName = data.fullName || '';
    this.mail = data.mail || '';

  }
}
