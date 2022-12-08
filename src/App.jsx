import { useState, useEffect, useRef } from "react";
import divider_desktop from "./assets/pattern-divider-desktop.svg";
import divider_mobile from "./assets/pattern-divider-mobile.svg";
import dice from "./assets/icon-dice.svg";
import "animate.css";
import animateCSS from "./lib/animatecss";
("./lib/animatecss");

function App() {
    let [advice, setAdvice] = useState({});
    let trigger = useRef(null);
    let advice_text = useRef(null);

    useEffect(() => {
        fetchAdvice();
    }, []);

    async function fetchAdvice() {
        trigger.current.disabled = true;
        animateCSS("#advice-text", "flash");

        await fetch(`https://api.adviceslip.com/advice`)
            .then((response) => response.json())
            .then(({ slip }) => {
                setAdvice(slip);
                setTimeout(() => {
                    trigger.current.disabled = false;
                }, 2000);
            })
            .catch(console.log);
        //
    }

    return (
        <>
            <div className=" flex items-center justify-center h-screen bg-slate-900 p-5">
                <div
                    id="advice-card"
                    className="bg-slate-700 rounded-xl max-w-md">
                    <div className=" px-5 py-8 sm:p-8">
                        <p
                            id="advice-id"
                            className=" uppercase text-xs font-bold tracking-widest text-center text-emerald-300">
                            Advice #{advice.id}
                        </p>
                        <h2
                            id="advice-text"
                            className=" text-2xl font-semibold text-slate-200 text-center mt-5 mb-8">
                            {advice.advice ? `"${advice.advice}"` : ""}
                        </h2>
                        <img
                            className=" mx-auto hidden sm:block"
                            src={divider_desktop}
                            alt=""
                        />
                        <img
                            className=" mx-auto sm:hidden"
                            src={divider_mobile}
                            alt=""
                        />
                    </div>
                    <div className=" -mb-7">
                        <button
                            className=" bg-emerald-300 rounded-full flex items-center justify-center w-14 h-14 mx-auto disabled:shadow-none disabled:bg-orange-300 disabled:cursor-progress transition-colors"
                            ref={trigger}
                            onClick={fetchAdvice}>
                            <img
                                src={dice}
                                alt="Get random Advice"
                                title="Get random Advice"
                                className=" w-5"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className=" absolute bottom-4 w-full text-center p-2 text-slate-700">
                <a
                    href="https://twitter.com/jeffreyon_"
                    className="  hover:text-emerald-300 transition-colors delay-75">
                    Made by Jeffrey Onuigbo
                </a>
                <span className="mx-4">/</span>
                <a
                    href="https://github.com/Jeffreyon/advice-generator"
                    className=" hover:text-emerald-300 transition-colors delay-75">
                    View code
                </a>
                <span className="mx-4">/</span>
                <a
                    href="https://jeffreyon.hashnode.dev/i-built-an-advice-generator-using-react-and-tailwindcss-heres-how-i-built-this"
                    className=" hover:text-emerald-300 transition-colors delay-75">
                    How I built this (Process)
                </a>
            </div>
        </>
    );
}

/**
 * listen for button click
 * get advice from api
 * display advice
 */

export default App;
