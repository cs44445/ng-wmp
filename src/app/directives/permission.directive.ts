import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { LocalStorageService } from '../services/business/local-storage.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnChanges {
  // @Input('appPermission') roles: string[] = []
  @Input('appPermission') roles = ''
  hasView = false
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private ls: LocalStorageService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('添加了指令');

    const permissions = this.ls.get('permissions')
    // 没匹配到角色
    if (this.roles) {
      if (permissions.find((v: any) => v.id === this.roles)) {
        this.createView()
      } else {
        this.viewContainer.clear();
        this.hasView = false;
      }
    } else {
      this.createView();
    }
  }

  // 创建视图
  private createView(): void {
    this.viewContainer.createEmbeddedView(this.templateRef)
    this.hasView = true
  }
}
