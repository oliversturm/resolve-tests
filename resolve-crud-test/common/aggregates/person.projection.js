import { crudAggregateProjections } from 'resolve-crud';
import spec from '../crud-spec.js';

export default { ...crudAggregateProjections(spec) };
