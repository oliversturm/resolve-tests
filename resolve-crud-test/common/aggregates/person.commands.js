import { crudCommands } from 'resolve-crud';
import spec from '../crud-spec.js';

export default { ...crudCommands(spec) };
