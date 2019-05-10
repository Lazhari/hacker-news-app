import React, { useState } from "react";
import { withApollo } from "react-apollo";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import gql from "graphql-tag";
import Link from "./Link";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = ({ client, classes }) => {
  const [state, setState] = useState({
    links: [],
    filter: ""
  });
  const [loading, setLoading] = useState(false);

  const _executeSearch = async () => {
    const { filter } = state;
    setLoading(true);
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = result.data.feed.links;
    setState({ ...state, links });
    setLoading(false);
  };

  return (
    <div>
      <div className={classes.headerContainer}>
        <Paper className={classes.searchBox}>
          <TextField
            className={classes.searchInput}
            fullWidth
            label="Search"
            variant="outlined"
            type="text"
            onChange={e => setState({ ...state, filter: e.target.value })}
          />
          <Button onClick={() => _executeSearch()} size="large">
            {loading ? "Loading..." : "Search"}
          </Button>
        </Paper>
      </div>
      <Table>
        {state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </Table>
    </div>
  );
};

const styles = ({ spacing }) =>
  createStyles({
    headerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    searchBox: {
      width: "80%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.unit * 2
    },
    searchInput: {
      marginRight: spacing.unit * 2
    }
  });

export default withStyles(styles)(withApollo(Search));
