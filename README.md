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
import RecordList from '../components/RecordList';

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

### Automatic Action Dispatching

This is a convenience mostly for cleaner code, but pay attention, as it could trip you up. I'll try and add some silent (as possible) handling of issues with this soon:

**Unlike the default `connect` function Redux Simple Connect automatically dispatches any actions returned from property functions. If you are ignoring your return values right now you may end up accidentally dispatching something you didn't mean to.**

Let me try to explain. Do you find yourself doing this in your container components?

```js
onAddItem: () => dispatch(myAddAction()),
onAddNote: (note) => dispatch(myNoteAction(note)),
onSelect: (index) => dispatch(mySelectAction(myDynamicArgument(index))),
onDeselect: () => dispatch(myDeselectAction()),
onRemove: dispatch(myRemoveAction()),
onMicrowaveBing: dispatch(myMicrowaveAction()),
//and on it goes...
```

Wouldn't it be simpler if you could do this:
 
 ```js
onAddItem: myAddAction,
onAddNote: myNoteAction,
onSelect: (index) => mySelectAction(myDynamicArgument(index)),
onDeselect: myDeselectAction,
onRemove: myRemoveAction,
onMicrowaveBing: myMicrowaveAction,
//and on it goes...
```

Well you can with Redux Simple Connect, as it will automatically dispatch the result of any functions passed as props. This doesn't stop you from dispatching yourself of course:

```js
onConfirm: (confirmationCode) => {
    dispatch(Actions.confirmWithCode(confirmationCode));
    dispatch(Actions.closeWindow());
}
```

But if you return from these functions, the return value will still be dispatched, so if you are using this `connect` function, doing this will cause problems.

```js
onEvent: () => dispatch(action())
```

Instead, do this, if you need to dispatch yourself:

```js
onEvent: () => { dispatch(action()) }
```

## Why?

With the recent proliferation of selectors in the redux community, apps need access to the state in more and more places. Using something like `redux-thunk` post dispatch might not work, as you may be using other middleware. This enables you to more simply pass your state into your action creators.

This function wraps the default `connect` function using its public APIs (promise, go look at the source), so should be fairly stable. However, I don't reccomend using it if you can get by with the default connect, as you will lose certain performance benefits, especially if you weren't planning on listening to the state at all.

