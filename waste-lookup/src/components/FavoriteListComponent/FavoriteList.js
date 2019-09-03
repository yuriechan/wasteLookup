import React from "react";
import "./FavoriteList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    return (
      <div className="FavoriteList__container">
        <FontAwesomeIcon onClick={this.toggle} icon="star" color="#EDD943" />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Your Favorites.</ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FavoriteList;
