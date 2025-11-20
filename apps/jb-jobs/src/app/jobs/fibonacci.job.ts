import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'fibonacci',
  description: 'generate a fib sequence and store in the database',
})
export class FibonacciJob extends AbstractJob {}
