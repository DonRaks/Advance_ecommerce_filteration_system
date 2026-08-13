import { log } from "console";

type Person={
    name:string;
};

const person :Person={
    name :"oraka"
};
//annotation of fuctions

function addOne (num:number){
    return num*3
}

//unions

let password : string|number=20

type userinfo={
    first:string;
    last:string;
    age:number;
}

type AccountDetails = {
    email: string;
    password?: string | undefined;
    }

const user: userinfo | AccountDetails = { 
    first:"john",
    email:"someone@gmail.com"
}