import React from 'react'

/**
 * Component for rendering notifications
 * @param message - notification to be shown
 * @returns {null|*}
 */

const Notification = ({ message }) => {
    if (message.sort === 'info') {
        return (
            <div className='notification'>
                { message.msg }
            </div>
        )
    } else if (message.sort === 'error') {
        return (
            <div className="error">
                { message.msg }
            </div>
        )
    } else {
        return null;
    }
};

export default Notification;
