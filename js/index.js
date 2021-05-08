
let troops = [];


document.querySelector("#btn-create").addEventListener("click", ()=>{


    let name = document.querySelector("#warr-name").value;
    let type = document.querySelector("#warr-type").value;
    let lvl = document.querySelector("#warr-level").value;
    let rank = document.querySelector("#warr-rank").value;

    let troop = {};

    troop.name = name;
    troop.type = type;
    troop.lvl = lvl;
    troop.rank = rank;

    troops.push(troop);
    reloadTable();
    Swal.fire("Exito!","La tropa se a generado con exito!", "success");


});

const reloadTable = ()=>{

    let tbody = document.querySelector("#tabla-tbody");
    tbody.innerHTML = "";

    for(let i = 0; i < troops.length; ++i){

        let troop = troops[i];

        let tr = document.createElement("tr");
        let tdNro = document.createElement("td");
        tdNro.innerText = (i+1)
        let tdName = document.createElement("td");
        tdName.innerText = troop.name;
        let tdType = document.createElement("td");
        
        switch(troop.type){
            case "orc":
                tdType.innerText = "Orco";
                break;
            
            case "uruk":
                tdType.innerText = "Uruk";
                break;

        }

        let tdLvl = document.createElement("td");
        tdLvl.innerText = troop.lvl;
        let tdRank = document.createElement("td");
        
        switch(troop.rank){

            case "warrior":
                
                tdRank.innerText = "Guerrero";
                break;

            case "captian":
                tdRank.classList.add("text-success");
                tdRank.innerText = "Capitan";
                break;
            
            case "warchief":
                tdRank.classList.add("text-warning");
                tdRank.innerText = "Jefe de Guerra";
                break;
            
            case "sauronhand":
                tdRank.classList.add("text-danger");
                tdRank.innerText = "Mano de Sauron";
                break;
        }


        let tdActions = document.createElement("td");
        tdActions.classList.add("text-center");
        let button = document.createElement("button");
        button.classList.add("btn","btn-danger")
        button.innerText = "Dar de baja"
        button.nro = i;
        button.addEventListener("click", dischargeTroop);
        tdActions.appendChild(button);

        tr.appendChild(tdNro);
        tr.appendChild(tdName);
        tr.appendChild(tdType);
        tr.appendChild(tdLvl);
        tr.appendChild(tdRank);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);


    }

};

const dischargeTroop = async function(){

    let troop = troops[this.nro];
    let type = "";
    let rank = "";


    switch(troop.type){
        case "orc":
            type = "Orco";
            break;
        
        case "uruk":
            type = "Uruk";
            break;

    }

    switch(troop.rank){

        case "warrior":
            
            rank = "Guerrero";
            break;

        case "captian":
            rank = "Capitan";
            break;
        
        case "warchief":
            rank = "Jefe de Guerra";
            break;
        
        case "sauronhand":
            rank = "Mano de Sauron";
            break;
    }


    let res = await Swal.fire({
        title:`Esta seguro eliminar al ${type} de nivel ${troop.lvl} llamado ${troop.name} de rango ${rank}?`,
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!"


    })

    if (res.isConfirmed){

        troops.splice(this.nro, 1);
        reloadTable();
        Swal.fire(`El ${type} ha sido eliminado, nadie llorara su perdida! `);
    }else{
        Swal.fire(`El ${type} se ha salvado por esta vez!`);

    }


};