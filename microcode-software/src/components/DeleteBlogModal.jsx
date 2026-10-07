import React from 'react';

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1050
      }}
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ maxWidth: '400px' }}
      >
        <div
          className="modal-content"
          style={{ borderRadius: '10px', overflow: 'hidden' }}
        >
          <div
            className="modal-header"
            style={{
              padding: '16px',
              borderBottom: '1px solid #ddd',
              backgroundColor: '#f8f9fa'
            }}
          >
            <h5 className="modal-title" style={{ margin: 0 }}>Confirm Deletion</h5>
            <span
              onClick={onClose}
              style={{
                cursor: 'pointer',
                fontSize: '20px',
                lineHeight: '1',
                marginLeft: 'auto',
                fontWeight: 'bold'
              }}
            >
              &times;
            </span>
          </div>

          <div className="modal-body" style={{ padding: '20px', fontSize: '14px' }}>
            Are you sure you want to delete this blog?
          </div>

          <div
            className="modal-footer"
            style={{
              padding: '15px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              borderTop: '1px solid #eee'
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f1f1f1',
                border: '1px solid #ccc',
                color: '#333',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                border: 'none',
                color: '#fff',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
