export type SensorSummary = {
  __typename: 'SensorSummary';
  sensorType?: string | null;
  deviceId?: string | null;
  measure_name?: string | null;
  time?: string | null;
  value?: number | null;
};

export type SensorData = {
  __typename: 'SensorData';
  time?: string | null;
  measureValue?: number | null;
};
