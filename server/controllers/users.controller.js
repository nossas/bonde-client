import Promise from 'bluebird';
import Boom from 'boom';
import _ from 'lodash';

import FB from 'fbgraph';
Promise.promisifyAll(FB);

function UserController(opts = {}) {
  if (!(this instanceof UserController)) {
    return new UserController(opts);
  }

  this.User = opts.User || {};
  this.Club = opts.Club || {};
  this.Event = opts.Event || {};
}

UserController.prototype.getUser = function getUser(req, res, next) {
  return this.User.findById(req.user.id)
    .populate('club')
    .execAsync()
    .then(user => res.send(user))
    .catch((err) => next(Boom.wrap(err)));
};

// TODO(sprada): Figure out what is updatable
UserController.prototype.updateUser = function updateUser(req, res, next) {
  return this.User.findByIdAndUpdateAsync(req.user.id, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => next(Boom.wrap(err)));
};

UserController.prototype.getDashboard = function getDashboard(req, res, next) {
  let pages, user;

  return this.User.findById(req.user.id)
    .populate('club')
    .execAsync()
    .then(dbUser => {
      user = dbUser;
      FB.setAccessToken(user.token);

      return FB.getAsync('me/accounts')
    })
    .then(fbPages => {
      pages = fbPages.data;

      return Promise.all(_.map(pages, page => FB.getAsync(`${page.id}/events`)))
    })
    .then(events => {
      let entity = {
        user,
        pages: _.map(pages, (page, i) => _.assign({}, page, { events: events[i].data }))
      };

      return res.send(entity);
    })
    .catch(err => next(Boom.wrap(err)));
};

export default UserController;
