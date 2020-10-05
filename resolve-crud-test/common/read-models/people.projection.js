import { crudReadModelProjections } from 'resolve-crud';
import spec from '../crud-spec.js';

export default { ...crudReadModelProjections(spec) };
