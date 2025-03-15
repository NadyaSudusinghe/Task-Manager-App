import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginObj: any = {
    username: '',
    password: ''
  };

  router = inject(Router);

  onLogin() {
    if(this.loginObj.username == 'admin' && this.loginObj.password == "1212"){
      localStorage.setItem("user",this.loginObj.username);
      this.router.navigateByUrl("dashboard");
    }else {
      alert('wrong credentials');
    }
  }

}
