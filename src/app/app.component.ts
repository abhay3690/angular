import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  show: boolean = true;
  name: string = '';
  address: string = '';
  email: string = '';
  id?: number; // optional, used for editing

  listItems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get('http://localhost:8081/user/').subscribe((result: any) => {
      this.listItems = result;
    });
  }

  postData(): void {
    const payload = {
      name: this.name,
      address: this.address,
      email: this.email
    };

    this.http.post('http://localhost:8081/user/add', payload).subscribe(response => {
      console.log('POST response:', response);
      this.clearForm();
      this.fetchUsers();
    });
  }
  

  deleteUser(userId: number): void {
    this.http.delete(`http://localhost:8081/user/${userId}`).subscribe(() => {
      console.log('User deleted');
      this.fetchUsers();
    });
  }
  

  updateData(userId: number): void {
    const payload = {
      name: this.name,
      address: this.address,
      email: this.email
    };

    this.http.put(`http://localhost:8081/user/${userId}`, payload).subscribe(response => {
      console.log('PUT response:', response);
      this.clearForm();
      this.fetchUsers();
    });
  }

  editUser(user: any): void {
    this.id = user.id;
    this.name = user.name;
    this.address = user.address;
    this.email = user.email;
  }

  clearForm(): void {
    this.id = undefined;
    this.name = '';
    this.address = '';
    this.email = '';
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}






