import React from 'react';

const Like = ({ liked, onLikeToggle }) => {
    let classes = 'clickable fa fa-heart';
    if (!liked) 
        classes += '-o';

    return (
        <i className={classes} aria-hidden="true" onClick={onLikeToggle}></i>
    );
}
 
export default Like;