const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

const tipos = [];

objetos.forEach((values)=>{
    Object.keys(values).forEach((prod)=> {
        !tipos.includes(prod) && tipos.push(prod)
    });

})

console.log(tipos);

const cantTotal = [];
let sumaTotal;

objetos.forEach((values)=> {
    Object.values(values).forEach((prod)=> {
        cantTotal.push(prod)
        sumaTotal = cantTotal.reduce((acum,val)=> acum+val)
    });

})

console.log(cantTotal)
console.log(sumaTotal)