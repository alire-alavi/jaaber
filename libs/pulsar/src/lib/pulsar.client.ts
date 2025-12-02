import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleInit, OnModuleDestroy {
  private pulsarClient: Client;

  constructor(private readonly configSerivce: ConfigService) { }

  async onModuleInit() {
    this.pulsarClient = new Client({
      serviceUrl: this.configSerivce.getOrThrow<string>('PULSAR_SERVICE_URL'),
    });
  }

  async onModuleDestroy() {
    await this.pulsarClient.close();
  }

  async createProducer(topic: string) {
    return this.pulsarClient.createProducer({ topic });
  }
}
