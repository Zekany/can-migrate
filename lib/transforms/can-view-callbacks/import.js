'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformer;

var _getConfig = require('../../utils/getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _renameImport = require('../../utils/renameImport');

var _renameImport2 = _interopRequireDefault(_renameImport);

var _replaceRefs = require('../../utils/replaceRefs');

var _replaceRefs2 = _interopRequireDefault(_replaceRefs);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is a generated file, see src/templates/import/import.ejs
function transformer(file, api, options) {
  var debug = (0, _debug2.default)('can-migrate:can-view-callbacks-import:' + file.path);
  var config = (0, _getConfig2.default)(options.config);
  var newLocalName = config.moduleToName['can-view-callbacks'];
  var j = api.jscodeshift;
  var printOptions = options.printOptions || {};
  var root = j(file.source);
  var oldLocalName = (0, _renameImport2.default)(root, {
    oldSourceValues: ['can/view/callbacks/', 'can/view/callbacks/callbacks', 'can/view/callbacks/callbacks.js'],
    newSourceValue: 'can-view-callbacks',
    newLocalName: newLocalName
  });
  if (oldLocalName) {
    debug('Replacing all occurences of ' + oldLocalName + ' with ' + newLocalName);
    (0, _replaceRefs2.default)(j, root, {
      oldLocalName: oldLocalName,
      newLocalName: newLocalName
    });
  }
  return root.toSource(printOptions);
}
module.exports = exports['default'];