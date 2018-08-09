const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();

  c.description = 'Register a queue listener';

  c.inPorts.add('queue', {
    datatype: 'object',
    require: 'string',
  });
  c.outPorts.add('out', {
    datatype: 'string'
  });

  c.process((input, output) => {
    if(!input.hasData('queue')) return;

    input.getData('queue').process((job, done) => {
      switch(job.data.command) {
        case 'heartbeat':
          return done(null, 'beap beap');

        default:
          return done(new Error('No beap beap'));
      }
    });

    output.send({
      out: 'registered'
    });
    //output.done();
  });

  return c;
};