import { Component, OnInit } from '@angular/core';
// Local Imports
import { ServicenowService } from '../../services/servicenow.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-servicenow-test',
  imports: [],
  templateUrl: './servicenow-test.component.html',
  styleUrl: './servicenow-test.component.css',
})
export class ServicenowTestComponent implements OnInit {
  data: any;

  constructor(private servicenowService: ServicenowService) {}

  ngOnInit(): void {}

  loadData() {
    const payload = {
      instanceUrl: environment.servicenow.instanceUrl,
      username: environment.servicenow.username,
      password: environment.servicenow.password,
      table: 'incident',
      queryParams: {
        sysparm_limit: 2,
      },
    };

    this.servicenowService.queryServiceNow(payload).subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data.result);
      },
      error: (err) => {
        console.error('Error al consultar ServiceNow:', err);
      },
    });
  }
}
