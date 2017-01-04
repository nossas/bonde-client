import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';

import UserController from '../../../../server/controllers/users.controller';

describe('UserController', () => {
  let controller;

  before(() => controller = new UserController());
  afterEach(() => td.reset());

  context('getUser', () => {
    it('returns user back from serialized logged in user', (done) => {
      let mockResponse = { send: td.function() };
      let mockRequest = { user: { id: 'test-id' } };
      let mockPopulate = { populate: td.function() };
      let mockExec = { execAsync: td.function() };
      let mockUser = {
        name: 'sean',
        id: 'test-id',
        foo: 'bar'
      };

      controller.User = { findById: td.function() };
      td.when(controller.User.findById('test-id'))
        .thenReturn(mockPopulate);

      td.when(mockPopulate.populate('club'))
        .thenReturn(mockExec);

      td.when(mockExec.execAsync())
        .thenResolve(mockUser);

      td.when(mockResponse.send(mockUser))
        .thenDo(() => { done() });

      controller.getUser(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockNext = td.function();
      let mockRequest = { user: { id: 'test-id' } };
      let mockError = new Error('test-error');
      let mockPopulate = { populate: td.function() };
      let mockExec = { execAsync: td.function() };

      controller.User = { findById: td.function() };
      td.when(controller.User.findById('test-id'))
        .thenReturn(mockPopulate);

      td.when(mockPopulate.populate('club'))
        .thenReturn(mockExec);

      td.when(mockExec.execAsync())
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.getUser(mockRequest, _.noop, mockNext);
    });
  });

  context('updateUser', () => {
    it('returns updated user', (done) => {
      let mockUser = { "name": "test-name" };
      let mockResponse = { send: td.function() };
      let mockRequest = {
        user: { id: 'test-id' },
        body: { "name": "test-name" }
      };

      controller.User = { findByIdAndUpdateAsync: td.function() };
      td.when(controller.User.findByIdAndUpdateAsync(mockRequest.user.id, mockRequest.body, { new: true }))
        .thenResolve(mockUser);

      td.when(mockResponse.send(mockUser)).thenDo(() => done());

      controller.updateUser(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockNext = td.function();
      let mockError = new Error('test-error');
      let mockRequest = {
        user: { id: 'test-id' },
        body: { "name": "test-name" }
      };

      controller.User = { findByIdAndUpdateAsync: td.function() };
      td.when(controller.User.findByIdAndUpdateAsync(mockRequest.user.id, mockRequest.body, { new: true }))
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.updateUser(mockRequest, _.noop, mockNext);
    });
  });

  context('dashBoard', () => {
    it('it returns all data from logged in user', (done) => {
      let mockRequest = { user: { id: 'test-user-id' } };
      let mockResponse = { send: td.function() };
      let mockUser = {
        _id: 'test-user-id',
        token: 'test-token',
        name: 'sean',
        club: {
          _id: 'test-club-id',
          name: 'baum'
        }
      };
      let mockPopulate = { populate: td.function() };
      let mockExec = { execAsync: td.function() };
      let mockAccounts = { data: [{ id: 'test-page-id' }] };
      let mockEvents = { data:  { name: 'test-event-name', id: 'test-event-id' } };
      let mockEntity = {
        user: mockUser,
        pages: [{
          id: 'test-page-id',
          events: { name: 'test-event-name', id: 'test-event-id' }
        }]
      };

      controller.User = { findById: td.function() };
      td.when(controller.User.findById('test-user-id'))
        .thenReturn(mockPopulate);

      td.when(mockPopulate.populate('club'))
        .thenReturn(mockExec);

      td.when(mockExec.execAsync())
        .thenReturn(Promise.resolve(mockUser))

      // td.replace(FB, 'getAsync');
      // td.when(FB.getAsync('me/accounts'))
      //   .thenReturn(Promise.resolve(mockAccounts));
      //
      // td.when(FB.getAsync('test-page-id/events'))
      //   .thenReturn(Promise.resolve(mockEvents));

      td.when(mockResponse.send(mockEntity))
        .thenDo(() => { done() });

      controller.getDashboard(mockRequest, mockResponse, _.noop);
    });

    it('handles errors', (done) => {
      let mockRequest = { user: { id: 'test-user-id' } };
      let mockNext = td.function();
      let mockError = new Error('test-error');
      let mockPopulate = { populate: td.function() };
      let mockExec = { execAsync: td.function() };

      controller.User = { findById: td.function() };
      td.when(controller.User.findById('test-user-id'))
        .thenReturn(mockPopulate);

      td.when(mockPopulate.populate('club'))
        .thenReturn(mockExec);

      td.when(mockExec.execAsync())
        .thenReturn(Promise.reject(mockError))

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.getDashboard(mockRequest, _.noop, mockNext);
    });
  });
});
