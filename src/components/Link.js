import React, { useState } from "react";
import { Mutation } from "react-apollo";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import TimerIcon from "@material-ui/icons/Timer";
import UserIcon from "@material-ui/icons/Mood";
import gql from "graphql-tag";
import { notify } from "react-notify-toast";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = ({ link, index, updateStoreAfterVote }) => {
  const [isVoting, setIsVoting] = useState(false);
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <TableRow>
      <TableCell>
        <Typography>{index + 1}</Typography>
      </TableCell>
      <TableCell>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: link.id }}
            update={(store, { data: { vote } }) =>
              updateStoreAfterVote(store, vote, link.id)
            }
            onError={error => notify.show(error.message)}
          >
            {(voteMutation, { loading }) => {
              setIsVoting(loading);
              return (
                <IconButton onClick={voteMutation}>
                  <KeyboardArrowUp color="primary" />
                </IconButton>
              );
            }}
          </Mutation>
        )}
      </TableCell>
      <TableCell align="center">
        <Typography>
          {!isVoting ? `${link.votes.length} votes ` : "Updating... "}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{link.description}</Typography>
      </TableCell>
      <TableCell align="left">
        <MuiLink href={link.url} target="_blank">
          {link.url}
        </MuiLink>
      </TableCell>
      <TableCell align="center">
        <Typography>
          <TimerIcon />
          {timeDifferenceForDate(link.createdAt)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>
          <UserIcon />
          {link.postedBy ? link.postedBy.name : "Unknown"}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default Link;
