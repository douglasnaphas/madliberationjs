class Script {
  static all() {
    return fetch(`${process.env.REACT_APP_API_URL}/scripts`).then(response =>
      response.json()
    );
  }
}

class Room {
  static create({ scriptId }) {
    fetch(`${process.env.REACT_APP_API_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ script_id: scriptId }),
    }).then(response => response.json());
  }
}

export { Room, Script };
