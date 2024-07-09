import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const CustomModal = (props) => {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', justifyContent: 'center'}}>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.handleCreate}>Save</Button>
        </Modal.Footer>
      </Modal>
    )
}

CustomModal.propTypes = {
    children: PropTypes.node,
    onHide: PropTypes.func,
    handleCreate: PropTypes.func
}
export default CustomModal;
