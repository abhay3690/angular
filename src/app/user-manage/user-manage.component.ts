import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, UserListComponent],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css'
})
export class UserManageComponent {
  show = true;
  name = '';
  address = '';
  email = '';
  id?: number;

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
    const payload = { name: this.name, address: this.address, email: this.email };
    this.http.post('http://localhost:8081/user/add', payload).subscribe(() => {
      this.clearForm();
      this.fetchUsers();
    });
  }

  deleteUser(userId: number): void {
    this.http.delete(`http://localhost:8081/user/${userId}`).subscribe(() => {
      this.fetchUsers();
    });
  }

  updateData(userId: number): void {
    const payload = { name: this.name, address: this.address, email: this.email };
    this.http.put(`http://localhost:8081/user/${userId}`, payload).subscribe(() => {
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
}
