export const nodeLogger = store => next => action => {
  console.group(`action: ${action.type}`)
  console.info(`origin: ${action.origin}`);
  console.info(action.payload);
  console.groupEnd()
  return next(action);
};
