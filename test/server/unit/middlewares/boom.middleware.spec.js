import td from 'testdouble';
import Boom from 'boom';
import _ from 'lodash';

import BoomHandler from '../../../../server/middlewares/boom.middleware';

describe('BoomHandler', () => {
  it('handles preconditionFailed', (done) => {
    let mockError = Boom.preconditionFailed('test message');
    let mockResponse = { status: td.function() };
    let mockStatus = { send: td.function() };

    td.when(mockResponse.status(mockError.output.statusCode))
      .thenReturn(mockStatus);

    td.when(mockStatus.send(mockError.output.payload))
      .thenDo(() => { done() });

    BoomHandler(mockError, _.noop, mockResponse, _.noop);
  });

  it('handles notFound', (done) => {
    let mockError = Boom.notFound('test message');
    let mockResponse = { status: td.function() };
    let mockStatus = { send: td.function() };

    td.when(mockResponse.status(mockError.output.statusCode))
      .thenReturn(mockStatus);

    td.when(mockStatus.send(mockError.output.payload))
      .thenDo(() => { done() });

    BoomHandler(mockError, _.noop, mockResponse, _.noop);
  });

  it('handles server errors', (done) => {
    let mockError = new Error('test message');
    let mockResponse = { status: td.function() };
    let mockStatus = { send: td.function() };

    td.when(mockResponse.status(500))
      .thenReturn(mockStatus);

    td.when(mockStatus.send(mockError))
      .thenDo(() => { done() });

    BoomHandler(mockError, _.noop, mockResponse, _.noop);
  });
});
