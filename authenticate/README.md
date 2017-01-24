# Authenticate

Module of control for authenticate user.

## Redux

`import { reducer } from '~/authenticate/redux'`

    /* initial state */
    {
        isLoaded: false,
        isLoading: false,
        user: undefined,
        credentials: undefined,
        error: undefined
    }

`import { actions } from '~/authenticate/redux'`

- **login({ email, password })**: Authenticate in server and save credentials and user in session and in state tree
- **load()**: Load in state tree, credentials and user stored in session
- **logout()**: Destroy session and remove credentials and user, from state tree

## Config server and proxy

1. Start auth server, in your server file with express:


    import { startServer as authStartServer } from '~/authenticate'

    /* ... */

    server.listen(3333, () => {
      // start server
      authStartServer({ authPort: 3334 })
        .then(() => {
          console.log('authenticate listening on port 3334')
        })
    })

2. Add proxy in your server for authentication server started:


    import proxy from 'http-proxy-middleware'

    /* ... */

    // add proxy in express instance
    app.use('/auth', proxy({
      target: `http://localhost:3334`,
      pathRewrite: { '^/auth': '' }
    }))

3. Add auth client in thunkExtraArgument server-side:


    import AuthClient from '~/authenticate/client'

    /* ... */

    app.get('*', (req, res) => {

      createStore(createReducer(), initialState, compose(
        applyMiddleware(
          thunk.withExtraArgument({
            auth: new AuthClient(req),
            /* ... */
          }),
          /* ... */
        ),
      ))
    })

4. Add auth client in thunkExtraArgument client-side:


    import AuthClient from '~/authenticate/client'

    /* ... */
    const initialState = window.INITIAL_STATE || {}

    const store = createStore(createReducer(), initialState, compose(
      applyMiddleware(
        thunk.withExtraArgument({
          auth: new AuthClient(),
          /* ... */
        }),
        /* ... */
      ),
    ))
