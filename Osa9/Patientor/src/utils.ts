/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Hospital, OccupationalHealthcare, HealthCheck, Entry, Patient } from './types';

function makeid(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/*STRING */
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseStringField = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing field: ' + name);
    }

    return name;
};

/* DATES */
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

/*GENDER*/
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
};

/*VALIDATE NEW PATIENT INFO */
export const validatePatientInfo = (object: any): Patient => {
    return {
        id: makeid(36),
        name: parseStringField(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseStringField(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseStringField(object.occupation),
        entries: []
    };
};
const validateHospital = (object: any): Hospital => {
    if (!object.discharge || !object.discharge.date || !object.discharge.criteria) {
        throw new Error('Entry missing required fields!');
    }
    const newEntry: Hospital = {
        id: makeid(36),
        type: object.type,
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        discharge: {
            date: object.discharge.date,
            criteria: object.discharge.criteria
        }
    };
    if (object.diagnosisCodes !== undefined) newEntry.diagnosisCodes = object.diagnosisCodes;
    return newEntry;
};

const validateOccupational = (object: any): OccupationalHealthcare => {
    if (!object.employerName || !object.sickLeave || !object.sickLeave.startDate || !object.sickLeave.endDate) {
        throw new Error('Entry missing required fields!');
    }
    if (!isString(object.employerName) || !isDate(object.sickLeave.startDate) || !isDate(object.sickLeave.endDate)) {
        throw new Error('Malformatted info!');
    }
    const newEntry: OccupationalHealthcare = {
        id: makeid(36),
        type: object.type,
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        employerName: object.employerName,
        sickLeave: {
            startDate: object.sickLeave.startDate,
            endDate: object.sickLeave.endDate
        }
    };
    if (object.diagnosisCodes !== undefined) newEntry.diagnosisCodes = object.diagnosisCodes;
    return newEntry;
};
const validateHealthCheck = (object: any): HealthCheck => {
    if (!object.healthCheckRating || typeof object.healthCheckRating !== 'number') {
        throw new Error('Entry missing required fields!');
    }
    const newEntry: HealthCheck = {
        id: makeid(36),
        type: object.type,
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        healthCheckRating: object.healthCheckRating

    };
    if (object.diagnosisCodes !== undefined) newEntry.diagnosisCodes = object.diagnosisCodes;
    return newEntry;
};
export const validateEntryInfo = (object: any): Entry => {
    if (!object.description || !object.date || !object.specialist || !object.type) {
        throw new Error('Entry missing required fields!');
    }
    switch (object.type) {
        case 'Hospital':
            return validateHospital(object);
        case 'HealthCheck':
            return validateHealthCheck(object);
        case 'OccupationalHealthcare':
            return validateOccupational(object);
        default:
            throw new Error('Unknown entry type!');
    }
}