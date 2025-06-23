/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Amplify } from 'aws-amplify';
import { SensorData, SensorSummary } from './model';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private client = generateClient();

  constructor() {
    Amplify.configure({
      API: {
        GraphQL: {
          endpoint:
            'https://nukrqo3vtjchtpc353ia2zonbm.appsync-api.us-east-1.amazonaws.com/graphql',
          region: 'us-east-1',
          defaultAuthMode: 'apiKey',
          apiKey: 'da2-q6wagkpmxre6de6gpjnk7olx4i',
        },
      },
    });
  }

  // GetSensorSummary as Observable
  GetSensorSummary(deviceId: string): Observable<SensorSummary[]> {
    const statement = `query GetSensorSummary($deviceId: String!) {
      getSensorSummary(deviceId: $deviceId) {
        __typename
        sensorType
        deviceId
        measure_name
        time
        value
      }
    }`;

    return from(
      this.client.graphql({
        query: statement,
        variables: { deviceId },
      })
    ).pipe(
      map((response: any) => {
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
        return response.data.getSensorSummary as SensorSummary[];
      })
    );
  }

  // GetSensorHistory as Observable
  GetSensorHistory(
    deviceId: string,
    sensorType: string
  ): Observable<SensorData[]> {
    const statement = `query GetSensorHistory($deviceId: String!, $sensorType: String!) {
      getSensorHistory(deviceId: $deviceId, sensorType: $sensorType) {
        __typename
        time
        measureValue
      }
    }`;

    return from(
      this.client.graphql({
        query: statement,
        variables: { deviceId, sensorType },
      })
    ).pipe(
      map((response: any) => {
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
        return response.data.getSensorHistory as SensorData[];
      })
    );
  }
}
