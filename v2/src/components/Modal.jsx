import Cross from "./Cross";

export default function Modal({ title = "", content = "", closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={closeModal}>
          <Cross size={20} />
        </span>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
