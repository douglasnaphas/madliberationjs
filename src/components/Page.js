import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});
class Page extends React.Component {
  render() {
    const { page } = this.props;
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
      });
      if (line.type === 'h1') {
        lines.push(
          <Typography variant="h1" key={`line-${lineIndex}`}>
            {segments}
          </Typography>
        );
      }
    });

    return (
      <div>
        <div>{lines}</div>
      </div>
    );
  }
}
export default withStyles(styles)(Page);
