import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Job } from './models/jobs.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/exectue-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@jaaber/nestjs';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') exectueJobInput: ExecuteJobInput) {
    return this.jobsService.executeJob(exectueJobInput.name);
  }
}
