import LsmButton from "./lsm-button";

interface ConfirmationModalType {
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  label,
  onConfirm,
  onCancel,
}: ConfirmationModalType) => {
  return (
    <div className="modal-overlay">
      <div className="absolute left-1/2 top-1/2 transform-translate-x-1/2-translate-y-1/2 text-sm shadow-lg z-50 w-[420px] p-6 rounded-md backdrop-blur-lg bg-[#ffff]">
        <h1 className="text-lg font-extrabold mb-4">Confirm ?</h1>
        <h3 className="mb-5 text-zinc-600">
          Are you sure you want to delete all items?
        </h3>
        <div className="flex justify-end gap-4 border-zinc-300">
          <LsmButton
            label="No"
            classes="text-gray-800 border border border-solid border-black"
            action={onCancel}
          />
          <LsmButton
            label="Yes"
            classes="text-gray-800 bg-blue-600 text-white px-4"
            action={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
