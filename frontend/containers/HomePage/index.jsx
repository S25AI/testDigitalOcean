import React from "react";
import { Link } from 'react-router-dom';
import {EnchancedChat as Chat} from '../../components/Chat';

export function Home() {
  return (
    <div className='wrapper'>
      <Link to='create-article'>Перейти на страницу созданиия статей</Link>
      <Chat />
    </div>
  );
}

Home.displayName = 'Home';