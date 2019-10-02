import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  hide = true;
  @Input() user: User = new User();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  submit(): void {
    alert(`Submitted! ${this.user.username} : ${this.user.password}`);
    this.userService.createUser(this.user)
      .subscribe(valid => {
        alert(`user exists & is valid ${valid}`);
      });
  }
}
