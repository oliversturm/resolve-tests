import { crudResolvers } from 'resolve-crud';
import spec from '../crud-spec.js';

export default { ...crudResolvers(spec) };
