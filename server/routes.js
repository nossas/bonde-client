import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import BoomHandler from './middlewares/boom.middleware';
import passport from './auth.init.js';

import ClubController from './controllers/clubs.controller';
import EventController from './controllers/events.controller';
import UserController from './controllers/users.controller';

import Club from './models/club.model';
import Event from './models/event.model';
import User from './models/user.model';

const instantiation = () => {
  return {
    Events: new EventController ({ User, Event, Club }),
    Clubs: new ClubController ({ User, Event, Club }),
    Users: new UserController ({ User, Event, Club })
  };
};

const Routing = () => {
  const router = new Router();
  const Controllers = instantiation();

  // Login Routes
  router.get('/api/users/login',
    passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

  router.get('/api/users/login/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => res.cookie('loggedin', true).cookie('user', 'User').redirect('/'));

  router.get('/logout',
    (req, res) => {
      res.clearCookie('loggedin').clearCookie('user');
      req.logOut();
      return res.redirect('/');
    });

  // User Routes
  router.get('/api/users', ensureLoggedIn(), Controllers.Users.getUser.bind(Controllers.Users));
  router.get('/api/users/dashboard', ensureLoggedIn(), Controllers.Users.getDashboard.bind(Controllers.Users));
  router.patch('/api/users', ensureLoggedIn(), Controllers.Users.updateUser.bind(Controllers.Users));

  // Clubs Routes
  router.get('/api/clubs/pending', Controllers.Clubs.getPendingClubs.bind(Controllers.Clubs));
  router.get('/api/clubs/:id', Controllers.Clubs.getClub.bind(Controllers.Clubs));
  router.patch('/api/clubs', ensureLoggedIn(), Controllers.Clubs.updateClub.bind(Controllers.Clubs));
  router.post('/api/clubs', ensureLoggedIn(), Controllers.Clubs.createClub.bind(Controllers.Clubs));

  // Event Routes
  router.get('/api/events/fb/:id', Controllers.Events.getFBEvent.bind(Controllers.Events));
  router.get('/api/events/:id', Controllers.Events.getEvent.bind(Controllers.Events));
  router.patch('/api/events/:id', Controllers.Events.updateEvent.bind(Controllers.Events));
  router.post('/api/events', Controllers.Events.createEvent.bind(Controllers.Events));
  router.post('/api/events/:id/purchase', Controllers.Events.purchaseTicket.bind(Controllers.Events));

  router.use(BoomHandler);

  return router;
};

export default Routing;
