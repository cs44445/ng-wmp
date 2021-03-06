import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { Email, StaffInfo } from 'src/app/services/type/user.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/business/local-storage.service';

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
  staffInfo: StaffInfo = {
    staffName: '',
    roleName: '',
    baseRole: '',
    azureId: '',
    email: '',
    createTime: '',
    id: '',
  }
  permissions = []

  constructor(
    private fb: FormBuilder,
    private userServe: UserService,
    private router: Router,
    private ls: LocalStorageService
  ) { }

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
      // console.log(res, 'res');
      if (res.accessToken) {
        const { accessToken } = res
        this.ls.set('token', accessToken)

        this.userServe.staffInfo().subscribe(res => {
          const { name, role, azureId, email, createTime, id, permissions } = res
          this.staffInfo = {
            staffName: name,
            roleName: role.name,
            baseRole: role.baseRole,
            azureId,
            email,
            createTime,
            id
          }
          this.ls.set('staffInfo', this.staffInfo)

          this.permissions = permissions
            .map((v: any) => { return [v, ...v.sub] })
            .reduce((a: any, b: any) => { return a.concat((b)) })
          this.ls.set('permissions', this.permissions)
        })

        this.router.navigateByUrl('/dashboard')
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
    //       // ???????????????????????????????????????????????????1????????????token
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