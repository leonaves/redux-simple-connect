# redux-simple-connect

A simplification of react-redux's connect function.

## What?

Provides one default export:

```js
connect([mapStoreToProps], [options])
```

### Arguments

- `[mapStoreToProps(state, dispatch, ownProps): props]` (Function): A function you provide that receives the state and the dispatch method. Think of it as a combination of the default `connect`'s `mapStateToProps` and `mapDispatchToProps`.

- `[options] (Object)`: The options object from the default `connect`. See [redux's docs](https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments) for more details.

### Examples

```js
import connect from 'redux-simple-connect';
import { mostRecentRecord, allRecords } from '../selectors';
import { displayRecord } from '../actions'

const mapStoreToProps = (state, dispatch, ownProps) => {
    return{
        onClick: () => {
            dispatch(
              displayRecord(mostRecentRecord(state))
            );
        },

        records: allRecords(state)
    };
};

export default connect(
    mapStoreToProps
)(RecordList);
```

## Why?

With the recent proliferation of selectors in the redux community, apps need access to the state in more and more places. Using something like `redux-thunk` post dispatch might not work, as you may be using other middleware. This enables you to more simply pass your state into your action creators.

This function wraps the default `connect` function using its public APIs (promise, go look at the source), so should be fairly stable. However, I don't reccomend using it if you can get by with the default connect, as you will lose certain performance benefits, especially if you weren't planning on listening to the state at all.
