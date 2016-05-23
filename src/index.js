import { connect as connect } from 'react-redux';

export default (mapStoreToProps, options) => {

    let mergeProps = (stateObject, dispatchObject, ownProps) => {
        let { state } = stateObject;
        let { dispatch } = dispatchObject;

        let props = mapStoreToProps(state, dispatch, ownProps);

        Object.keys(props).map(key => {
            if (typeof props[key] === 'function') {
                let _prop = props[key];
                props[key] = (...args) => {
                    let action = _prop(...args);
                    if (action !== undefined) dispatch(action);
                }
            }
        });

        return props;
    };

    return connect(
        (state) => ({ state }),
        (dispatch) => ({ dispatch }),
        mergeProps,
        options
    );
}
