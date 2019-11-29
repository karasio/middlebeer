import React, {useState} from 'react';

const Bar = ({ bar }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' };
  const showWhenVisible = { display: detailsVisible ? '' : 'none' };

  const barStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'dotted',
    radius: 2,
    borderWidth: 1,
    marginBottom: 5
  };

  const likeBar = (id) => {
    console.log('bar liked');
  }

  return (
      <div style={barStyle}>
        <div style={hideWhenVisible} className='barListItem'>
          <p onClick={() => setDetailsVisible(true)}>
            {bar.name} {bar.city}
          </p>
        </div>
        <div style={showWhenVisible} className='extraInfo'>
          <div onClick={() => setDetailsVisible(false)}>
            <p>{bar.name}</p>
            <p>{bar.address}, {bar.city}</p>
            <p>{bar.likes} likes
              <button onClick={() => likeBar(bar.id)}>like</button></p>
            {/*{ blogUser.name !== undefined ? <p>added by {blogUser.name}</p> : <p>no idea who added this</p> }*/}
          </div>
          {/*{ blogUser.username === user.username ? <button onClick={() => removeBlog(id)}>remove</button> : <></> }*/}
        </div>
      </div>
  );
};

export default Bar