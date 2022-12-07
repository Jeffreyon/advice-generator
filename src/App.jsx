import { useState, useEffect, useRef } from "react";

function App() {
    let [advice, setAdvice] = useState("");
    let trigger = useRef(null);

    useEffect(() => {
        fetchAdvice();
    }, []);

    async function fetchAdvice() {
        await fetch(`https://api.adviceslip.com/advice`)
            .then((response) => response.json())
            .then(({ slip }) => setAdvice(slip.advice))
            .catch(console.log);
        //

        trigger.current.disabled = true;
        setTimeout(() => (trigger.current.disabled = false), 2000);
    }

    return (
        <>
            <button ref={trigger} onClick={fetchAdvice}>
                Get advice
            </button>
            <pre>{advice}</pre>
        </>
    );
}

/**
 * listen for button click
 * get advice from api
 * display advice
 */

export default App;
