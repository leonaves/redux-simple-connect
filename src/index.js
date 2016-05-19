import { connect as connect } from 'react-redux';

export default (mapStoreToProps, options) => {

    let mergeProps = (stateObject, dispatchObject, ownProps) => {
        let { state } = stateObject;
        let { dispatch } = dispatchObject;

        return mapStoreToProps(state, dispatch, ownProps)
    };

    return connect(
        (state) => ({ state }),
        (dispatch) => ({ dispatch }),
        mergeProps,
        options
    );
}
