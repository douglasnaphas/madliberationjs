import React, { Component } from 'react';
import { Script } from '../lib/api';

export default class ScriptList extends Component {
  state = { scripts: [] };

  componentDidMount() {
    Script.all().then(scripts => {
      this.setState({ scripts });
    });
  }

  render() {
    const {
      state: { scripts },
    } = this;

    const {
      props: { onChoose },
    } = this;

    return (
      <ul>
        {scripts.map(({ title, description, id }) => (
          <li
            key={id}
            onClick={() => {
              onChoose({ id });
            }}
          >
            <article>
              <h1>{title}</h1>
              <p>{description}</p>
            </article>
          </li>
        ))}
      </ul>
    );
  }
}
