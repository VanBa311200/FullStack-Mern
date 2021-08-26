import React, { useContext, useState } from 'react'

import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
  // context
  const { showAddPostModal, setShowAddPostModal, addNewPost, setShowToast } = useContext(PostContext)

  // useState
  const [postForm, setPostForm] = useState({
    title: '',
    description: '',
    url: '',
    status: 'To Learn'
  });

  const { title, description, url } = postForm

  const onChangNewPostChange = e => {
    setPostForm({
      ...postForm, [e.target.name]: e.target.value
    })
  }

  const closeModal = async (e) => {
    resetAddPostData();
  }

  const addNewPostHandler = async (e) => {
    e.preventDefault();
    const { success, message } = await addNewPost(postForm);
    resetAddPostData();
    if (success)
      setShowToast({
        type: 'success',
        message: message,
        show: true,
      })
  }

  const resetAddPostData = () => {
    setPostForm({
      title: '',
      description: '',
      url: '',
      status: 'To Learn'
    });
    setShowAddPostModal(false)
  }

  return (
    <Modal
      show={showAddPostModal}
      centered
      onHide={closeModal}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={addNewPostHandler}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name='title'
              aria-describedby='title-help'
              required
              value={title}

              onChange={onChangNewPostChange}
            />
            <Form.Text
              id="title-help"
              muted
            >
              Require
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Title'
              name='description'
              value={description}

              onChange={onChangNewPostChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Youtube Totalrial"
              name='url'
              value={url}

              onChange={onChangNewPostChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={closeModal}>Cancel</Button>
          <Button
            variant='success'
            onClick={addNewPostHandler}>Learn It!</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddPostModal
