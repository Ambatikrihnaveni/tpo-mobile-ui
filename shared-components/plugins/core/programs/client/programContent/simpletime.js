import React, { useState } from 'react'
import './time.css'


export default function SampleTime() {
    let d = new Date();
//setTime();
const[hour, setHour] = React.useState( d.getHours())
const [minutes,setMinutes] =React.useState(d.getMinutes())
const [button,setButton]=useState('#fcfaf2')
const [button2,setButton2]=useState('#fcfaf2')


const changeColor = () => {
    const newColor = button === '#fcfaf2' ? '#bfbeba' : '#fcfaf2';
    setButton(newColor);
    setButton2('#fcfaf2'); // Reset PM button color to default
  };
  const changeColor2 = () => {
    const newColor = button2 === '#fcfaf2' ? '#bfbeba' : '#fcfaf2';
    setButton2(newColor);
    setButton('#fcfaf2'); // Reset AM button color to default
  };
  const [ampm, setAmPm] = useState(d.getHours() < 12 ? 'AM' : 'PM');


    function hour_change (e) {
        
        if (e.target.value > 23) {
            setHour("23");
        } else if (e.target.value < 0) {
            setHour('00');
        }
    
        if (e.target.value == "") {
            setHour(formatTime(hour));
        }
    
        setHour(e.target.value);
    }

    function minute_change (e) {
        if (e.target.value > 59) {
           setMinutes("59")
        } else if (e.target.value < 0) {
           setMinutes("00")
        }
    
        if (e.target.value == "") {
            setMinutes(formatTime(minutes));
        }
    
        setMinutes(e.target.value);
    }


    function hour_up () {
       setHour(hour+1)
        if (hour > 23) {
            setHour("0");
        }
    
    }
    function hour_down () {
        setHour(hour -1);
        if (hour < 0) {
            setHour(23);
        }
    }
    function minute_up () {
        setMinutes(minutes+1);
        if (minutes > 59) {
            setMinutes = 0;
            setHour(hour+1)
            ;
        }
    }
    function minute_down () {
        setMinutes(minutes-1);
        if (minutes < 0) {
            setMinutes(59);
            setHour(hour -1);
        }
    }

    function formatTime (time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }
    function toggleAmPm() {
        setAmPm(ampm === 'AM' ? 'PM' : 'AM');
      }
    

  return (
    <div class="time-picker" data-time="00:00">
    <div class="hour">
        <div class="hr-up" onClick={hour_up} ></div>
        <input type="number" class="hr" value={hour} onChange={(e)=>{hour_change(e)}} />
        <div class="hr-down" onClick={ hour_down}></div>
    </div>

    <div class="separator" >:</div>

    <div class="minute">
        <div class="min-up" onClick={minute_up}></div>
        <input type="number" class="min" value={minutes} onChange={(e)=>{minute_change(e)}}/>
        <div class="min-down" onClick={minute_down}></div>
    </div>
      <div>
        <button className="timer" onClick={toggleAmPm}>
          {ampm}
        </button>
      </div>    
</div>
  )
}
