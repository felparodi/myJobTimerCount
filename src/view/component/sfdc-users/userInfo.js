import React from 'react';

const UserInfo = ({ onSelect, user, selected }) => {

  const select = () => {
    if (onSelect) onSelect(user);
  }

  return (
    <div>
      <input type="checkbox" value={selected} onChange={select}/>
      <span>{user.name} {user.username}</span>
    </div>
  );
};

export default UserInfo;

