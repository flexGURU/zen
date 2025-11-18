import { inject } from '@angular/core';
import { APIService } from './API.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const queryService = () => {
  const sensorService = inject(APIService);

  const query = injectQuery(() => ({
    queryKey: ['sensorSummary'],
    refetchInterval: 10000,
    staleTime: 5000,
    queryFn: () => lastValueFrom(sensorService.getSensorData()),
  }));

  return query;
};
