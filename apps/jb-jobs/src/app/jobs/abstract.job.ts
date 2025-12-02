import { PulsarClient } from '@jaaber/pulsar';
import { OnModuleDestroy } from '@nestjs/common';
import { Producer } from 'pulsar-client';

export abstract class AbstractJob<T> implements OnModuleDestroy {
  producer: Producer;

  constructor(private readonly pulsarClient: PulsarClient) { }

  async execute(data: T, job: string) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
      console.log('Created producer successfully: ', this.producer);
    }
    this.producer.send({ data: Buffer.from(JSON.stringify(data)) });
  }

  async onModuleDestroy() {
    await this.producer.close();
  }
}
