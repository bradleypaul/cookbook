import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @Input() user: User = new User();
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  submit(): void {
    alert(`Submitted! ${this.user.username} : ${this.user.password}`);
    this.userService.isUser(this.user)
      .subscribe(valid => {
        alert(`user exists & is valid ${valid}`);
      });
  }

  hitEnter(): void {
    this.submit();
  }
}
