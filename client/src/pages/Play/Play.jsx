import { useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import './Play.css'
export default function Play() {
    const settings = {
        sections: [
            { name: 'Bullet', times: [[60, 0], [120, 0], [120, 1]] },
            { name: 'Blitz', times: [[180, 0], [300, 0], [300, 5]] },
            { name: 'Rapid', times: [[600, 0], [1200, 0], [1200, 20]] },
            { name: 'Classic', times: [[3000, 0], [6000, 0], [6000, 60]] },
        ],
        colorSelection: ['white', 'random', 'black'],
        inviteType: ['create-link', 'friends'],
    }
    const [timeBtnValue, setTimeBtnValue] = useState(-1)
    const [colorBtnValue, setColorBtnValue] = useState(-1)
    const [typeBtnValue, setTypeBtnValue] = useState(-1)

    return (
        <>
            <Navbar />
            <div className="wrapper-center">
                <main className="time-selection">
                    <TimeSelectSection
                        timeBtnValue={timeBtnValue}
                        setTimeBtnValue={setTimeBtnValue}
                        sections={settings.sections}
                    />
                    <hr />
                    <ColorSelectSection
                        colorSelection={settings.colorSelection}
                        colorBtnValue={colorBtnValue}
                        setColorBtnValue={setColorBtnValue}
                    />
                    <hr />
                    <SelectInviteTypeSection
                        inviteTypes={settings.inviteType}
                        typeBtnValue={typeBtnValue}
                        setTypeBtnValue={setTypeBtnValue}
                    />
                    <hr />
                    <SubmitSection />
                </main>
            </div>
        </>
    )
}

function TimeSelectSection({ sections, timeBtnValue, setTimeBtnValue }) {
    return (
        <>
            <h1 className="title">Start new Game</h1>
            <div className="time-select-box">
                {sections.map((section, index) => <TimeSection
                    section={section}
                    key={index}
                    rowIndex={index}
                    timeBtnValue={timeBtnValue}
                    setTimeBtnValue={setTimeBtnValue}
                />)}
            </div>
        </>
    )
}

function TimeSection({ section, timeBtnValue, setTimeBtnValue, rowIndex }) {

    return (
        <section className="time-section">
            <p>{section.name}</p>
            {section.times.map((time, index) => <TimeBtn
                time={time}
                key={index}
                timeBtnValue={timeBtnValue}
                setTimeBtnValue={setTimeBtnValue}
                index={rowIndex * 3 + index}
            />)}
        </section>
    )
}

function TimeBtn({ time, index, timeBtnValue, setTimeBtnValue }) {
    const [regularTime, bonusTime] = time

    return (
        <button
            onClick={() => setBtnHighlight(setTimeBtnValue, index)}
            className={`time-btn ${timeBtnValue === index ? 'highlighted' : ''}`}>
            {regularTime / 60} | {bonusTime}
        </button>
    )
}


function ColorSelectSection({ colorSelection, colorBtnValue, setColorBtnValue }) {
    return (
        <div className="color-btn-section">
            {colorSelection.map((color, index) => <ColorBtn
                color={color}
                key={index}
                index={index}
                colorBtnValue={colorBtnValue}
                setColorBtnValue={setColorBtnValue}
            />)}
        </div>
    )
}

function SubmitSection() {
    return (<div className="hori-center">
        <button className="start-game-btn">Send Game Request</button>
    </div>)
}

function SelectInviteTypeSection({ inviteTypes, typeBtnValue, setTypeBtnValue }) {

    return (
        <section className="color-btn-section">
            {inviteTypes.map((inviteType, index) => {
                return <InviteTypeBtn
                    inviteType={inviteType}
                    index={index}
                    key={index}
                    typeBtnValue={typeBtnValue}
                    setTypeBtnValue={setTypeBtnValue}
                />
            })}
        </section>
    )
}


function ColorBtn({ color, index, colorBtnValue, setColorBtnValue }) {
    return (
        <button
            className={`color-btn ${colorBtnValue === index ? 'highlighted' : ''}`}
            onClick={() => setBtnHighlight(setColorBtnValue, index)}
        >
            <img src={`/create-game/${color}.png`} alt="" />
        </button>
    )
}

function InviteTypeBtn({ inviteType, index, typeBtnValue, setTypeBtnValue }) {
    return (
        <button
            className={`color-btn ${typeBtnValue === index ? 'highlighted' : ''}`}
            onClick={() => setBtnHighlight(setTypeBtnValue, index)}
        >
            <img src={`/create-game/${inviteType}.png`} alt="" />
        </button>
    )
}

function setBtnHighlight(setValue, index) {
    setValue(index)
}