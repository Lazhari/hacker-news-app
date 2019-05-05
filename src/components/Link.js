import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
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
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}</span>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: link.id }}
            update={(store, { data: { vote } }) =>
              updateStoreAfterVote(store, vote, link.id)
            }
          >
            {(voteMutation, { loading, error }) => {
              setIsVoting(loading);
              return (
                <div className="pointer ml1 gray f11" onClick={voteMutation}>
                  ▲
                </div>
              );
            }}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} (
          <a className="f6 no-underline black" href={link.url} target="_blank">
            {link.url}
          </a>
          )
        </div>
        <div className="f6 lh-copy gray">
          {!isVoting ? `${link.votes.length} votes ` : "Updating... "}
          by {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;
