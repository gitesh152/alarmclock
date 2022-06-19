//function to get current time
function currentTime(){
    let date=new Date();
    let hh=date.getHours();
    let mm=date.getMinutes();
    let ss=date.getSeconds();
    let session='AM';
    if(hh==0)
    hh=12;
    if(hh>12){
        hh -= 12;
        session='PM';
    }
    //in case hour, minute, second is below 9 , so we prepend 0 in it. 
    hh=(hh<10)?'0'+parseInt(hh):hh;
    mm=(mm<10)?'0'+parseInt(mm):mm;
    ss=(ss<10)?'0'+ss:ss;
    //displying time in specific time format string
    document.getElementById('cur_time').innerText=(hh+':'+mm+':'+ss+' '+session);
    setTimeout(()=>currentTime(),1000);
}
currentTime();

let alarms_list=[]; //initialing alarms array

//runing the alarm
function runAlarm(){
    for(let i=0;i<alarms_list.length;i++){
        if(alarms_list[i]==document.getElementById('cur_time').innerText){
            alert(`Wake up its ${alarms_list[i]}`);  //alerting the alarm
            deleteAlarm(i);         //deleting alarm after it alerted
        }
    }
    setTimeout(()=>{
        runAlarm();
    },1000);
}
runAlarm();

//setting hours select option
function hoursMenu(){
	var select = document.myform.hh;
	var hrs = 12
	for (i=1; i <= hrs; i++) {
		select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
	}
}
hoursMenu();

//setting minutes select option
function minMenu(){
    var select = document.myform.mm;
	var min = 59;
	for (i=0; i <= min; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i,  i < 10 ? "0" + i : i);
	}
}
minMenu();

//setting seconds select option
function secMenu(){
    var select = document.myform.ss;
	var sec = 59;
	for (i=0; i <= sec; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
	}
}
secMenu();

//submitting selected alarm.
document.getElementById('alarmSubmit').addEventListener('click',function(e){
    e.preventDefault();
    let hh=document.myform.hh.value;
    let mm=document.myform.mm.value;
    let ss=document.myform.ss.value;
    let session=document.myform.session.value;
    let newAlarm=`${hh}:${mm}:${ss} ${session}`;
    alarms_list.push(newAlarm);
    render();
    let frm = document.getElementsByName('myform')[0];
   frm.reset();  // Reset all form data
});

//rendering alarm list
function render(){
    document.getElementById('alarms_list').innerHTML='';
    for(i=0;i<alarms_list.length;i++){
        addToDom(alarms_list[i],i);
    }
}

//adding alarm list to dom
function addToDom(alarm,i){
    let li=document.createElement('li');
    li.innerHTML=`${alarm} <input style="float:right;" value="Delete" type="button" class="delete_button btn text-light" onclick="deleteAlarm(${i})" > `;
    li.classList.add('list-group-item','bg-light','fs-4','text-danger');
    document.getElementById('alarms_list').appendChild(li);
}

//delete a alarm
function deleteAlarm(id){
    console.log(id);
    alarms_list=alarms_list.filter((alarm,index)=>{
        return index!=id;
    });
    render();
}