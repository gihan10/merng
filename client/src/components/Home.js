import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import PostCard from './PostCard';
import PostForm from './PostForm';
import { AuthContext } from '../context/auth';

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
    const { user } = useContext(AuthContext);
    const {loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
    return (
        <>
            <h1>Recent posts</h1>
            {user && (
                <PostForm />
            )}
            {loading && 
                (<div>loading...</div>)
            }
            {!loading && posts.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))
            }
        </>
    )
}

export default Home;
