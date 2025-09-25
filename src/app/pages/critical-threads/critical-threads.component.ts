import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderCardComponent } from '../../components/header-card/header-card.component';
import { HeatmapComponent } from '../../components/custom/heatmap/heatmap.component';

@Component({
  selector: 'app-critical-threads',
  imports: [HeaderComponent, HeaderCardComponent, HeatmapComponent],
  templateUrl: './critical-threads.component.html',
  styleUrl: './critical-threads.component.css',
})
export class CriticalThreadsComponent implements OnInit {
  isMainKPI: boolean = true;
  notMainKpi: boolean = false;
  mttValue: number = 0;
  numberOfOpenedTickets: number = 0;

  // data generada de ejemplo temporal
  tickets = [
    { mes: 'Enero', prioridad: 'Alta' },
    { mes: 'Enero', prioridad: 'Media' },
    { mes: 'Febrero', prioridad: 'Alta' },
    { mes: 'Febrero', prioridad: 'Baja' },
    { mes: 'Febrero', prioridad: 'Alta' },
    { mes: 'Marzo', prioridad: 'Media' },
    { mes: 'Marzo', prioridad: 'Alta' },
    { mes: 'Abril', prioridad: 'Alta' },
    { mes: 'Mayo', prioridad: 'Media' },
    { mes: 'Junio', prioridad: 'Alta' },
    { mes: 'Julio', prioridad: 'Baja' },
    { mes: 'Agosto', prioridad: 'Alta' },
    { mes: 'Septiembre', prioridad: 'Media' },
    { mes: 'Octubre', prioridad: 'Alta' },
    { mes: 'Octubre', prioridad: 'Alta' },
    { mes: 'Noviembre', prioridad: 'Alta' },
    { mes: 'Diciembre', prioridad: 'Alta' },
  ];

  xAccessor = (d: any) => d.mes;
  yAccessor = (d: any) => d.prioridad;

  ngOnInit() {}
}
