/* TYPE DIAGNOSE */

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }
/* PATIENT */
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

interface EntryBase {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
export interface OccupationalHealthcare extends EntryBase {
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave: {
        startDate: string,
        endDate: string
    }
}
export interface Hospital extends EntryBase {
    type: 'Hospital',
    discharge: {
        date: string,
        criteria: string,
    }
}
export interface HealthCheck extends EntryBase {
    type: 'HealthCheck',
    healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthcare | Hospital | HealthCheck;
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}
export type NewPatient = Omit<Patient, 'id' | 'entries' >;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;