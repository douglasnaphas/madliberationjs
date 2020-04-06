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

function SedersPage({ user, setConfirmedRoomCode, setChosenPath }) {
  const [seders, setSeders] = useState([]);
  const [selectedRoomCode, setSelectedRoomCode] = useState();
  const [selectedSeder, setSelectedSeder] = useState();
  useEffect(() => {
    if (!user || !user.sub) return;
    const sedersUrl = new URL(`/seders?user=${user.sub}`, Configs.apiUrl());
    fetch(sedersUrl, {
      credentials: 'include'
    })
      .then(r => {
        return r.json();
      })
      .then(s => {
        if (s.Items && Array.isArray(s.Items)) {
          setSeders(s.Items);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [user]);
  const sederTable = (
    <Table>
      <TableBody>
        {seders.map(s => (
          <TableRow key={s.room_code}>
            <TableCell>
              <Radio
                id={`radio-${s.room_code}`}
                madliberationid={`radio-${s.room_code}`}
                checked={selectedRoomCode === s.room_code}
                value={s.room_code}
                onChange={event => {
                  setSelectedRoomCode(event.target.value);
                }}
              ></Radio>
            </TableCell>
            <TableCell>{s.room_code}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

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
      {seders.length ? (
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
                const seder = seders.filter(
                  s => s.room_code === selectedRoomCode
                );
                if (seder.length > 0 && seder[0].path) {
                  setChosenPath(seder[0].path);
                }
              }}
              to="/your-room-code"
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
