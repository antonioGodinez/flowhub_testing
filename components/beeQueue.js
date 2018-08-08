const noflo = require('noflo');
const Queue = require('bee-queue');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'Creates a beeQueue';

  c.inPorts.add('queueName', {
    datatype: 'string',
    require: true,
  });
  c.inPorts.add('redisHost', {
    datatype: 'string',
    require: true,
  });

  c.outPorts.add('queue', {
    datatype: 'any',
  });

  c.process((input, output) => {
    if(!input.hasData('queueName', 'redisHost')) return;
    const queueName = input.getData(queueName);
    const redisHost = input.getData(queueName);

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
