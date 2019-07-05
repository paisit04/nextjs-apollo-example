import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Query = gql`
query postTitle {
  posts @rest(type: "Post", path: "/posts") {
    id
    title
  }
}
`;

class Home extends Component {
    render() {
      const { data: { loading, error, posts } } = this.props;
      if (loading) {
        return <h4>Loading...</h4>;
      }
      if (error) {
        return <h4>{error.message}</h4>;
      }

      if (!posts) {
        return <h4>NULL</h4>;
      }
      return (
        <div>
          {posts.map(({ id, title }) => (
            <div>{title}</div>
          ))}
        </div>
      );
    }
  }

const ResultQuery = graphql(Query, {})(Home);

// function Home() {
//     return (
//         <div>Welcome to Next.js!</div>
//     );
//   }
  
  export default ResultQuery;