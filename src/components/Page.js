import Lib from './Lib';
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
    const lines = [];
    page.lines.forEach(line => {});
    const spanText1 = 'This is the first ';
    const spanText2 = 'segment, and this next is';
    const spanText3 = ' the last.';
    const spans = [];
    spans.push(<span key="span1">{spanText1}</span>);
    spans.push(<span key="span2">{spanText2}</span>);
    spans.push(<span key="span3">{spanText3}</span>);
    lines.push(<div key="some_spans">{spans}</div>);
    lines.push(
      <div key="now_a_break">
        <br />
      </div>
    );
    lines.push(
      <div key="more_spans">
        {[<span key="x">ano</span>, <span key="y">ther</span>]}
      </div>
    );

    return (
      <div>
        <div>{page.lines.length} lines</div>
        <div>{lines}</div>
      </div>
    );
  }
}
export default withStyles(styles)(Page);
