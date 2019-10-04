import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FavoriteLists from "./FavoriteLists/FavoriteLists";
import styles from "./FavoriteModal.module.css";

class FavoriteModal extends React.Component {
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
      <div className={styles.FavoriteList__wrapper}>
        <FontAwesomeIcon onClick={this.toggle} icon="star" color="#EDD943" />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          contentClassName={styles.modal_content}
          modalClassName={styles.modal}
          scrollable={true}
        >
          <ModalHeader toggle={this.toggle}>Your Favorites.</ModalHeader>
          <ModalBody>
            <FavoriteLists
              favoritedData={this.props.favoritedData}
              starClicked={this.props.starClicked}
              starColor={this.props.starColor}
              data={this.props.data}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FavoriteModal;
