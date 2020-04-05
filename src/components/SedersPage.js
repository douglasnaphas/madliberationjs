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

function SedersPage({ user }) {
  const [seders, setSeders] = useState([]);
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
        if (s.Items) {
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
          <TableRow key={`seder-row-${s.room_code}`}>
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
      {seders.length ? sederTable : <div></div>}
    </>
  );
}
export default SedersPage;
