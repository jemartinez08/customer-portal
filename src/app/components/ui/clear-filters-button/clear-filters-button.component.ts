import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clear-filters-button',
  imports: [],
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
