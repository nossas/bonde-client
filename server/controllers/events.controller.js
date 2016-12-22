import Promise from 'bluebird';
import Boom from 'boom';
import _ from 'lodash';

import FB from 'fbgraph';
Promise.promisifyAll(FB);

function EventController(opts = {}) {
  if (!(this instanceof EventController)) {
    return new EventController(opts);
  }

  this.User = opts.User || {};
  this.Club = opts.Club || {};
  this.Event = opts.Event || {};
}

EventController.prototype.getEvent = function getEvent(req, res, next) {
  return this.Event.findByIdAsync(req.params.id)
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.createEvent = function createEvent(req, res, next) {
    return this.User.findByIdAsync(req.user.id)
    .then(user => this.Club.findByIdAsync(user.club))
    .then(club => {
      if(!club){
        return Promise.reject(Boom.preconditionFailed('You need to register a club to create events'));
      }

      return Promise.all([ club, this.Event.createAndSave(req.body) ]);
    })
    .spread((club, newEvent) => {
      club.events.push(newEvent._id);
      return Promise.all([ club.saveAsync(), newEvent ])
    })
    .spread((club, newEvent) => res.send(newEvent))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.updateEvent = function updateEvent(req, res, next) {
  return this.User.findByIdAsync(req.user.id)
    .then(user => this.Club.findByIdAsync(user.club))
    .then(club => {
      if(!club){
        return Promise.reject(Boom.preconditionFailed('You need to register a club to edit events'));
      }

      return Promise.all([
        club.events.indexOf(req.params.id),
        club
      ]);
    })
    .spread((eventIndex, club) => {
      if(eventIndex === -1){
        return Promise.reject(Boom.preconditionFailed('No event with that id in your club'));
      }

      return this.Event.findByIdAndUpdateAsync(club.events[eventIndex], req.body, { new: true })
    })
    .then(event => res.send(event))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.getFBEvent = function getFBEvent(req, res, next) {
  return this.User.findByIdAsync(req.user.id)
    .then(user => {
      FB.setAccessToken(user.token);
      
      return Promise.props({
        data: FB.getAsync(`${req.params.id}`),
        cover: FB.getAsync(`${req.params.id}?fields=cover`)
      });
    })
    .then(info => res.send(info))
    .catch(err => next(Boom.wrap(err)));
};

EventController.prototype.purchaseTicket = function purchaseTicket(req, res, next) {
  // body...
};

export default EventController;
