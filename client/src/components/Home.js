import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import PostCard from './PostCard';

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likesCount
            likes {
                username
            }
            commentsCount
            comments {
                id
                username
                createdAt
            }
        }
    }
`;

function Home() {
    const {loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
    return (
        <>
            <h1>Recent posts</h1>
            {loading && 
                (<div>loading...</div>)
            }
            {!loading && posts.map((post) => (
                    <PostCard post={post} />
                ))
            }
        </>
    )
}

export default Home;
