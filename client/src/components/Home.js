import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import PostCard from './PostCard';
import PostForm from './PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

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
