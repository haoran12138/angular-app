import { Component, HostBinding, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DaLayoutService } from './da-layout.service';
import { DaLayoutConfig } from './da-layout.type';

@Component({
  selector: 'da-layout-header',
  template: '<ng-content></ng-content>',
})
export class DaLayoutHeaderComponent implements OnDestroy {
  @HostBinding('class.da-layout-header') default = true;
  @Input() config: DaLayoutConfig['header'];
  private destroy$ = new Subject();

  constructor(private layoutService: DaLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: DaLayoutConfig) => {
        this.config = config!.header!.firHeader;
      });
  }

  @HostBinding('style.height')
  get height() {
    return this?.config?.height + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'da-layout-sec-header',
  template: '<ng-content></ng-content>',
})
export class DaLayoutSecHeaderComponent implements OnDestroy {
  @HostBinding('class.da-layout-sec-header') default = true;
  @Input() config: DaLayoutConfig['header'];
  private destroy$ = new Subject();

  constructor(private layoutService: DaLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: DaLayoutConfig) => {
        this.config = config!.header!.secHeader;
      });
  }

  @HostBinding('style.height')
  get height() {
    return this?.config?.height + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'da-layout-sidebar',
  template: '<ng-content></ng-content>',
})
export class DaLayoutSidebarComponent implements OnDestroy {
  @HostBinding('class.da-layout-sidebar') default = true;
  @Input() config: DaLayoutConfig['sidebar']['firSidebar'];
  private destroy$ = new Subject();

  constructor(private layoutService: DaLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: DaLayoutConfig) => {
        this.config = config.sidebar.firSidebar;
      });
  }

  @HostBinding('style.width')
  get width() {
    return this?.config?.width + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'da-layout-sec-sidebar',
  template: '<ng-content></ng-content>',
})
export class DaLayoutSecSidebarComponent implements OnDestroy {
  @HostBinding('class.da-layout-sec-sidebar') default = true;
  @Input() config: DaLayoutConfig['sidebar']['secSidebar'];
  private destroy$ = new Subject();

  constructor(private layoutService: DaLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: DaLayoutConfig) => {
        this.config = config.sidebar.secSidebar;
      });
  }

  @HostBinding('style.width')
  get width() {
    return this?.config?.width + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'da-layout-footer',
  template: '<ng-content></ng-content>',
})
export class DaLayoutFooterComponent implements OnDestroy {
  @HostBinding('class.da-layout-footer') default = true;
  @Input() config: DaLayoutConfig['footer'];
  private destroy$ = new Subject();

  constructor(private layoutService: DaLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: DaLayoutConfig) => {
        this.config = config.footer;
      });
  }

  @HostBinding('style.width')
  get height() {
    return this?.config?.height + 'px';
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  selector: 'da-layout',
  templateUrl: './da-layout.component.html',
  styleUrls: ['./da-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DaLayoutComponent implements OnDestroy {
  @HostBinding('class.da-layout') default = true;
  @Input() config: DaLayoutConfig;
  private destroy$ = new Subject();

  constructor(private layoutService: DaLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: DaLayoutConfig) => {
        this.config = config;
      });
  }

  getSidebarWidth(): string {
    let width = 0;

    if (this.config.sidebar.hidden) {
      return width + 'px';
    }

    if (!this.config!.sidebar!.firSidebar!.hidden) {
      width += this.config!.sidebar!.firSidebar!.width!;
    }

    if (!this.config!.sidebar!.secSidebar!.hidden) {
      width += this.config!.sidebar!.secSidebar!.width!;
    }

    return width + 'px';
  }

  getHeaderHeight(): string {
    let height = 0;

    if (this.config!.header!.hidden) {
      return height + 'px';
    }

    if (!this.config!.header!.firHeader!.hidden) {
      height += this.config!.header!.firHeader!.height!;
    }

    if (!this.config!.header!.secHeader!.hidden) {
      height += this.config!.header!.secHeader!.height!;
    }

    return height + 'px';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
