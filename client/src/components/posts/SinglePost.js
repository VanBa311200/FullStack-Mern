import { Row, Col, Badge, Card } from 'react-bootstrap'
import ActionButtons from './ActionButtons';


const SinglePost = ({ post: { _id, title, status, description, url } }) => {


  return (
    <Card
      className='shadow'
      border={status === 'Learned' ? 'success' : status === 'To Learning' ? 'warning' : 'danger'} >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col >
              <p className=''>{title}</p>
              <Badge
                pill
                bg={
                  status === 'Learned' ? 'success' : status === 'To Learning' ? 'warning' : 'danger'
                }
              >
                {status}
              </Badge>
            </Col>
            <Col>
              <ActionButtons
                url={url}
                _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card >
  )
}

export default SinglePost;