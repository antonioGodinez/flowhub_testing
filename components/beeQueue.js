const noflo = require('noflo');
const Queue = require('bee-queue');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'Creates a beeQueue';

  c.inPorts.add('queuename', {
    datatype: 'string',
    require: true,
  });
  c.inPorts.add('redishost', {
    datatype: 'string',
    require: true,
  });

  c.outPorts.add('queue', {
    datatype: 'object',
  });

  c.process((input, output) => {
    if(!input.hasData('queuename', 'redishost')) return;
    const queueName = input.getData('queuename');
    const redisHost = input.getData('redishost');

    const queue = new Queue(queueName, {
      redis: {
        url: redisHost,
      },
      isWorker: true,
      removeOnSuccess: false,
    });

    output.send({
      queue
    });

    output.done();
  });


  return c;
};
