import React, { useContext, useEffect } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { PostContext } from '../contexts/PostContext'
import { Card, Spinner, Button, Col, Row, Container, Toast, ToastContainer } from 'react-bootstrap'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import PlusIcon from '../assets/plus-circle-fill.svg'

function Dashboard() {
  // context
  const {
    postState: { post, posts, postsLoading },
    getPost,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast
  } = useContext(PostContext);

  const {
    authState: {
      user: {
        username
      }
    }
  } = useContext(AuthContext)

  // start: get all posts
  useEffect(() => {
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeToast = () => {
    setShowToast({
      show: false,
      message: '',
      type: null
    })
  }

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner
          animation='border'
          variant='infor' />
      </div>
    )
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>
            Hi {username}
          </Card.Header>
          <Card.Body>
            <Card.Title>Welcome To LearnIt</Card.Title>
            <Card.Text>Click the button below, track your first skill to learn</Card.Text>
            <Button
              variant='primary'
              onClick={() => setShowAddPostModal(true)}>Learn It!</Button>
          </Card.Body>
        </Card>

        <Button
          className='pa-bl d-flex align-items-center'
          onClick={() => setShowAddPostModal(true)}>
          <img
            src={PlusIcon}
            alt="add post"
            width='24'
            height='24' />
        </Button>
      </>
    )
  } else {
    body = (
      <>
        <Container>
          <Row className='g-4 mx-auto mt-3'>
            {posts.map(post => (
              <Col
                xs={12}
                md={4}
                key={post._id}
                className='my-3'>
                <SinglePost post={post} />
              </Col>
            ))}
          </Row>
        </Container>
        {/* // Open Modal Add Post */}
        {/* <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip >Add a new thing to learn</Tooltip>}
        > */}
        <Button
          className='pa-bl d-flex align-items-center'
          onClick={() => setShowAddPostModal(true)}>
          <img
            src={PlusIcon}
            alt="add post"
            width='24'
            height='24' />
        </Button>
        {/* </OverlayTrigger> */}

        {/* Toats */}
        <ToastContainer
          position="top-end"
          className="p-3">
          <Toast
            bg={type}
            onClose={closeToast}
            show={show}
            delay={3000}
            animation
            autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt="" />
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    )
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
    </>
  )
}

export default Dashboard
