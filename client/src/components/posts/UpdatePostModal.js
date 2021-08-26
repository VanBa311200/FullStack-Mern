import React, { useContext, useState, useEffect } from 'react'

import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
  // context
  const {
    showUpdatePostModal,
    setShowUpdatePostModal,
    postState: { post },
    setShowToast,
    updatePost } = useContext(PostContext)

  // useState
  const [postUpdatePost, setUpdatePost] = useState(post);

  const { title, description, url, status } = postUpdatePost

  const onChangUpdatePostChange = e => {
    setUpdatePost({
      ...postUpdatePost, [e.target.name]: e.target.value
    })
  }

  const closeModal = () => {
    setUpdatePost(post);
    resetUpdatePostData();
  }

  const addUpdatePostHandler = async (e) => {
    e.preventDefault();
    const { success, message } = await updatePost(postUpdatePost);
    resetUpdatePostData();
    if (success)
      setShowToast({
        type: 'success',
        message: message,
        show: true,
      })
  }

  const resetUpdatePostData = () => {
    setShowUpdatePostModal(false)
  }

  useEffect(() => {
    setUpdatePost(post)
  }, [post])

  return (
    <Modal
      show={showUpdatePostModal}
      centered
      onHide={closeModal}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={addUpdatePostHandler}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name='title'
              aria-describedby='title-help'
              required
              value={title}

              onChange={onChangUpdatePostChange}
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

              onChange={onChangUpdatePostChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Youtube Totalrial"
              name='url'
              value={url}

              onChange={onChangUpdatePostChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              name='status'
              value={status}
              onChange={onChangUpdatePostChange}
            >
              <option value="To Learning">To Learning</option>
              <option value="Learned">Learned</option>
              <option value="To Learn">To Learn</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={closeModal}>Cancel</Button>
          <Button
            variant='success'
            onClick={addUpdatePostHandler}>Update</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UpdatePostModal
