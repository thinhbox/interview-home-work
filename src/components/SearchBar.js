import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function SearchBar(props) {
  const [search, setSearch] = useState('');

  function handleClick(e) {
    e.preventDefault();
    props.method(search);
  }

  return (
    <Container style={{ width: '40rem', marginTop: '1rem' }}>
      <Form className='d-flex'>
        <Form.Control
          name='search'
          id='search'
          type='search'
          placeholder='Search'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button type='submit' variant='outline-primary' onClick={handleClick}>
          Search
        </Button>
      </Form>
    </Container>
  );
}
