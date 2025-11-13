import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-clear-filters-button',
  imports: [MatIcon],
  templateUrl: './clear-filters-button.component.html',
  styleUrl: './clear-filters-button.component.css',
})
export class ClearFiltersButtonComponent {
  @Input() clearFn!: () => void;

  onClear() {
    if (this.clearFn) {
      this.clearFn();
    }
  }
}
