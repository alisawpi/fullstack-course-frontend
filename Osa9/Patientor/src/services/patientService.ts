import patients from '../../data/patients';
import { Entry, Patient, NonSensitivePatient } from '../types';

const getEntries = (): Array<NonSensitivePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    })
    );
};

const addPatient = (newPatientInfo: Patient): Patient => {
    patients.push(newPatientInfo);
    return newPatientInfo;
};

const findPatient = (patientID: string): Patient | undefined => {
    return patients.find(p => p.id === patientID);
};

const addEntry = (patientID: string, entry: Entry): Patient => {
    const patient = findPatient(patientID);
    if (patient === undefined) {
        throw new Error('Patient now found');
    } else {
        patient.entries = patient.entries.concat(entry);
        return patient;
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getEntries,
    addPatient,
    findPatient,
    addEntry
};