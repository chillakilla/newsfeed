import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import EachFeed from './EachFeed';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setFeeds } from 'redux/modules/feeds';
import { useLocation } from 'react-router-dom';

//styled-components
const StFeedSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const StFallbackP = styled.p`
  margin-top: 20px;
`;

function Feed() {
  const filterConfig = useSelector((state) => state.filterConfig);
  const feeds = useSelector((state) => state.feeds);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'feeds'), orderBy('date', 'desc')), (querySnapshot) => {
      const updatedFeeds = [];
      querySnapshot.forEach((doc) => {
        updatedFeeds.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setFeeds(updatedFeeds));
    });

    return () => unsubscribe();
  }, []);

  //조건에 맞춰 필터링하는 로직
  let filterdFeeds;
  const field = filterConfig.field;
  filterdFeeds = filterConfig.value === '전체' ? feeds : feeds.filter((feed) => feed[field] === filterConfig.value);

  return (
    <StFeedSection>
      {!filterdFeeds.length && <StFallbackP>일치하는 항목이 없습니다.</StFallbackP>}
      {filterdFeeds &&
        filterdFeeds.map((feed) => {
          return <EachFeed key={feed.id} feed={feed} location={location.pathname} />;
        })}
    </StFeedSection>
  );
}

export default Feed;
