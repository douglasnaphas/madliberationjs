import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import { Button } from '@material-ui/core';
import MenuAppBar from './MenuAppBar';
import { Configs } from '../Configs';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function SedersPage({
  user,
  setConfirmedRoomCode,
  setChosenPath,
  setConfirmedGameName
}) {
  const [sedersIStarted, setSedersIStarted] = useState([]);
  const [sedersIJoined, setSedersIJoined] = useState([]);
  const [selectedRoomCode, setSelectedRoomCode] = useState();
  useEffect(() => {
    if (!user || !user.sub) return;
    const sedersStartedUrl = new URL(
      `/seders?user=${user.sub}`,
      Configs.apiUrl()
    );
    fetch(sedersStartedUrl, {
      credentials: 'include'
    })
      .then(r => {
        return r.json();
      })
      .then(s => {
        if (s.Items && Array.isArray(s.Items)) {
          setSedersIStarted(s.Items);
        }
      })
      .catch(err => {
        console.log(err);
      });
    const sedersJoinedUrl = new URL(
      `/seders-joined?user=${user.sub}`,
      Configs.apiUrl()
    );
    fetch(sedersJoinedUrl, {
      credentials: 'include'
    })
      .then(r => {
        return r.json();
      })
      .then(s => {
        if (s.Items && Array.isArray(s.Items)) {
          setSedersIJoined(s.Items);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [user]);
  const seders = new Map();
  sedersIStarted.forEach(seder => {
    const {
      room_code,
      created,
      lib_id,
      path,
      user_email,
      timestamp,
      closed
    } = seder;
    if (room_code) {
      seders.set(seder.room_code, {
        created,
        lib_id,
        path,
        user_email,
        timestamp
      });
    }
  });
  sedersIJoined.forEach(seder => {
    const {
      lib_id,
      room_code,
      user_email,
      game_name,
      assignments,
      answers
    } = seder;
    if (room_code) {
      seders.set(room_code, {
        ...seders.get(room_code),
        game_name,
        assignments,
        answers
      });
    }
  });
  const sederTable = (
    <Table>
      <TableBody>
        {Array.from(seders).map(s => {
          const roomCode = s[0];
          return (
            <TableRow key={roomCode}>
              <TableCell>
                <Radio
                  id={`radio-${roomCode}`}
                  madliberationid={`radio-${roomCode}`}
                  checked={selectedRoomCode === roomCode}
                  value={roomCode}
                  onChange={event => {
                    setSelectedRoomCode(event.target.value);
                  }}
                ></Radio>
              </TableCell>
              <TableCell>{roomCode}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
  // console.log(seders.get(selectedRoomCode));
  return (
    <>
      <MenuAppBar></MenuAppBar>
      <br></br>
      <br></br>
      <div>
        <Typography component="p" color="secondary" gutterBottom>
          This <b>resume-seder</b> feature is under furious active development
          for Passover 2020. Some parts of this page may not work as expected
          until Wednesday, April 8th, 2020.
        </Typography>
      </div>
      <div>
        <br />
        <Typography variant="h4" gutterBottom>
          You are or were in seders with these Room Codes:
        </Typography>
      </div>
      {sedersIStarted.length ? (
        <>
          <div>{sederTable}</div>
          <div>
            <br />
            <Button
              id="resume-this-seder-button"
              madliberationid="resume-this-seder-button"
              variant="contained"
              component={Link}
              onClick={e => {
                setConfirmedRoomCode(selectedRoomCode);
                const selectedGameName =
                  selectedRoomCode &&
                  seders &&
                  seders.get &&
                  seders.get(selectedRoomCode) &&
                  seders.get(selectedRoomCode).game_name;
                if (selectedGameName) {
                  setConfirmedGameName(selectedGameName);
                }
                const seder = seders.get(selectedRoomCode);
                if (seder.path) {
                  setChosenPath(seder.path);
                }
              }}
              to={
                seders &&
                selectedRoomCode &&
                seders.get(selectedRoomCode).game_name
                  ? '/roster'
                  : '/your-room-code'
              }
            >
              Resume seder
            </Button>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default SedersPage;
