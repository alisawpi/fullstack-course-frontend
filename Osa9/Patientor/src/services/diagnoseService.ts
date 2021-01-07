import diagnoseData from '../../data/diagnoses';
import { Diagnosis }from '../types';

const getEntries = () : Array<Diagnosis> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnoseData;
  };
  
  const addEntry = (): null => {
    return null;
  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default {
    getEntries,
    addEntry
  };