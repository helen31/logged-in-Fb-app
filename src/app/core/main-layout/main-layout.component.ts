import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
      private iconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.registerIcons();
  }

  registerIcons(): void {
      this.iconRegistry.addSvgIcon(
          'search',
          this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-search-24px.svg'));
  }

}
