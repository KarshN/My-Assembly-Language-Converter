//all the different lines of the assembly language
lines=[];

//appends line of assembly
function append(){
    if(document.getElementById("data").checkValidity()){
        let codeElement=document.getElementById("assemblyCode")
        let data = document.getElementById("sampleTextData")
        let ALU = document.getElementById("sampleTextALU")
        let isChecked=document.getElementById("check").checked
        let sample, newTable;

        if(isChecked){
            sample=ALU;
        }else{
            sample=data;
        }

        newTable=sample.cloneNode(true);
        newTable.id="line"+lines.length;

        dataSections=newTable.childNodes[1].childNodes[0].childNodes
        console.log(dataSections)
        let Xbutton;
        let instruction="";
        let newLine="";

        if(isChecked){

            //ALU
            dataSections[1].innerHTML="00"

            //destinations
            let destinationCode=""
            let destinations=[document.getElementById("aluA").checked,document.getElementById("aluB").checked,document.getElementById("aluAd").checked,document.getElementById("aluRAM").checked]
            if(destinations[0]){
                destinationCode+="1"
                instruction+="A"
                if(destinations[1]|| destinations[2]|| destinations[3]){
                    instruction+=", "
                }
            }else{
                destinationCode+="0"
            }
            if(destinations[1]){
                destinationCode+="1"
                instruction+="B"
                if(destinations[2]|| destinations[3]){
                    instruction+=", "
                }
            }else{
                destinationCode+="0"
            }
            if(destinations[2]){
                destinationCode+="1"
                instruction+="Address"
                if(destinations[3]){
                    instruction+=", "
                }
            }else{
                destinationCode+="0"
            }
            if(destinations[3]){
                destinationCode+="1"
                instruction+="RAM"
            }else{
                destinationCode+="0"
            }
            if(destinations[0]||destinations[1]|| destinations[2]|| destinations[3]){
                instruction+=" = "
            }
            
            dataSections[2].innerHTML=destinationCode
            
            let opcodes=["000","001","010","011","100","101","110","111"]
            let selectedOp=0
            
            for(let i=0;i<8;i++){
                if(document.getElementById("op"+opcodes[i]).selected){
                    dataSections[3].innerHTML=opcodes[i]
                    selectedOp=i
                }
            }

            let operands=["A","B","Address","RAM"]
            let selectedOps=[0,1]

            for(let i=0;i<4;i++){
                if(document.getElementById("op1"+operands[i]).selected){
                    dataSections[4].innerHTML=opcodes[i][1]+opcodes[i][2];
                    selectedOps[0]=i
                }
            }
            for(let i=0;i<4;i++){
                if(document.getElementById("op2"+operands[i]).selected){
                    dataSections[5].innerHTML=opcodes[i][1]+opcodes[i][2];
                    selectedOps[1]=i
                }
            }

            if(selectedOp==0){
                instruction+=operands[selectedOps[0]]+"+"+operands[selectedOps[1]]
            }
            if(selectedOp==1){
                instruction+=operands[selectedOps[0]]+"-"+operands[selectedOps[1]]
            }
            if(selectedOp==2){
                instruction+=operands[selectedOps[0]]+"&lt;"+operands[selectedOps[1]]
            }
            if(selectedOp==3){
                instruction+=operands[selectedOps[0]]+"="+operands[selectedOps[1]]
            }
            if(selectedOp==4){
                instruction+=operands[selectedOps[0]]+"||"+operands[selectedOps[1]]
            }
            if(selectedOp==5){
                instruction+=operands[selectedOps[0]]+"&"+operands[selectedOps[1]]
            }
            if(selectedOp==6){
                instruction+="!"+operands[selectedOps[0]]
            }
            if(selectedOp==7){
                instruction+=operands[selectedOps[0]]
            }

            instruction+="; "

            let jumps=[document.getElementById("jg").checked,document.getElementById("jz").checked,document.getElementById("jl").checked];
            dataSections[6].innerHTML="000"
            if(jumps[0]&&jumps[1]&&jumps[2]){
                instruction+="JUMP";
                dataSections[6].innerHTML="111";
            }
            if(jumps[0]&&jumps[1]&&!jumps[2]){
                instruction+="JUMP if ≥ 0"
                dataSections[6].innerHTML="110"
            }
            if(!jumps[0]&&jumps[1]&&jumps[2]){
                instruction+="JUMP if ≤ 0"
                dataSections[6].innerHTML="011"
            }
            if(jumps[0]&&!jumps[1]&&jumps[2]){
                instruction+="JUMP if ≠ 0"
                dataSections[6].innerHTML="101"
            }
            if(jumps[0]&&!jumps[1]&&!jumps[2]){
                instruction+="JUMP if &gt; 0"
                dataSections[6].innerHTML="100"
            }
            if(!jumps[0]&&jumps[1]&&!jumps[2]){
                instruction+="JUMP if = 0"
                dataSections[6].innerHTML="010"
            }
            if(!jumps[0]&&!jumps[1]&&jumps[2]){
                instruction+="JUMP if &lt; 0"
                dataSections[6].innerHTML="001"
            }


            Xbutton=dataSections[7].childNodes[0]

            dataSections[8].innerHTML=instruction

            newLine=dataSections[1].innerHTML+dataSections[2].innerHTML+dataSections[3].innerHTML+dataSections[4].innerHTML+dataSections[5].innerHTML+dataSections[6].innerHTML
        
        }else{

            //Data Instruction
            let destinations=[document.getElementById("dataA").selected,document.getElementById("dataAd").selected,document.getElementById("dataRAM").selected]
            if(destinations[0]){
                dataSections[1].innerHTML="11"
                instruction+="A="
            }
            if(destinations[1]){
                dataSections[1].innerHTML="01"
                instruction+="Address="
            }
            if(destinations[2]){
                dataSections[1].innerHTML="10"
                instruction+="RAM="
            }

            let dataValue = document.getElementById("data").value;
            instruction+=dataValue;
            dataValue=(dataValue >>> 0).toString(2);
            let data14=""
            for(let i=13; i>-1;i--){
                if(i<dataValue.length){
                    data14+=dataValue[dataValue.length-1-i]
                }else{
                    data14+="0"
                }
            }

            dataSections[2].innerHTML=data14
            Xbutton=dataSections[3].childNodes[0]
            dataSections[4].innerHTML=instruction

            newLine=dataSections[1].innerHTML+dataSections[2].innerHTML
        }

        Xbutton.param1=newTable
        Xbutton.param2=lines.length
        Xbutton.onclick = function() {
            splice(Xbutton.param1,Xbutton.param2);
        };

        codeElement.appendChild(newTable)
        console.log(codeElement)
        lines.push(newLine)
    }
}

//remove certain line
function splice(element,lineNum){
    console.log(element)
    element.remove()
    lines.splice(lineNum,1)
}

//copies regular val
function copy(){
    lineText=""
    for(let i=0;i<lines.length;i++){
        lineText+=lines[i]+"\n"
    }
    if(lines.length>0){
        navigator.clipboard.writeText(lineText)
        alert("Copied!")
    }else{
        navigator.clipboard.writeText("")
    }
}

//copies hex val
function copyHex(){
    lineText=""
    for(let i=0;i<lines.length;i++){
        let decimal=parseInt(lines[i], 2);
        let hex=decimal.toString(16)
        hex="0".repeat(4-hex.length)+hex
        lineText+=hex+"\n"
    }
    if(lines.length>0){
        navigator.clipboard.writeText(lineText)
        alert("Copied!")
    }else{
        navigator.clipboard.writeText("")
    }
}
