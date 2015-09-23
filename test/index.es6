import DropDown from '../index.es6';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
describe('DropDown', () => {
  it('is compatible with React.Component', () => {
    DropDown.should.be.a('function').and.respondTo('render');
  });

  it('renders a React element', () => {
    React.isValidElement(<DropDown/>).should.equal(true);
  });

  // I need to run through this next with a grown-up.
  //
  //
  // describe('Rendering', () => {
  //   const renderer = TestUtils.createRenderer();
  //   const testData = {
  //     image: {
  //       src: 'src',
  //       alt: 'Alt string',
  //       caption: 'Image caption',
  //     },
  //     text: {
  //       header: 'header',
  //       body: 'body',
  //     },
  //     expandedcontent: 'Expanded content string',
  //   };
  //   it('does not render text header if data.text.header is omitted', () => {
  //     renderer.render(
  //       <DropDown
  //         data = {testData}
  //       />, {});
  //
  //     console.log(renderer.getRenderOutput());
  //
  //     renderer.getRenderOutput().should.deep.equal(
  //          <div className="ImageCaption">
  //            <img src="src" srcSet="srcset" alt="An alt attribute for the img"/>
  //            {null}
  //          </figure>
  //        );
  //   });
  // });
});
