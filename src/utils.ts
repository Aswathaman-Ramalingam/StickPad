export const setNewOffset = (card: any, mouseMoveDir = { x: 0, y: 0 }) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetTop = card.offsetTop - mouseMoveDir.y;

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop,
    };
};

export function autoGrow(textAreaRef: any) {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = textAreaRef.current.scrollHeight + "px";
}

export const setZIndex = (selectedCard: any) => {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card: any) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

