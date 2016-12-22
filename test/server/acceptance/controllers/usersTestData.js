const userTestData = {
  getDashboard: {
    pages: {
      data: [
        {
          access_token: 'test-token1',
          category: 'Concert Tour',
          name: 'Party Pooper Club',
          id: '1769754093273789'
        },{
          access_token: 'test-token2',
          category: 'Performing Arts',
          name: 'Party Pooper',
          id: '731033223716085'
        }]
    },
    events: [{
      data:[{
        description: 'Lorem ipsum dolor sit amet.',
        end_time: '2016-12-28T18:00:00-0500',
        name: 'Mega show number 3',
        place: {
          name: 'Brooklyn, New York',
          location: {
            city: 'Brooklyn',
            country: 'United States',
            latitude: 40.65,
            longitude: -73.95,
            state: 'NY'
          },
          id: '112111905481230'
        },
        start_time: '2016-12-23T15:00:00-0500',
        id: '1316289695089735'
        },{
        description: 'Mauris rutrum eros at gravida sagittis.',
        end_time: '2016-12-22T18:00:00-0500',
        name: 'Mega show number 2',
        place: {
          name: 'Brooklyn, New York',
            location: {
              city: 'Brooklyn',
              country: 'United States',
              latitude: 40.65,
              longitude: -73.95,
              state: 'NY'
            },
            id: '112111905481230'
          },
         start_time: '2016-12-15T15:00:00-0500',
         id: '393288081014758'
       },{
        end_time: '2016-12-10T18:00:00-0500',
        name: 'Mega show number 1',
        place: {
          name: 'Brooklyn, New York',
          location: {
            city: 'Brooklyn',
            country: 'United States',
            latitude: 40.65,
            longitude: -73.95,
            state: 'NY'
          },
          id: '112111905481230'
        },
        start_time: '2016-12-10T15:00:00-0500',
        id: '1011966898928824'
      }]
    },
    { data: [{
        end_time: '2016-12-14T15:00:00-0800',
          name: 'Universal JS conf',
          place: {
            name: 'San Francisco, CA',
            location: {
              city: 'San Francisco',
              country: 'United States',
              latitude: 37.775,
              longitude: -122.418,
              state: 'CA'
            },
            id: '114952118516947'
          },
          start_time: '2016-12-14T12:00:00-0800',
          id: '1628408380795925'
        }]
    }],
    entity: {
      pages: [{
        access_token: 'test-token1',
        category: 'Concert Tour',
        name: 'Party Pooper Club',
        id: '1769754093273789',
        events: [{
          description: 'Lorem ipsum dolor sit amet.',
          end_time: '2016-12-28T18:00:00-0500',
          name: 'Mega show number 3',
          place: {
            name: 'Brooklyn, New York',
            location: {
              city: 'Brooklyn',
              country: 'United States',
              latitude: 40.65,
              longitude: -73.95,
              state: 'NY'
            },
            id: '112111905481230'
          },
          start_time: '2016-12-23T15:00:00-0500',
          id: '1316289695089735'
        }, {
          description: 'Mauris rutrum eros at gravida sagittis.',
          end_time: '2016-12-22T18:00:00-0500',
          name: 'Mega show number 2',
          place: {
            name: 'Brooklyn, New York',
            location: {
              city: 'Brooklyn',
              country: 'United States',
              latitude: 40.65,
              longitude: -73.95,
              state: 'NY'
            },
            id: '112111905481230'
          },
          start_time: '2016-12-15T15:00:00-0500',
          id: '393288081014758'
        }, {
          end_time: '2016-12-10T18:00:00-0500',
          name: 'Mega show number 1',
          place: {
            name: 'Brooklyn, New York',
            location: {
              city: 'Brooklyn',
              country: 'United States',
              latitude: 40.65,
              longitude: -73.95,
              state: 'NY'
            },
            id: '112111905481230'
          },
          start_time: '2016-12-10T15:00:00-0500',
          id: '1011966898928824'
        }]
      }, {
        access_token: 'test-token2',
        category: 'Performing Arts',
        name: 'Party Pooper',
        id: '731033223716085',
        events: [{
          end_time: '2016-12-14T15:00:00-0800',
          name: 'Universal JS conf',
          place: {
            name: 'San Francisco, CA',
            location: {
              city: 'San Francisco',
              country: 'United States',
              latitude: 37.775,
              longitude: -122.418,
              state: 'CA'
            },
            id: '114952118516947'
          },
          start_time: '2016-12-14T12:00:00-0800',
          id: '1628408380795925'
        }]
      }]
    }
  }
};

export default userTestData;
