import Button from '@material-ui/core/Button';
import { madLiberationStyles } from '../madLiberationStyles';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});
class Page extends React.Component {
  state = {
    readyForContent: false
  };
  _isMounted = false;
  setReadyForContent = () => {
    if (this._isMounted) {
      this.setState({ readyForContent: true });
    }
  };
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.pageIndex != this.props.pageIndex) {
      this.setState({ readyForContent: false });
    }
  }
  render() {
    const {
      page,
      pageIndex,
      incrementPageIndex,
      decrementPageIndex
    } = this.props;
    if (!Array.isArray(page.lines) || page.lines.length < 1) {
      return <div />;
    }
    const linesExample = [];
    const lines = [];
    page.lines.forEach((line, lineIndex) => {
      const segments = [];
      if (!Array.isArray(line.segments)) {
        return;
      }
      line.segments.forEach((segment, segmentIndex) => {
        if (segment.type === 'text') {
          segments.push(
            <span key={`segment-${lineIndex}-${segmentIndex}`}>
              {segment.text}
            </span>
          );
        }
        if (segment.type === 'lib') {
          segments.push(
            <Tooltip
              key={`tooltip-${lineIndex}-${segmentIndex}`}
              title={segment.prompt}
            >
              <span
                key={`segment-${lineIndex}-${segmentIndex}`}
                style={madLiberationStyles.lightGrayBackround}
              >
                {segment.answer}
              </span>
            </Tooltip>
          );
        }
      });
      if (line.type === 'h1') {
        lines.push(
          <Typography variant="h1" key={`line-${lineIndex}`} gutterBottom>
            {segments}
          </Typography>
        );
      }
      if (line.type === 'h2') {
        lines.push(
          <Typography variant="h2" key={`line-${lineIndex}`} gutterBottom>
            {segments}
          </Typography>
        );
      }
      if (line.type === 'h3') {
        lines.push(
          <Typography variant="h3" key={`line-${lineIndex}`} gutterBottom>
            {segments}
          </Typography>
        );
      }
      if (line.type === 'h4') {
        lines.push(
          <Typography variant="h4" key={`line-${lineIndex}`} gutterBottom>
            {segments}
          </Typography>
        );
      }
      if (line.type === 'h5') {
        lines.push(
          <Typography variant="h5" key={`line-${lineIndex}`} gutterBottom>
            {segments}
          </Typography>
        );
      }
      if (line.type === 'h6') {
        lines.push(
          <Typography variant="h6" key={`line-${lineIndex}`} gutterBottom>
            {segments}
          </Typography>
        );
      }
      if (line.type === 'p') {
        lines.push(
          <Typography component="p" key={`line-${lineIndex}`} paragraph>
            {segments}
          </Typography>
        );
      }
      if (line.type === 'indent') {
        lines.push(
          <Typography component="p" key={`line-${lineIndex}`}>
            <span style={madLiberationStyles.italic}>{segments}</span>
          </Typography>
        );
        if (
          lineIndex < page.lines.length - 1 &&
          page.lines[lineIndex + 1].type != 'indent'
        ) {
          lines.push(
            <div key={`br-after-line-${lineIndex}`}>
              <br />
            </div>
          );
        }
      }
    });

    if (!this.state.readyForContent) {
      const order = pageIndex == 0 ? 'first' : 'next';
      return (
        <div>
          <Typography variant="h5" gutterBottom>
            Pass this device to the {order} reader, then click:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.setReadyForContent}
          >
            Ready to read
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <div>{lines}</div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={incrementPageIndex}
            >
              Next page
            </Button>
          </div>
          <br />
          <div hidden={pageIndex === 0}>
            <Button variant="contained" onClick={decrementPageIndex}>
              Previous page
            </Button>
          </div>
        </div>
      );
    }
  }
}
export default withStyles(styles)(Page);
