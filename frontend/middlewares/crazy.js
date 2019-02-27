export default () => next => action => {
  if (action.type && action.type.endsWith('_FAIL')) {
    console.error({type: action.type, status: 500, errorMessage: action.payload || 'server message'});
  }
  
  return next(action);
}