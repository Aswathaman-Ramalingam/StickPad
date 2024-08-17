import { useEffect, useRef, useState } from "react";
import { Trash } from "../icons/Trash";
import { setNewOffset, setZIndex } from '../utils';

function autoGrow(textAreaRef: any) {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
}

const NoteCard = ({ text }: { text: any }) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const cardRef = useRef<HTMLDivElement>(null);


    const body = JSON.parse(text.body);
    const colors = JSON.parse(text.colors);

    const [position, setPosition] = useState(JSON.parse(text.position));

    let mouseStartPos = { x: 0, y: 0 };

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    const mouseMove = (e: any) => {
        if (cardRef.current) {


            let mouseMoveDir = {
                x: mouseStartPos.x - e.clientX,
                y: mouseStartPos.y - e.clientY,
            };

            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;

            const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
            setPosition(newPosition);
        }
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    };

    const mouseDown = (e: any) => {
        setZIndex(cardRef.current);

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };


    return (
        <div
            className="card"
            ref={cardRef}
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div
                className="card-header"
                onMouseDown={mouseDown}
                style={{ backgroundColor: colors.colorHeader }}
            >
                <Trash />
            </div>

            <div className="card-body">
                <textarea
                    style={{
                        color: colors.colorText,
                    }}
                    ref={textAreaRef}
                    defaultValue={body}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                >

                </textarea>
            </div>
        </div >
    )
}

export default NoteCard