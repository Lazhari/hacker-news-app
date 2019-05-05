import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { FEED_QUERY } from "./LinkList";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = props => {
  const [link, setLink] = useState({
    description: "",
    url: ""
  });

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={link.description}
          onChange={e => setLink({ ...link, description: e.target.value })}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={link.url}
          onChange={e => setLink({ ...link, url: e.target.value })}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={link}
        onCompleted={() => props.history.push("/")}
        update={(store, { data: { post } }) => {
          const data = store.readQuery({ query: FEED_QUERY });
          data.feed.links.unshift(post);
          store.writeQuery({
            query: FEED_QUERY,
            data
          });
        }}
      >
        {postMutation => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default CreateLink;
