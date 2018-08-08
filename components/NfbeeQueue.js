const noflo = require('noflo');

exports.getComponent = () => {
    const c = new noflo.Component();

    c.description = 'output the same as the input';
    c.inPorts.add('in', {
        datatype: 'string'
    });
    c.outPorts.add('out', {
        datatype: 'string'
    });

    c.process((input, output) => {
        output.send({
            out: input.getData('in')
        });
        output.done();
    });
};
