import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { Email } from 'src/app/services/type/user.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-temp',
  templateUrl: './login-temp.component.html',
  styleUrls: ['./login-temp.component.scss']
})
export class LoginTempComponent implements OnInit {
  isLoading = false
  loginForm = ''
  // email: Email = { email: "shun.chen@pacteraedge.com" }
  email?: Email
  validateForm!: FormGroup

  constructor(private fb: FormBuilder, private userServe: UserService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      loginForm: [null, [Validators.required]],
      remember: [true],
    });
  }

  handleLogin() {
    if (!this.loginForm) {
      return false
    }
    this.isLoading = true;
    this.email = { email: this.loginForm }
    this.userServe.getToken(this.email).subscribe(res => {
      console.log(res, 'res');
      if (res.accessToken) {
        const { accessToken } = res
        localStorage.setItem('token', accessToken)
      }
    })
    return true




    // async handleLogin2() {
    //   this.$refs.loginForm.validate(async (valid) => {
    //     if (!valid) {
    //       return false;
    //     }
    //     this.isLoading = true;

    //     try {
    //       const res = await getToken({
    //         email: this.loginForm.username,
    //       });
    //       this.$store.commit("user/SET_TOKEN", res.accessToken);
    //       this.$store.commit("user/SET_REFRESH_TOKEN", res.refreshToken);
    //       // 记录登录的时间，页面一直操作，超过1小时刷新token
    //       this.$store.commit("user/SET_LOGIN_TIME", new Date());
    //       await this.$store.dispatch("user/getPermission");
    //       this.$router.push({
    //         path: this.redirect || "/",
    //         query: this.otherQuery,
    //       });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   });
    // },
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}