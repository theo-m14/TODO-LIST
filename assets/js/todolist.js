class task{  //On crée l'objet task
    constructor(description){
        this.description=description;
        this.done = false;
    }
}

let form = document.getElementsByTagName("form")[0];//On récupere le formulaire
let tabTask = [];//stockage de toute les tasks

//On ecoute le click sur l'envoi du champ
document.getElementById("sendTask").addEventListener("click", function(event){
    event.preventDefault();//on empeche le chargement de la page
    let taskDesc = document.getElementById("newTask").value;//on stock le contenu du champ
    document.getElementById("newTask").value = "";//On efface le champ
    tabTask.push(new task(taskDesc));//On ajoute la nouvelle tache dans le tableau de stockage
    displayTask(tabTask[tabTask.length-1]);//On affiche le dernier élément crée avec la fonction displayTask
});


function displayTask(task){
    console.log(task.description);
    let newTask = document.createElement("div"); //On crée une div qui stockera la tache
    form.appendChild(newTask); //On dispose ensuite ce nouvel élément en enfant du formulaire
    newTask.innerHTML = '<input type="checkbox" name="" id=""><p>'+ task.description + '</p>'; //Puis on ajoute une checkbox et la description de la tache dans la div
}