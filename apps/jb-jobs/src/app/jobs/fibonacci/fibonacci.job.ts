import { PulsarClient } from '@jaaber/pulsar';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';
import { FibonacciData } from '../../interfaces/fibonacci-job.interface';

@Job({
  name: 'fibonacci',
  description: 'generate a fib sequence and store in the database',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
