/* global document, window */
import React from 'react';
import ImageCaption from '@economist/component-imagecaption';
// For the resize smoothing timeout
let TimeoutID;
export default class DropDown extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      buttonStrings: React.PropTypes.object,
      data: React.PropTypes.object,
      expanded: React.PropTypes.bool,
      outerHeight: React.PropTypes.number,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      buttonStrings: { 'open': 'Dig deeper', 'close': 'Close' },
      expanded: false,
      outerHeight: 0,
    };
  }
  // DEFAULT PROPS ends

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      // Expansion flag (current state, not desired-state)
      expanded: this.props.expanded,
      // Height of outer (expanding) content div
      outerHeight: this.props.outerHeight,
    };
  }
  // CONSTRUCTOR ends

  // COMPONENT DID MOUNT
  // Put event on window
  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
  }
  // COMPONENT DID MOUNT ends

  // COMPONENT WILL UNMOUNT
  // Remove listener on window
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  // COMPONENT WILL UNMOUNT ends

  // HANDLE RESIZE
  // On resize, adjust height of expanding div
  handleResize() {
    // If state is closed, no need to fiddle.
    // If open, however...
    if (this.state.expanded) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        const innerH = document.getElementsByClassName('daily-features-inner-content')[0].offsetHeight;
        // I pass in the target height, and a flag indicating that the function wasn't called from button click
        this.resizeExpandableWrapper(innerH, false);
      }, 250);
    }
  }

  // EXPANDING BUTTON CLICK
  // Click listener, toggles 'expanded' state
  // Passes in target height (for shrinking) and a flag indicating that caller was button click
  expandingButtonClick() {
    this.resizeExpandableWrapper(0, true);
  }
  // EXPANDING BUTTON CLICK ends

  // RESIZE EXPANDABLE WRAPPER
  // Called from expandableButtonClick and handleResize...
  // Params are target height (if shrinking) and the clicked-button flag
  resizeExpandableWrapper(shrinkTargetHeight, clickedBtn) {
    // The divs we're torturing:
    const outDiv = document.getElementsByClassName('daily-features-expandable-content')[0];
    const inDiv = document.getElementsByClassName('daily-features-inner-content')[0];
    let expanded = this.state.expanded;
    let startHeight;
    let endHeight;
    // 'expanded' is *current* state of the wrapper
    if (expanded) {
      // Div is open. If we clicked the button we shrink to zero...
      // ...otherwise we adjust from current to target height
      startHeight = outDiv.clientHeight;
      endHeight = shrinkTargetHeight;
    } else {
      // Expand from zero to height of the inner div
      startHeight = 0;
      endHeight = inDiv.clientHeight;
    }
    // Button toggle:
    if (clickedBtn) {
      expanded = !expanded;
    }
    // Increment
    const incr = Math.abs(endHeight - startHeight) / 40;
    // Animate up or down:
    if (endHeight > startHeight) {
      this.animateHeightUp(outDiv, startHeight, endHeight, incr);
    } else {
      // Let's try not to set a neg height!
      if (endHeight < 0) {
        endHeight = 0;
      }
      this.animateHeightDown(outDiv, startHeight, endHeight, incr);
    }
    // And finally...
    this.setState({
      expanded,
    });
  }

  // ANIMATE HEIGHT -UP ...and... -DOWN
  // Called from resizeExpandableWrapper to up/downsize
  animateHeightUp(obj, height, targetHeight, incr) {
    if (height <= targetHeight) {
      height += incr;
      this.setState({ outerHeight: Math.round(height) });
      setTimeout(() => {
        this.animateHeightUp(obj, height, targetHeight, incr);
      }, 10);
    }
  }
  //
  animateHeightDown(obj, height, targetHeight, incr) {
    if (height >= targetHeight) {
      height -= incr;
      this.setState({ outerHeight: Math.round(height) });
      setTimeout(() => {
        this.animateHeightDown(obj, height, targetHeight, incr);
      }, 10);
    }
  }
  // ANIMATE HEIGHT -UP ...and... -DOWN ends


  // RENDER
  render() {
    const data = this.props.data;
    // Image and caption
    const imageSrc = data.image.src;
    const imageCaption = data.image.caption;
    // Extended text
    const textHead = data.text.header;
    const textBody = data.text.body;
    // Expanding div
    // Content
    const content = data.expandedcontent;
    //
    // +++++ SCENECHANGER GODE:
    /*
    content = [];
    for (i = 0; i < sceneTotal; i ++) {
      content.push(
        <div className="mnv-ec-scenechanger-onedot-wrapper" key={i}>
          <div className="mnv-ec-scenechanger-dot" onClick={this.handleClick.bind(this,i)}>
          </div>
        </div>
      )
    }
    */
    //
    // console.log(data.newexpandedcontent);
    // Button string
    let buttonString = this.props.buttonStrings.open;
    if (this.state.expanded) {
      buttonString = this.props.buttonStrings.close;
    }

    // Expandable div height ('px' auto-appended)
    const expanderHeight = { height: this.state.outerHeight };
    return (
      <div className="daily-features-outer-wrapper">
        <div className = "daily-features-image-wrapper">
            <ImageCaption className="daily-features-image-caption" caption={imageCaption} src={imageSrc}/>
        </div>

        <div className="daily-features-text-wrapper">
          <p className="daily-features-text-header">{textHead}</p>
          <p className="daily-features-text-body">{textBody}</p>
        </div>

        <div className="daily-features-expandable-wrapper">
          <div className="daily-features-expandable-content" style={expanderHeight}>
            <div className="daily-features-inner-content">
              {content}
            </div>
          </div>
          <div className="daily-features-expandable-button-wrapper">
            <div className="daily-features-expandable-button"
              onClick={this.expandingButtonClick.bind(this)}
            >
              {buttonString}
            </div>
          </div>
        </div>

      </div>
    );
  }
  // RENDER ends
}
