import { Component, Input, OnInit } from '@angular/core';
import { AiSummaryModalService } from '../../../services/ai-summary-modal.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ai-summary-advertisement',
  imports: [MatIconModule],
  templateUrl: './ai-summary-advertisement.component.html',
  styleUrl: './ai-summary-advertisement.component.css',
})
export class AiSummaryAdvertisementComponent implements OnInit {
  @Input() AIItemsRequest: any[] = [];

  constructor(private AISummaryModal: AiSummaryModalService) {}

  summaryHtml: string = ''; // Aquí guardaremos el HTML recibido

  ngOnInit(): void {
    // Simulación de respuesta del API de OpenAI
    const simulatedApiResponse = {
      choices: [
        {
          message: {
            role: 'assistant',
            content: `
              <article style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #222; max-width: 900px; margin: 0 auto; padding: 1rem;">
  <h3 style="color: #1e88e5; text-align: center; border-bottom: 2px solid #1e88e5; padding-bottom: 0.3rem;">
    🛡️ Security Summary — SOC Daily Report
  </h3>

  <p style="font-size: 1.05rem; margin-top: 1rem;">
    During the last <strong>24 hours</strong>, the Security Operations Center (SOC) analyzed 
    <strong>43 security events</strong> gathered from ServiceNow, Splunk, CrowdStrike, and SentinelOne.
    The monitoring coverage remains stable with improved response times from automated playbooks ⚙️.
  </p>

  <section style="margin-top: 1.5rem;">
    <h4 style="color: #1565c0; border-left: 4px solid #1565c0; padding-left: 0.5rem;">
      🔍 Key Observations
    </h4>
    <ul style="margin-left: 1.2rem;">
      <li>🚨 <strong>6 high-priority incidents</strong> (P1/P2) were escalated for immediate response.</li>
      <li>🧰 <strong>27 medium-priority alerts</strong> were contained through EDR auto-remediation.</li>
      <li>🧍 No confirmed <strong>data exfiltration</strong> or lateral movement was observed.</li>
      <li>📊 Improved <strong>log correlation accuracy</strong> in Splunk reduced false positives by ~18%.</li>
      <li>💻 EDR containment succeeded on <strong>5 endpoints</strong> using automated isolation policies.</li>
    </ul>
  </section>

  <section style="margin-top: 1.5rem;">
    <h4 style="color: #1565c0; border-left: 4px solid #1565c0; padding-left: 0.5rem;">
      ⚠️ Notable Incidents
    </h4>
    <article style="background: #f9f9f9; border-left: 4px solid #fbc02d; padding: 0.8rem; margin: 0.8rem 0;">
      <h3 style="color: #f57c00;">Incident #A102 — Credential Theft (Escalated)</h3>
      <p>Detected suspicious privilege escalation attempts on a developer VM. 
      CrowdStrike blocked the process injection and SentinelOne quarantined the host. 
      Forensic imaging and credential rotation were initiated.</p>
    </article>
    <article style="background: #f9f9f9; border-left: 4px solid #4caf50; padding: 0.8rem; margin: 0.8rem 0;">
      <h3 style="color: #2e7d32;">Incident #B087 — Failed Authentication Burst</h3>
      <p>Multiple login attempts detected against the external web portal from non-corporate IPs 🌍.
      MFA was enforced, suspicious IPs blocked at the firewall, and accounts temporarily locked.</p>
    </article>
  </section>

  <section style="margin-top: 1.5rem;">
    <h4 style="color: #1565c0; border-left: 4px solid #1565c0; padding-left: 0.5rem;">
      📈 Metrics Overview
    </h4>
    <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.95rem;">
      <thead style="background: #e3f2fd;">
        <tr>
          <th style="text-align: left; padding: 0.5rem;">Category</th>
          <th style="text-align: left; padding: 0.5rem;">Count</th>
          <th style="text-align: left; padding: 0.5rem;">Trend</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 0.5rem;">High-Priority Alerts</td>
          <td style="padding: 0.5rem;">6</td>
          <td style="padding: 0.5rem;">⬆️ +1 from previous day</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">Medium-Priority Alerts</td>
          <td style="padding: 0.5rem;">27</td>
          <td style="padding: 0.5rem;">⬇️ -3 (improved containment)</td>
        </tr>
        <tr>
          <td style="padding: 0.5rem;">False Positives</td>
          <td style="padding: 0.5rem;">11</td>
          <td style="padding: 0.5rem;">⬇️ -18%</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section style="margin-top: 1.5rem;">
    <h4 style="color: #1565c0; border-left: 4px solid #1565c0; padding-left: 0.5rem;">
      💡 Recommendations
    </h4>
    <ol style="margin-left: 1.2rem;">
      <li>🔐 Strengthen MFA enforcement for remote and privileged users.</li>
      <li>🧩 Improve SIEM rule tuning to reduce redundant EDR alerts.</li>
      <li>🧱 Apply critical patches to externally exposed services.</li>
      <li>📚 Update incident playbooks and run credential-theft tabletop exercises.</li>
      <li>☁️ Ensure full log ingestion coverage for cloud workloads.</li>
    </ol>
  </section>

  <footer style="margin-top: 2rem; text-align: center; font-size: 0.9rem; color: #555;">
    <p>📅 <em>Report generated automatically by SOC Analysis AI — Last update: Oct 7, 2025</em></p>
  </footer>
</article>

            `,
          },
        },
      ],
    };

    // Guardar el contenido HTML del response simulado
    this.summaryHtml = simulatedApiResponse.choices[0].message.content;
  }

  // Open AI Summary Modal Button
  openAiSummaryModal() {
    this.AISummaryModal.openModal(this.summaryHtml); // summaryHtml es tu variable con el contenido
  }
}
