import React, { useState, useEffect } from "react";
import { Button, Card, Modal, ListGroup } from "react-bootstrap";
import { db } from "./firebase";
function Adminpage() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [batches, setBatches] = useState();
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  useEffect(() => {
    let isSubscribed = true;
    db.collection("batches").orderBy("date").onSnapshot((snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBatches(list);
      return () => (isSubscribed = false);
    });
  }, []);
  function handleSubmit() {
    if (date && start && end) {
      setShow(false);
      
      db.collection("batches").add({
        date,
        start,
        end,
      });
      setDate("");
      setStart("");
      setEnd("");
    } else {
      alert("all details should be filled correctly");
    }
  }
 
  return (
    <div>
      <h2 className="d-flex justify-content-center text-info">slots</h2>
      <section className="p-5">
        <div className="container-fluid content-row">
          <div className="row">
            {batches &&
              batches.map((batch, index) => (
                <div className="col-3 m-3" key={index}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Header>Batch {index+1}</Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item> <span className="text-info">Date</span> &nbsp;&nbsp;&nbsp;&nbsp;{batch.date+" IST"}</ListGroup.Item>
                      <ListGroup.Item><span className="text-success">Start Time</span> &nbsp;&nbsp;&nbsp;&nbsp;{batch.start+" IST"}</ListGroup.Item>
                      <ListGroup.Item><span className="text-danger">End Time</span> &nbsp;&nbsp;&nbsp;&nbsp;{batch.end+" IST"}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              ))}
            <div className="col-3 m-3">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title className="text-center">Add Slots</Card.Title>
                  <Card.Text>
                    <div className="h1 text-center">
                      <Button variant="primary " onClick={handleShow}>
                        {" "}
                        <i class="bi bi-plus-lg"></i>
                      </Button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-info">Add Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Header>Add Slot</Card.Header> */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                Date{"   "}
                <input
                  className="ms-4"
                  type="date"
                  id="birthday"
                  name="birthday"
                  onChange={(e) => setDate(e.target.value)}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Start Time{"  "}
                <input
                  className="ms-4"
                  type="time"
                  id="appt"
                  name="appt"
                  onChange={(e) => setStart(e.target.value)}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                End Time{" "}
                <input
                  className="ms-4"
                  type="time"
                  id="appt"
                  name="appt"
                  onChange={(e) => setEnd(e.target.value)}
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Adminpage;
