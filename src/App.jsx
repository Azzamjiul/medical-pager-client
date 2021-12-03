import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie/es6';

import {ChannelContainer, ChannelListContainer, Auth} from './components';
import './App.css';

const cookies = new Cookies();

const apiKey = 'xkpby3z9v2n5';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

const user = {
  "id" :cookies.get("id"),
  "name" :cookies.get("name"),
  "token" :cookies.get("token"),
}

if (authToken) {
  console.log(user, user.token)
  client.connectUser(user, user.token)
}

const App = () => {
  if (!authToken) return <Auth/>

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer/>
      </Chat>
    </div>
  )
}

export default App
