import React from 'react';


const UserInfo = ({ onSelect, user, selected }) => {

  const select = () => {
    if (onSelect) onSelect(user);
  }

  return (
    <div className='user-info'>
      <div>
      	<input type="checkbox" checked={selected} onChange={select}/>
      </div>
      <div>Name: {user.name}</div>
      <div>UserName: {user.username}</div>
    </div>
  );
};

export default UserInfo;

