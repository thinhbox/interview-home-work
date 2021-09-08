import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Accordion } from 'react-bootstrap';
import { getCommentList } from 'services/post';
import Comment from 'components/Post/Comment';

export default function Post(props) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getRndDate() {
    return `${getRndInteger(1, 31)}-${
      months[getRndInteger(0, 11)]
    }-${getRndInteger(2018, 2021)}`;
  }

  const [commentList, setCommentList] = useState();

  useEffect(() => {
    getCommentList(props.data.id).then((data) => {
      setCommentList(data);
    });
  }, []);

  function renderCommentList() {
    if (commentList) {
      let date = getRndDate();
      return commentList.map((comment) => (
        <ListGroup.Item key={comment.id}>
          <Comment data={comment} date={date} />
        </ListGroup.Item>
      ));
    } else {
      return <div>Loading...</div>;
    }
  }

  return (
    <Container style={{ width: '40rem', marginTop: '2rem' }}>
      <Card>
        <Card.Body>
          <Card.Title>
            {props.data.title ? props.data.title : 'Post Title'}
          </Card.Title>
          <Card.Text className='' as='h6'>
            Author:{' '}
            {props.getAuthor(props.data.userId)
              ? props.getAuthor(props.data.userId)
              : 'Author Name'}{' '}
            <small className='sub-text'>• Created at: {getRndDate()}</small>
          </Card.Text>
          <Badge bg='primary'>Blue</Badge> <Badge bg='secondary'>Grey</Badge>{' '}
          <Badge bg='success'>Green</Badge> <Badge bg='danger'>Red</Badge>{' '}
          <Badge bg='warning'>Yellow</Badge> <Badge bg='info'>Lightblue</Badge>{' '}
          <p className='text-limit'>
            {props.data.body ? props.data.body : 'Post Body'}
          </p>
        </Card.Body>

        <Accordion flush style={{ borderTop: '1px solid var(--bs-gray-300)' }}>
          <Accordion.Item eventKey='0'>
            <Accordion.Header className='d-flex justify-content-between'>
              {commentList?.length} replies
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant='flush'>{renderCommentList()}</ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
    </Container>
  );
}
