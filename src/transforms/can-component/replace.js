// This is a generated file, see src/templates/replace/replace.ejs
import getConfig from '../../utils/getConfig';
import dependencyUtils from '../../utils/dependencyUtils';
import makeDebug from 'debug';

export default function transformer(file, api, options) {
  const debug = makeDebug(`can-migrate:can-component-replace:${file.path}`);
  const config = getConfig(options.config);
  const j = api.jscodeshift;
  const printOptions = options.printOptions || {};
  const root = j(file.source);
  let found = false;
  const newName = config.moduleToName['can-component'];

  debug(`Finding all instances of 'can.Component'`);
  root.find(j.MemberExpression).filter(expression => {
    let match = true;
    
      match = match && expression.value.object.name === 'can';
    
    return match && expression.value.property.name === 'Component';
  }).forEach(expression => {
    debug(`Replacing all instances of 'can.Component' with '${newName}'`);
    found = true;
    
    // can.Map -> canMap
    j(expression).replaceWith(j.identifier(newName));
    
  });

  if (found) {
    dependencyUtils.add(root, 'can-component', newName, ['can', 'can/', 'can/can', 'can/can.js']);
  }
  return root.toSource(printOptions);
}
