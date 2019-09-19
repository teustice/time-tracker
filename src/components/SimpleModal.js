import React, {useState, useImperativeHandle, useRef, forwardRef} from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

function SimpleModal(props, ref) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    openModal: () => {
      openModal();
    },
    closeModal: () => {
      closeModal();
    }
  }));

  function openModal() {
    console.log('here');
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
         <Modal
           isOpen={modalIsOpen}
           onRequestClose={closeModal}
           style={customStyles}
           contentLabel="Example Modal"
         >
         <button className="ui basic button icon" onClick={closeModal}>
           <i className="close icon"></i>
         </button>
          {props.children}


         </Modal>
       </div>
  );
}
SimpleModal = forwardRef(SimpleModal)

export default SimpleModal;
