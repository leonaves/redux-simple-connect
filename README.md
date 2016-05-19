# redux-simple-connect

A simplification of react-redux's connect function.

## What?

Provides one default export:

```js
connect([mapStoreToProps], [options])
```

### Arguments

- `[mapStoreToProps(state, dispatch, ownProps): props] (Function): 

## Why?

With the recent proliferation of selectors in the redux community, apps need access to the state in more and more places. Using something like `redux-thunk` post dispatch might not work, as you may be using other middleware. This enables you to more simply pass your state into your action creators.
