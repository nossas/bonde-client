const Queue = require('bee-queue');
const redis = require('redis');
import { client as elkClient } from './docs';

export const queue = new Queue('example', {
  redis: redis.createClient(process.env.REDIS_URL || "redis://127.0.0.1:6379"),
});

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Process jobs from as many servers or processes as you like
queue.process(1, async (job: any) => {

  // console.log(`Processing job`, job.data);
  console.log(await elkClient.indices.refresh({ index: 'bonde-actions' }));
  const result = await elkClient.search({
    index: 'bonde-actions-2',
    body: {
      query: {
        match: { id: job.data.id }
      }
    }
  });
  console.log(result.body.hits.hits);
  // return { error: false };
  return (result.body.hits.hits !== undefined && result.body.hits.hits.length >= 1) ? result.body.hits.hits : elkClient.index({
    index: 'bonde-actions-2',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: job.data
  });
  // .then((res:any) => {
  //   console.log(res.statusCode);
  // });
  // console.log(result);
  // return Promise.allSettled([
  //   await delay(100),
  //   await elkClient.index({
  //     index: 'bonde-actions',
  //     // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
  //     body: job.data
  //   })
  // ]);
});
