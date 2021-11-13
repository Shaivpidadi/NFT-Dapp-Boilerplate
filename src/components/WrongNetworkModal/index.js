import React from "react";
import { Button, Modal } from "react-bootstrap";

const WrongNetworkModal = ({ onChangeNetworkClick, show }) => {
  return (
    <Modal
      size="lg"
      centered
      show={show}
      style={{ display: show ? "flex" : "none" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Wrong Network
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>You're currently on wrong network</h4>
        <p>
          NFT Boilerplate only supports <strong>Ropsten</strong> network, please
          switch to <strong>Ropsten</strong> manually or click Switch network
          button
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onChangeNetworkClick}>
          Change Network
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WrongNetworkModal;
