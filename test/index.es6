import DropDown from '../index.es6';
import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
describe('DropDown', () => {
  it('is compatible with React.Component', () => {
    DropDown.should.be.a('function').and.respondTo('render');
  });
  it('renders a React element', () => {
    React.isValidElement(<DropDown/>).should.equal(true);
  });
});
