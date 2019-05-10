import React, { useState } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { FEED_QUERY } from "./LinkList";
import { LINKS_PER_PAGE } from "../constants";

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

const CreateLink = ({ classes, history }) => {
  const [link, setLink] = useState({
    description: "",
    url: ""
  });

  return (
    <div className={classes.root}>
      <form className={classes.formContainer} noValidate autoComplete="off">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Description"
              fullWidth
              value={link.description}
              onChange={e => setLink({ ...link, description: e.target.value })}
              type="text"
              placeholder="A description for the link"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="URL"
              fullWidth
              value={link.url}
              onChange={e => setLink({ ...link, url: e.target.value })}
              type="text"
              placeholder="The URL for the link"
            />
          </Grid>
          <Grid item xs={12} className={classes.actionsGrid}>
            <Mutation
              mutation={POST_MUTATION}
              variables={link}
              onCompleted={() => history.push("/new/1")}
              update={(store, { data: { post } }) => {
                const first = LINKS_PER_PAGE;
                const skip = 0;
                const orderBy = "createdAt_DESC";

                const data = store.readQuery({
                  query: FEED_QUERY,
                  variables: { first, skip, orderBy }
                });
                data.feed.links.unshift(post);
                store.writeQuery({
                  query: FEED_QUERY,
                  data,
                  variables: { first, skip, orderBy }
                });
              }}
            >
              {postMutation => (
                <Button
                  onClick={postMutation}
                  variant="outlined"
                  className={classes.submitButton}
                >
                  Submit
                </Button>
              )}
            </Mutation>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const styles = ({ spacing }) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    formContainer: {
      width: "50%"
    },
    actionsGrid: {
      display: "flex",
      justifyContent: "center"
    },
    submitButton: {
      width: spacing.unit * 20
    }
  });

export default withStyles(styles)(CreateLink);
