import React, { useContext } from 'react'

import { Button } from 'react-bootstrap';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { PostContext } from '../../contexts/PostContext';

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext)


  const onDeletePost = () => {
    deletePost(_id);
  }

  const onEditPost = () => {
    findPost(_id);
    setShowUpdatePostModal(true);
  }

  return (
    <>
      <Button
        variant="outline-light"
        style={{ border: 'none' }}
        href={url}
        target='_blank'>
        <img
          src={playIcon}
          alt="play"
          width='24'
          height='24' />
      </Button>
      <Button
        variant="outline-light"
        style={{ border: 'none' }}
        onClick={onEditPost}
      >
        <img
          src={editIcon}
          alt="edit"
          width='24'
          height='24' />
      </Button>
      <Button
        onClick={onDeletePost}
        variant="outline-light"
        style={{ border: 'none' }}
        className='text-danger' >
        <img
          src={deleteIcon}
          alt="delete"
          width='24'
          height='24' />
      </Button>
    </>
  )
}

export default ActionButtons
