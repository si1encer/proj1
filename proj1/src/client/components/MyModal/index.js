import { Modal } from "antd";

const MyModel = ({
  height = "fit-content",
  width = "fit-content",
  children,
  titleText = "",
  open = false,
  setVisible = () => {},
}) => {
  return (
    <>
      <Modal
        height={height}
        width={width}
        title={<div className="modal-title">{titleText}</div>}
        open={open}
        footer={null}
        onCancel={() => setVisible()}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModel;
