import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';  
import { UserFormComponent } from '../user-form/user-form.component';  
import { UserDetailComponent } from '../user-detail/user-detail.component';  
import { User } from '../../user.model';  
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();  
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'contactNumber', 'actions'];  

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers(); 
  }

  loadUsers(): void {
    this.userService.getUsersList().subscribe(
      (data: User[]) => {
        this.dataSource.data = data;  
      },
      (error) => {
        console.error('Error fetching users:', error);  
      }
    );
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px' 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {  
        this.loadUsers();
      }
    });
  }

  openDetailsDialog(userId: number): void {
    this.userService.getUser(userId).subscribe(userDetails => {
      this.dialog.open(UserDetailComponent, {
        width: '400px',
        data: userDetails  
      });
    }, (error) => {
      console.error('Error fetching user details:', error);
    });
  }
}
