class task{  //On crée l'objet task
    constructor(description,done){
        this.description=description;
        this.done = done;
    }
}

let form = document.getElementsByTagName("form")[0];//On récupere le formulaire
let tabTask = [];//stockage de toute les tasks
let taskDesc; //stockage pour la description de la tache

//TEMPORAIRE
//localStorage.clear();


//On vérifie si le localStorage contient quelque chose et si il est supporté par le navigateur
if(storageAvailable('localStorage') && localStorage.length > 0){
    for( i=localStorage.length-1; i>=0 ; i--){ //Ecriture de la boucle dans le sens inverse car l'ajout d'un item au local storage se fait depuis le début
        let description = localStorage.key(i);//On stock la description du local storage
        let itsDone = stringToBoolean(localStorage.getItem(localStorage.key(i))); //On stock la valeur de task.done
        let newTask = new task(description,itsDone); //On crée la nouvelle tache
        tabTask.push(newTask); //On l'ajoute à notre tableau de stockage
        displayNewTask(tabTask[tabTask.length-1]);//Puis on affiche notre tâche
    }
}


//On ecoute le click sur l'envoi du champ
document.getElementById("sendTask").addEventListener("click", function(event){
    event.preventDefault();//on empeche le chargement de la page
    taskDesc = document.getElementById("newTask").value;//on stock le contenu du champ
    document.getElementById("newTask").value = "";//On efface le champ
    tabTask.push(new task(taskDesc,false));//On ajoute la nouvelle tache dans le tableau de stockage
    displayNewTask(tabTask[tabTask.length-1]);//On affiche le dernier élément crée avec la fonction displayTask
    registerTask(tabTask[tabTask.length-1]);
});


//Fonction qui affiche les taches selon leurs états
function displayNewTask(task){
    let newTask = document.createElement("div"); //On crée une div qui stockera la tache
    newTask.id = "task-" + tabTask.indexOf(task);//On lie la div à la place de la tache dans notre tableau
    form.appendChild(newTask); //On dispose ensuite ce nouvel élément en enfant du formulaire
    console.log(task.done);
    //On gère ici le cas où la tache est déjà complété
    if(task.done==true){
        newTask.classList.add("done"); //On ajoute la class done à la div correspondante
        newTask.innerHTML = '<input type="checkbox" name="checkbox-'+ tabTask.indexOf(task) +'" onchange="checkTaskStatut(this)" checked><p>'+ task.description + '</p>'; //Puis on ajoute une checkbox checked et la description de la tache dans la div
    }else{
        newTask.innerHTML = '<input type="checkbox" name="checkbox-'+ tabTask.indexOf(task) +'" onchange="checkTaskStatut(this)"><p>'+ task.description + '</p>'; //Puis on ajoute une checkbox et la description de la tache dans la div
    }
    
    
}

//Function executé au changement sur la checkbox
function checkTaskStatut(checkbox){
    if(checkbox.checked){//Si la case est coché
        tabTask[checkbox.parentElement.id.substring(5,6)].done = true; //On met à jour l'objet tache lié en recupérant l'id du parent, puis en découpant cet id pour n'avoir que l'index de l'objet
        if(storageAvailable('localStorage')){ //Si le Local Storage est utilisé
            let getElementDescription = document.querySelector("#" + checkbox.parentElement.id +" p").textContent;//On récupère la description de la task
            localStorage[getElementDescription] = true;//On change la valeur de task.done dans le localStorage
        }
        document.getElementById(checkbox.parentElement.id).classList.add("done");
    }
    else{//Si la case n'est pas coché
        tabTask[checkbox.parentElement.id.substring(5,6)].done = false;
        if(storageAvailable('localStorage')){
            let getElementDescription = document.querySelector("#" + checkbox.parentElement.id +" p").textContent;
            localStorage[getElementDescription] = false;
        }
        document.getElementById(checkbox.parentElement.id).classList.remove("done");
    }
}


//Toutes les fonctions liées au local storage

function storageAvailable(type) { //Fonction récupérer sur la doc JS renvoyant la disponibilité du local storage selon la version de navigateur
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

//fonction qui permet d'enregistrer la tache dans le local storage
function registerTask(task){
    if(storageAvailable('localStorage')){
        localStorage.setItem(task.description,task.done);//On lie la description ( la clé) à la valeur de task.done ( l'item lié à la clé) 
    }
}

//Conversion de string en booléen selon sa valeur
function stringToBoolean(string){ 
    if(string=="true"){
        return true;
    }else return false;
}