import { useState } from "react";

export function useModal() {
    const [modal, setModal] = useState(null);

    const showModal = (type, title, message, confirmText) =>
    setModal({ type, title, message, confirmText });

    const closeModal = () => setModal(null);

    return { modal, showModal, closeModal };
}
