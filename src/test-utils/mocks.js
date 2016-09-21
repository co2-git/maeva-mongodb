import mockery from 'mockery';

class Model {}

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

mockery.registerMock('maeva', {Model});
