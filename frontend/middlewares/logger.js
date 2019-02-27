export default () => next => action => {
  console.log(`%c [ACTION.TYPE]: ${action.type} :: %c [ACTION.PAYLOAD]: ${JSON.stringify(action.payload, '', 2)}`, 'color: darkcyan', 'color: darkorange');
  return next(action);
}