import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';


const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(private http: HttpClient) {}

  listFromUser(userName: string) {
    return this.http
      .get<Photo[]>(`${API}/${userName}/photos`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<Photo[]>(API + '/' + userName + '/photos', { params });
  }

  upload(description: string, allowComments: boolean, file: File) {

    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(
      API + '/photos/upload',
      formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );
  }

  findById(photoId: number) {
    return this.http.get<Photo>(API + '/photos/' + photoId);
  }

  getComments(photoId: number) {
    return this.http.get<PhotoComment[]>(
           API + '/photos/' + photoId + '/comments');
  }

  addComment(photoId: number, commentText: string) {
    return this.http
               .post(API + '/photos/' + photoId + '/comments', { commentText });
  }

  removePhoto(photoId: number) {
    return this.http.delete(API + '/photos/' + photoId);
  }

  like(photoId: number) {
    /*
    Sabemos que para ter acesso ao status da resposta, precisaremos passar um terceiro parâmetro:
    observe: 'response'. Em seguida, faremos um pipe(map()), map(), por sua vez, atua como um JavaScript
    que retorna true. Ao passarmos o mouse sobre esse elemento, veremos que ele retorna um observable do
    tipo boolean.
    Se acontecer um erro 304, devemos retornar um observable do tipo boolean com valor falso.
    Então precisaremos realizar algumas alterações. Faremos um pipe() utilizando o catchError().
    Então faremos um teste para descobrir se ele é do tipo 304, caso sim, retornaremos o observable
    com valor false. Para tanto, importaremos um operador RxJS of().
    */
    return this.http.post(
        API + '/photos/' + photoId +  '/like', {}, {observe: 'response'}
    )
    .pipe(map(res => true))
    .pipe(catchError(err => {
      return err.status == '304' ? of(false) : throwError(err);
    }));
  }
}
