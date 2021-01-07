/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { Patient, Entry } from '../types';
import { validatePatientInfo, validateEntryInfo } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('getting patient');
    res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const foundPatient: Patient | undefined = patientService.findPatient(id);
    if (foundPatient === undefined) {
        res.status(404).send('No such patient in the system!');
    } else {
        res.send(foundPatient); 
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientInfo: Patient = validatePatientInfo(req.body);
        const newPatient: Patient = patientService.addPatient(newPatientInfo);
        res.json(newPatient);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }

});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        const newEntryInfo: Entry = validateEntryInfo(req.body); 
        const updatedPatient: Patient = patientService.addEntry(id,newEntryInfo);
        res.json(updatedPatient);
    } catch (e){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
}); 

export default router;