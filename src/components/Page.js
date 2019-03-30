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
      if (line.type === 'p' || line.type === 'indent') {
        lines.push(
          <Typography
            variant="p"
            component="p"
            key={`line-${lineIndex}`}
            paragraph
          >
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
