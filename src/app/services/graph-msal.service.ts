import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';

@Injectable({
  providedIn: 'root',
})
export class GraphMsalService {
  private graphClient: Client;

  constructor(private msalService: MsalService) {
    this.graphClient = Client.init({
      authProvider: async (done) => {
        try {
          const result = await this.msalService.instance.acquireTokenSilent({
            scopes: ['User.Read'],
          });
          done(null, result.accessToken);
        } catch (error) {
          done(error, null);
        }
      },
    });
  }

  async getUserProfile() {
    return await this.graphClient.api('/me').get();
  }

  async getUserPhoto(): Promise<string> {
    const blob = await this.graphClient.api('/me/photo/$value').get();
    console.log(URL.createObjectURL(blob));
    return URL.createObjectURL(blob);
  }
}
